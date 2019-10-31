import axios from "axios";
import devalue from "devalue";
import mongoose from "mongoose";
import * as cliProgress from "cli-progress";
import * as dotenv from "dotenv";
import Resource from "../src/models/Resource";
import { TLegacyResource } from "../../src/types";

dotenv.config();

// Database setup
const {
  DATABASE_URL,
  DATABASE_NAME,
  DATABASE_PASSWORD,
  DATABASE_USER
} = process.env;

function locationInBoulder(latitude: number, longitude: number): boolean {
  const boulderLimits = {
    latitudeLow: 39.914301,
    latitudeHi: 40.260222,
    longitudeLow: -105.690812,
    longitudeHi: -105.055875
  };
  return (
    latitude >= boulderLimits.latitudeLow &&
    latitude <= boulderLimits.latitudeHi &&
    longitude >= boulderLimits.longitudeLow &&
    longitude <= boulderLimits.longitudeHi
  );
}

console.log("Syncing Boulder Resources from Strappd");

mongoose
  .connect(DATABASE_URL, {
    useNewUrlParser: true,
    dbName: DATABASE_NAME,
    user: DATABASE_USER,
    pass: DATABASE_PASSWORD
  })
  .then(
    () => console.log(`Connected to MongoDB instance at ${DATABASE_URL}`),
    e =>
      console.log(
        `There was an error connecting to the MongoDB instance at ${DATABASE_URL}:\n${e}`
      )
  )
  .then(() => {
    const bar = new cliProgress.Bar(
      { etaBuffer: 100 },
      cliProgress.Presets.rect
    );

    axios
      .get("https://strapped.firebaseio.com/charity.json")
      .then(async ({ status, statusText, data: resources }) => {
        if (status !== 200) {
          throw new Error(`Error fetching strappd data: ${statusText}`);
        }
        const entries = Object.entries(resources) as [
          string,
          TLegacyResource
        ][];
        let currentRecord = 0;
        bar.start(entries.length, currentRecord++);

        let resourceCount = 0;
        let addedResourceCount = 0;
        let locationFilteredResourceCount = 0;

        for (const [id, legacyResource] of entries) {
          resourceCount++;
          if (!id || !legacyResource || typeof id !== "string") {
            throw new Error();
          }
          try {
            if (locationInBoulder(legacyResource.lat, legacyResource.lng)) {
              addedResourceCount++;
              await Resource.addOrUpdateLegacyResource(id, legacyResource);
            } else {
              locationFilteredResourceCount++;
            }
          } catch (e) {
            console.error(
              `Error saving record ${id}:\n${e}\nOriginal Data:\n${devalue(
                legacyResource
              )}\n`
            );
            throw e;
          }
          bar.update(currentRecord++);
        }
        bar.stop();
        console.log(`Finished syncing from Strappd`);
        console.log(`Resources added or updated:\t\t${addedResourceCount}`);
        console.log(
          `Resources filtered out for location:\t${locationFilteredResourceCount}`
        );
        console.log(`Total Strappd resources examined:\t${resourceCount}`);
      })
      .finally(() => mongoose.connection.close());
  });
