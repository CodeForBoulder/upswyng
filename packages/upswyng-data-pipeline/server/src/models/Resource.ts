/**
 * Schema, accessor methods, and mutation methods for an entity which
 * represents a resource for a person experiencing homelessness. Users of
 * `Resource` should only be interacting with `TResource` and `TLegacyResource`;
 * the internal schema is abstracted away by the logic in this module.
 */
import mongoose, { Document, Schema, Types } from "mongoose";
import {
  TLegacyResource,
  TResource,
  TAddress,
  TCloseSchedule,
  TSchedule
} from "../../../src/types";
import { ObjectId } from "bson";

export interface TResourceFields extends Document {
  address: TAddress;
  closeSchedule: TCloseSchedule[];
  createdAt: Date;
  deleted: boolean;
  description: string;
  id: ObjectId;
  kudos: number;
  lastModifiedAt: Date;
  legacyId: string | null | undefined;
  location: { type: string; coordinates: number[] };
  name: string;
  phone: string;
  schedule: TSchedule[];
  services: string[];
  subcategories: ObjectId[];
  website: string;
}

export const ResourceSchema = new Schema({
  address /* TAddress */: {
    address1: String,
    address2: { type: String, required: false },
    city: String,
    state: String,
    zip: String
  },
  closeSchedule /* TCloseSchedule[] */: [
    { day: String, period: String, scheduleType: String }
  ],
  createdAt: { type: Date, default: Date.now, required: true },
  deleted: { type: Boolean, default: false, required: true },
  description: {
    type: String,
    required: false // TODO: Make this required
  },
  id: {
    // This is the canonical ID for the resource and should be referenced in
    // other database entries, URLs, etc.
    type: Schema.Types.ObjectId,
    required: true,
    index: true,
    unique: true
  },
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
        required: false,
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
      date: {
        type: String,
        required: false
      },
      period: {
        type: String,
        required: false,
        enum: ["Last", "First", "Second", "Third", "Fourth", "Fifth"]
      },
      from: {
        type: String,
        required: false
      },
      to: {
        type: String,
        required: false
      },
      scheduleType: {
        type: String,
        enum: ["Weekly", "Monthly", "Open 24/7", "Date Range"],
        required: true
      }
    }
  ],
  services: [{ type: String, trim: true }],
  subcategories: [
    {
      type: Schema.Types.ObjectId,
      ref: "Subcategory"
    }
  ],
  website: String
});

const trimQuotes = (s: string): string => {
  if (s[0] === '"' && s[s.length - 1] === '"') {
    return s.slice(1, -1);
  }
  return s;
};

const legacyResourceToResource = (
  r: TLegacyResource,
  createdAt: Date = new Date(),
  id?: string
): TResource => {
  return {
    address: {
      address1: r.address1,
      address2: r.address2,
      city: r.city,
      state: r.state,
      zip: (r.zip || "").toString()
    },
    closeSchedule: (r.closeschedule || []).map(i => ({
      day: i.day,
      date: i.date,
      period: i.period,
      from: i.fromstring,
      to: i.tostring,
      scheduleType: i.type
    })),
    createdAt,
    deleted: (r.closeschedule || [])
      .map(item => item.type.toLowerCase())
      .includes("permanently closed"),
    description: trimQuotes(r.description),
    id: new Types.ObjectId().toHexString(),
    kudos: r.kudos,
    lastModifiedAt:
      new Date(r.updateshelter) instanceof Date &&
      !isNaN(new Date(r.updateshelter).valueOf())
        ? new Date(r.updateshelter)
        : new Date(),
    latitude: r.lat,
    legacyId: id,
    longitude: r.lng,
    name: r.charityname,
    phone: r.phone,
    subcategories: [],
    schedule: (r.schedule || []).map(s => ({
      day: s.day,
      date: s.date,
      period: s.period,
      string: s.fromstring,
      to: s.tostring,
      scheduleType: s.type
    })),
    services: r.servicetype.split(","),
    website: r.website
  };
};

const resourceToSchema = (r: TResource) => {
  let result = { ...r };
  delete result.latitude;
  delete result.longitude;
  return {
    ...result,
    location: { type: "Point", coordinates: [r.longitude, r.latitude] }
  };
};

/**
 * Convert a resource document from the database into our `TResource` type.
 * Explicity enumerate keys so we make TypeScript happy.
 */
const schemaToResource = (r: any /* schema format */): TResource => {
  const result = {
    address: {
      address1: r.address.address1,
      address2: r.address.address2,
      city: r.address.city,
      state: r.address.state,
      zip: r.address.zip
    },
    closeSchedule: r.closeSchedule,
    createdAt: r.createdAt,
    deleted: r.deleted,
    description: r.description,
    id: r.id,
    kudos: r.kudos,
    lastModifiedAt: r.lastModifiedAt,
    latitude: r.location ? r.location.coordinates[1] : null,
    legacyId: r.legacyId,
    longitude: r.location ? r.location.coordinates[0] : null,
    name: r.name,
    phone: r.phone,
    schedule: r.schedule,
    services: r.services,
    subcategories: r.subcategories,
    website: r.website
  };
  return result;
};

/**
 * Takes a legacy object from Strappd and puts it into the database.
 * If the Resource already exists in the database, this will over write the entry if
 * the last modified time of the legacy object is newer than the last modified time
 * of our record.
 */
ResourceSchema.statics.addOrUpdateLegacyResource = async function(
  id: string,
  resource: TLegacyResource
): Promise<TResource> {
  const existingRecord = await this.findOne({ legacyId: id });
  const self = this;
  if (!existingRecord) {
    const newRecord = new self(
      resourceToSchema(legacyResourceToResource(resource, new Date(), id))
    );
    return newRecord.save().then(schemaToResource);
  }
  const newDate = resource.updateshelter
    ? new Date(resource.updateshelter)
    : /* a long time ago */ new Date("1975-01-01");
  if (newDate > existingRecord.lastModifiedAt) {
    // update the record and return the updated record
    existingRecord.set(
      resourceToSchema(legacyResourceToResource(resource, new Date(), id))
    );
    return existingRecord.save().then(schemaToResource);
  } else {
    // return our current record
    return Promise.resolve(schemaToResource(existingRecord));
  }
};

ResourceSchema.statics.create = async function(
  resource: TResource
): Promise<TResource> {
  if (resource.hasOwnProperty("_id")) {
    throw new Error(
      "This method creates new resources; allow mongo to assign the resource an ID"
    );
  }
  const self = this;
  return new self(resourceToSchema(resource)).save().then(schemaToResource);
};

/**
 * Retrieve a resource by its ID. Converts the Resource document to a
 * `TResource`.
 */
ResourceSchema.statics.getById = async function(
  id: string
): Promise<TResource> {
  return this.findOne({ id }).then(schemaToResource);
};

const Resource = mongoose.model<TResourceFields>("Resource", ResourceSchema);

export default Resource as typeof Resource & {
  addOrUpdateLegacyResource: (
    id: string,
    resource: TLegacyResource
  ) => Promise<TResource>;
  create: (resource: TResource) => Promise<TResource>;
  getById: (id: string) => Promise<TResource>;
};

export const DraftResource = mongoose.model<TResourceFields>(
  "DraftResource",
  ResourceSchema
) as typeof Resource & {
  addOrUpdateLegacyResource: (
    id: string,
    resource: TLegacyResource
  ) => Promise<TResource>;
  create: (resource: TResource) => Promise<TResource>;
  getById: (id: string) => Promise<TResource>;
};
