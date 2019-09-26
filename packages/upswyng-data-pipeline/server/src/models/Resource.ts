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
  TSchedule,
  TSubcategory,
  TNewResource
} from "../../../src/types";
import { ObjectId } from "bson";
import {
  diffResources,
  removeResourceFromSubcategory,
  addResourceToSubcategory
} from "./Utility";
import Subcategory from "./Subcategory";

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
    // unique in the `Resource` collection, but may not be unique
    // in the `DraftResource` collection
    unique: false
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
    id: new Types.ObjectId(),
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

const resourceToSchema = (r: Partial<TResource>) => {
  let result = { ...r };
  delete result.latitude;
  delete result.longitude;
  return r.longitude && r.latitude
    ? {
        ...result,
        location: { type: "Point", coordinates: [r.longitude, r.latitude] }
      }
    : result;
};

/**
 * Convert a resource document from the database into our `TResource` type.
 * Explicity enumerate keys so we make TypeScript happy.
 */
const schemaToResource = (
  r: (TResourceFields & { subcategories: TSubcategory[] }) | null
): TResource | null => {
  if (!r) return null;
  return {
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
  delete resource._id;
  const self = this;
  return new self(resourceToSchema(resource)).save().then(schemaToResource);
};

/**
 * Retrieve a resource by its ID. Converts the Resource document to a
 * `TResource`. `null` if there is no matching Resource.
 */
ResourceSchema.statics.getById = async function(
  id: ObjectId
): Promise<TResource | null> {
  return this.findOne({ id })
    .populate({ path: "subcategories", populate: { path: "categories" } })
    .then(schemaToResource);
};

/**
 * Retrieve a resource by its record ID (_id). Converts the Resource document
 * to a `TResource`. `null` if there is no matching Resource.
 */
ResourceSchema.statics.getByRecordId = async function(
  id: ObjectId
): Promise<TResource | null> {
  return this.findOne({ _id: id })
    .populate({ path: "subcategories", populate: { path: "categories" } })
    .then(schemaToResource);
};

/**
 * Retrieve all resources.
 */
ResourceSchema.statics.getAll = async function(): Promise<TResource[]> {
  return this.find({})
    .populate({ path: "subcategories", populate: { path: "categories" } })
    .then(r => r.map(schemaToResource));
};

/**
 * Retrieve the resources which haven't assigned to at least one subcategory.
 */
ResourceSchema.statics.getUncategorized = async function(): Promise<
  TResource[]
> {
  return this.find({ "subcategories.0": { $exists: false } }).then(r =>
    r.map(schemaToResource)
  );
};

/**
 * Takes the Record ID (_id) of a draft and either creates a new Resource, or updates a Resource
 * if there already exists a Record with the same ID (id) as the draft.
 */
ResourceSchema.statics.createOrUpdateFromDraft = async function(
  draftResource: TResource | TNewResource
): Promise<TResource> {
  if (draftResource.hasOwnProperty("id")) {
    const existingResource = this.findOne({
      id: (draftResource as TResource).id
    });
    if (!existingResource) {
      throw new Error(`This draft has an \`id\`, ${(draftResource as TResource).id.toHexString()}
      } and is therefore supposed to update an existing resource; however, a resource with the draft's \`id\` doesn't exist`);
    }
    const updateObject = diffResources(
      schemaToResource(existingResource),
      draftResource as TResource
    );
    // go over each subcategory the old resource was in.. if it's not in the new resource, remove it
    updateObject.left.subcategories &&
      updateObject.right.subcategories &&
      updateObject.left.subcategories.forEach(async subcategory => {
        if (
          !updateObject.right.subcategories
            .map(s => s._id.toHexString())
            .includes(subcategory._id.toHexString())
        ) {
          await removeResourceFromSubcategory(
            existingResource._id,
            subcategory._id
          );
        }
      });
    // go over each subcategory the new resource is in.. if its not in the old resource, then add it
    updateObject.left.subcategories &&
      updateObject.right.subcategories &&
      updateObject.right.subcategories.forEach(async subcategory => {
        if (
          !updateObject.left.subcategories
            .map(s => s._id.toHexString())
            .includes(subcategory._id.toHexString())
        ) {
          await addResourceToSubcategory(existingResource._id, subcategory._id);
        }
      });

    delete updateObject.right.subcategories;
    existingResource.set({
      ...resourceToSchema(updateObject.right),
      lastModifiedAt: new Date()
    });
    return await existingResource
      .save()
      .populate("subcategories")
      .then(schemaToResource);
  } else {
    const subcategories = draftResource.subcategories;
    const newResource = await new this({
      ...resourceToSchema(draftResource),
      subcategories: []
    }).save();
    await Promise.all(
      subcategories.map(s => addResourceToSubcategory(newResource._id, s._id))
    );
    return await this.findOne({ _id: newResource._id })
      .populate("subcategories")
      .then(schemaToResource);
  }
};

/**
 * Delete a resource by its record ID (_id). Returns the deleted resource.
 */
ResourceSchema.statics.deleteByRecordId = async function(
  id: ObjectId
): Promise<TResource> {
  return this.findByIdAndDelete(id)
    .populate({ path: "subcategories", populate: { path: "categories" } })
    .then(schemaToResource);
};

const Resource = mongoose.model<TResourceFields>("Resource", ResourceSchema);
(Resource as any).create = () => {
  throw new Error(
    "Create should only be called to make DraftResources. To make a new resource, make a draft and then approve it."
  );
};
(Resource as any).deleteByRecordId = () => {
  throw new Error(
    'Only drafts should be deleted. Once a resource is in the directory, set the "deleted" field on it to `true` instead of deleting from the database'
  );
};
(Resource as any).getAll = () => {
  throw new Error(
    "getAll can only be called on the Draft Resources collection."
  );
};

export default Resource as typeof Resource & {
  addOrUpdateLegacyResource: (
    id: string,
    resource: TLegacyResource
  ) => Promise<TResource>;
  createOrUpdateFromDraft: (
    draftResource: TResource | TNewResource
  ) => Promise<TResource>;
  getById: (id: ObjectId) => Promise<TResource | null>;
  getByRecordId: (id: ObjectId) => Promise<TResource | null>;
  getUncategorized: () => Promise<TResource[]>;
};

const DraftResource = mongoose.model<TResourceFields>(
  "DraftResource",
  ResourceSchema
) as typeof Resource & {
  addOrUpdateLegacyResource: (
    id: string,
    resource: TLegacyResource
  ) => Promise<TResource>;
  create: (resource: TResource) => Promise<TResource>;
  deleteByRecordId: (id: ObjectId) => Promise<TResource>;
  getById: (id: ObjectId) => Promise<TResource | null>;
  getByRecordId: (id: ObjectId) => Promise<TResource | null>;
  getAll: () => Promise<TResource[]>;
};

(DraftResource as any).getUncategorized = () => {
  throw new Error("getUncategorized can only be called on normal Resources");
};

(DraftResource as any).createOrUpdateFromDraft = () => {
  throw new Error(
    "createOrUpdateFromDraft can only be called on the normal Resouce collection."
  );
};

export { DraftResource };
