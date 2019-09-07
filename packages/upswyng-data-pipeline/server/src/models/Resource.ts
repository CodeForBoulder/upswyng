import mongoose, { Schema } from "mongoose";
import { TLegacyResource, TResource } from "../../../src/types";

const ResourceSchema = new Schema({
  address /* TAddress */: {
    address1: String,
    address2: { type: String, required: false },
    city: String,
    state: String,
    zip: Number
  },
  closesSchedule /* TClosesSchedule[] */: [
    { day: String, period: String, type: String }
  ],
  createdAt: { type: Date, default: Date.now, required: true },
  description: { type: String, required: true },
  kudos: { type: Number, default: 0 },
  lastModifiedAt: { type: Date, default: Date.now, required: true },
  legacyId: { type: String, required: false, index: true },
  location: {
    // GeoJSON Point https://tools.ietf.org/html/rfc7946#section-3.1.2
    type: {
      type: String,
      enum: ["Point"],
      required: true
    },
    coordinates: {
      type: [Number], // longitude, latitude
      required: true
    }
  },
  name: { type: String, required: true, index: true },
  phone: String,
  schedule /* TSchedule[] */: [
    {
      day: {
        type: String,
        required: true,
        enum: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ]
      },
      period: {
        type: String,
        required: false,
        enum: ["First", "Second", "Third", "Fourth"]
      },
      from: {
        type: String,
        required: true
      },
      to: {
        type: String,
        required: true
      },
      type: {
        type: String,
        enum: ["Weekly", "Monthly", "Open 24/7"],
        required: true
      }
    }
  ],
  services: [String],
  website: String
});

const trimQuotes = (s: string): string => {
  if (s[0] === '"' && s[s.length - 1] === '"') {
    return s.slice(1, -1);
  }
  return s;
};

export const legacyResourceToResource = (
  r: TLegacyResource,
  createdAt: Date = new Date(),
  id?: string
): TResource => ({
  address: {
    address1: r.address1,
    address2: r.address2,
    city: r.city,
    state: r.state,
    zip: r.zip
  },
  closeSchedule: r.closeschedule,
  createdAt,
  description: trimQuotes(r.description),
  kudos: r.kudos,
  lastModifiedAt: new Date(r.updateshelter),
  latitude: r.lat,
  legacyId: id,
  longitude: r.lng,
  name: r.charityname,
  phone: r.phone,
  schedule: r.schedule.map(s => ({
    day: s.day,
    period: s.period,
    from: s.fromstring,
    to: s.tostring,
    type: s.type
  })),
  services: r.servicetype.split(","),
  website: r.website
});

export const resourceToSchema = (r: TResource) => {
  let result = { ...r };
  delete result.latitude;
  delete result.longitude;
  return {
    ...result,
    location: { type: "Point", coordinates: [r.longitude, r.latitude] }
  };
};

const Resource = mongoose.model("Resource", ResourceSchema);

export default Resource;
