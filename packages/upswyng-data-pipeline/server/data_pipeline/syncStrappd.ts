import axios from "axios";
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

        for (const [id, legacyResource] of entries) {
          if (!id || !legacyResource || typeof id !== "string") {
            throw new Error();
          }
          try {
            await Resource.addOrUpdateLegacyResource(id, legacyResource);
          } catch (e) {
            console.log(e);
            // console.log(
            //   `Error saving record ${id}:\n${e}\nOriginal Data:\n${JSON.stringify(
            //     legacyResource,
            //     null,
            //     2
            //   )}\n`
            // );
          }
          bar.update(currentRecord++);
        }
        bar.stop();
        mongoose.connection.close();
      });
  });
