import ResourceIssue, { TResourceIssueDocument } from "./ResourceIssue";
import {
  TAddress,
  TLegacyResource,
  TResource,
  TResourceScheduleData,
  TSubcategory,
} from "@upswyng/types";
import {
  TSubcategoryDocument,
  subcategoryDocumentToSubcategory,
} from "./Subcategory";
import User, { userDocumentToUser } from "./User";
import mongoose, { Document, Schema } from "mongoose";

/**
 * Schema, accessor methods, and mutation methods for an entity which
 * represents a resource for a person experiencing homelessness. Users of
 * `Resource` should only be interacting with `TResource` and `TLegacyResource`;
 * the internal schema is abstracted away by the logic in this module.
 */
import { ObjectId } from "bson";
import { ResourceSchedule } from "@upswyng/common";
import { TTimezoneName } from "@upswyng/types";
import convertLegacyScheduleToResourceSchedule from "../utility/convertLegacyScheduleToResourceSchedule";
import removeUndefinedFields from "../utility/removeUndefinedFields";

export interface TResourceDocument extends Document {
  _id: ObjectId; // this is the mongodb id of the record
  address: TAddress;
  createdAt: Date;
  createdBy: ObjectId | undefined; // always populate
  deleted: boolean;
  description: string;
  resourceId: ObjectId; // this is canonical upswyng ID
  kudos: number;
  lastModifiedAt: Date;
  lastModifiedBy: ObjectId | undefined; // always populate
  legacyId: string | null | undefined;
  location: { type: string; coordinates: number[] };
  name: string;
  phone: string;
  schedule: TResourceScheduleData;
  services: string[];
  streetViewImage: string | null;
  subcategories: ObjectId[] | TSubcategoryDocument[];
  website: string;
}

/**
 * Convert a resource document from the database into our `TResource` type.
 * Explicity enumerate keys so we make TypeScript happy.
 */
export const resourceDocumentToResource = async (
  r: TResourceDocument
): Promise<TResource | null> => {
  if (r.toObject) {
    r = r.toObject();
  } else {
    // TODO (rhinodavid): Log formally or remove commented code
    // console.warn(
    //   `\`resourceDocumentToResource\` received resource which does not appear to be a Mongoose Document [${Object.keys(
    //     r
    //   )}]:\n${JSON.stringify(r, null, 2)}`
    // );
  }

  // TODO (rhinodavid): This section of code is deleting both fields
  if (r.createdBy && (r.createdBy as any)._id) {
    // if we actually got a user document here put it back to an id
    r.createdBy = (r.createdBy as any)._id;
  }
  if (r.lastModifiedBy && (r.lastModifiedBy as any)._id) {
    r.lastModifiedBy = (r.lastModifiedBy as any)._id;
  }

  const createdBy = r.createdBy
    ? userDocumentToUser(await User.findById(r.createdBy))
    : null;
  const lastModifiedBy = r.lastModifiedBy
    ? userDocumentToUser(await User.findById(r.lastModifiedBy))
    : null;
  const result = {
    _id: r._id.toHexString(),
    address: {
      address1: r.address.address1,
      address2: r.address.address2,
      city: r.address.city,
      state: r.address.state,
      zip: r.address.zip,
    },
    createdAt: r.createdAt,
    createdBy: createdBy || undefined,
    deleted: r.deleted,
    description: r.description,
    resourceId: r.resourceId.toHexString(),
    kudos: r.kudos,
    lastModifiedAt: r.lastModifiedAt,
    lastModifiedBy: lastModifiedBy || undefined,
    latitude: r.location ? r.location.coordinates[1] : null,
    legacyId: r.legacyId,
    longitude: r.location ? r.location.coordinates[0] : null,
    name: r.name,
    phone: r.phone,
    schedule: r.schedule,
    services: r.services,
    streetViewImage: r.streetViewImage,
    subcategories: (
      await Promise.all(
        (r.subcategories as TSubcategoryDocument[]).map(
          subcategoryDocumentToSubcategory
        )
      )
    ).filter(Boolean),
    website: r.website,
  };

  removeUndefinedFields(result);
  return result;
};

export const ResourceSchema = new Schema({
  address /* TAddress */: {
    address1: String,
    address2: { type: String, required: false },
    city: String,
    state: String,
    zip: String,
  },
  closeSchedule /* TCloseSchedule[] */: [
    { day: String, period: String, scheduleType: String },
  ],
  createdAt: { type: Date, default: Date.now, required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: "User", required: false },
  deleted: { type: Boolean, default: false, required: true },
  description: {
    type: String,
    required: false, // TODO: Make this required
  },
  kudos: { type: Number, default: 0 },
  lastModifiedAt: { type: Date, default: Date.now, required: true },
  lastModifiedBy: { type: Schema.Types.ObjectId, ref: "User", required: false },
  legacyId: { type: String, required: false, index: true },
  location: {
    // GeoJSON Point https://tools.ietf.org/html/rfc7946#section-3.1.2
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number], // longitude, latitude
      required: true,
    },
  },
  name: { type: String, required: true, index: true },
  phone: String,
  resourceId: {
    // This is the canonical ID for the resource and should be referenced in
    // other database entries, URLs, etc.
    type: Schema.Types.ObjectId,
    required: true,
    index: true,
    // unique in the `Resource` collection, but may not be unique
    // in the `DraftResource` collection
    unique: false,
  },
  schedule: {
    type: Object, // TResourceScheduleData
    required: true,
    index: false,
  },
  services: [{ type: String, trim: true }],
  streetViewImage: String,
  subcategories: [
    {
      type: Schema.Types.ObjectId,
      ref: "Subcategory",
    },
  ],
  website: String,
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
  id?: string,
  timezone?: TTimezoneName
): [Omit<TResource, "_id">, TResourceIssueDocument?] => {
  let schedule = new ResourceSchedule();
  let issue: TResourceIssueDocument;
  try {
    schedule = convertLegacyScheduleToResourceSchedule(r.schedule, timezone);
  } catch (e) {
    issue = ResourceIssue.newWithoutResourceId(
      {
        kind: "legacy_schedule_parsing_error",
        legacyClosesSchedule: JSON.stringify(r.closeschedule || ""),
        legacySchedule: JSON.stringify(r.schedule),
      },
      /* severity =*/ "medium"
    );
  }
  return [
    {
      address: {
        address1: r.address1,
        address2: r.address2,
        city: r.city,
        state: r.state,
        zip: (r.zip || "").toString(),
      },
      createdAt,
      deleted: (r.closeschedule || [])
        .map(item => item.type.toLowerCase())
        .includes("permanently closed"),
      description: trimQuotes(r.description),
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
      resourceId: new ObjectId().toHexString(),
      subcategories: [],
      schedule: schedule.toData(),
      services: r.servicetype.split(","),
      streetViewImage: "",
      website: r.website,
    },
    issue,
  ];
};

export const resourceToSchema = (r: Partial<TResource>) => {
  const result = {
    ...r,
    resourceId: r.resourceId
      ? ObjectId.createFromHexString(r.resourceId)
      : undefined,
    _id: r._id ? ObjectId.createFromHexString(r._id) : undefined,
    createdBy: r.createdBy
      ? ObjectId.createFromHexString(r.createdBy._id)
      : undefined,
  };
  if (!r.resourceId) {
    delete result.resourceId;
  }
  if (!r._id) {
    delete result._id;
  }
  delete result.latitude;
  delete result.longitude;
  return r.longitude && r.latitude
    ? {
        ...result,
        location: { type: "Point", coordinates: [r.longitude, r.latitude] },
      }
    : result;
};

/**
 * Takes a legacy object from Strappd and puts it into the database.
 * If the Resource already exists in the database, this will over write the entry if
 * the last modified time of the legacy object is newer than the last modified time
 * of our record.
 */
ResourceSchema.statics.addOrUpdateLegacyResource = async function(
  legacyId: string,
  resource: TLegacyResource,
  timezone?: TTimezoneName
): Promise<void> {
  const existingRecord = await this.findOne({ legacyId: legacyId })
    .populate("createdBy")
    .populate("lastmodifiedBy");
  const self = this; // eslint-disable-line @typescript-eslint/no-this-alias
  if (!existingRecord) {
    const [convertedResource, issue] = await legacyResourceToResource(
      resource,
      new Date(),
      legacyId
    );
    const newRecord = new self(resourceToSchema(convertedResource));
    await newRecord.save();

    if (issue) {
      try {
        // ensure we have a Resource with this Issue ID
        issue.resourceId = newRecord.resourceId;
        await issue.save();
      } catch (e) {
        console.error(e.message);
      }
    }

    return;
  }
  const newDate = resource.updateshelter
    ? new Date(resource.updateshelter)
    : /* a long time ago */ new Date("1975-01-01");
  // Check to see if we've made modifications to the resource. If we have, then don't make
  // changes to it based on the legacy data.
  if (newDate > existingRecord.lastModifiedAt) {
    // update the record and return the updated record
    existingRecord.set(
      resourceToSchema(
        legacyResourceToResource(resource, new Date(), legacyId, timezone)[0]
      )
    );
    await existingRecord.save();
  }
};

/**
 * Retrieve a resource by its `resourceId`. `null` if there is no matching Resource.
 * The `includeDeleted` flag must be set to `true` to return trashed resources.
 */
ResourceSchema.statics.getByResourceId = async function(
  resourceId: ObjectId,
  includeDeleted: boolean = false
): Promise<TResourceDocument | null> {
  return await this.findOne({
    resourceId,
    deleted: { $in: [false, includeDeleted] },
  })
    .populate({ path: "subcategories", populate: { path: "parentCategory" } })
    .populate("createdBy")
    .populate("lastModifiedBy");
};

/**
 * Retrieve a resource by its record ID (_id). `null` if there is no matching Resource.
 */
ResourceSchema.statics.getByRecordId = async function(
  _id: ObjectId
): Promise<TResourceDocument | null> {
  return await this.findOne({ _id })
    .populate({ path: "subcategories", populate: { path: "parentCategory" } })
    .populate("createdBy")
    .populate("lastModifiedBy");
};

/**
 * Retrieve resources by given ObjectId array.
 */
ResourceSchema.statics.getByRecordIds = async function(
  _ids: ObjectId[]
): Promise<TResourceDocument[]> {
  return await this.find({
    _id: { $in: _ids },
  })
    .populate({ path: "subcategories", populate: { path: "parentCategory" } })
    .populate("createdBy")
    .populate("lastModifiedBy");
};

/**
 * Retrieve all resources.
 */
ResourceSchema.statics.getAll = async function(
  includeDeleted: boolean = false
): Promise<TResourceDocument[]> {
  return await this.find({ deleted: { $in: [false, includeDeleted] } })
    .populate({ path: "subcategories", populate: { path: "parentCategory" } })
    .populate("createdBy")
    .populate("lastModifiedBy");
};

/**
 * Retrieve the resources which haven't assigned to at least one subcategory.
 */
ResourceSchema.statics.getUncategorized = async function(): Promise<
  TResourceDocument[]
> {
  return await this.find({
    "subcategories.0": { $exists: false },
    deleted: false,
  })
    .populate({ path: "subcategories", populate: { path: "parentCategory" } })
    .populate("createdBy")
    .populate("lastModifiedBy");
};

/**
 * Delete a resource by its record ID (_id).
 * @return {TResourceDocument} The deleted resource
 */
ResourceSchema.statics.deleteByRecordId = async function(
  _id: ObjectId
): Promise<TResourceDocument> {
  return this.findByIdAndDelete(_id)
    .populate({ path: "subcategories", populate: { path: "parentCategory" } })
    .populate("createdBy")
    .populate("lastModifiedBy");
};

const Resource = mongoose.model<TResourceDocument>("Resource", ResourceSchema);

(Resource as any).deleteByRecordId = () => {
  throw new Error(
    'Only drafts should be deleted. Once a resource is in the directory, set the "deleted" field on it to `true` instead of deleting from the database'
  );
};

// TODO: Disable once this gets too big
// (Resource as any).getAll = () => {
//   throw new Error(
//     "getAll can only be called on the Draft Resources collection."
//   );
// };

export default Resource as typeof Resource & {
  addOrUpdateLegacyResource: (
    legacyId: string,
    resource: TLegacyResource,
    timezone?: TTimezoneName
  ) => Promise<void>;
  getAll: () => Promise<TResourceDocument[]>;
  getByRecordId: (_id: ObjectId) => Promise<TResourceDocument | null>;
  getByRecordIds: (_ids: ObjectId[]) => Promise<TResourceDocument[]>;
  getByResourceId: (resourceId: ObjectId) => Promise<TResourceDocument | null>;
  getUncategorized: () => Promise<TResourceDocument[]>;
};

const DraftResource = mongoose.model<TResourceDocument>(
  "DraftResource",
  ResourceSchema
) as typeof Resource & {
  addOrUpdateLegacyResource: (
    legacyId: string,
    resource: TLegacyResource,
    timezone?: TTimezoneName
  ) => Promise<void>;
  deleteByRecordId: (_id: ObjectId) => Promise<TResourceDocument>;
  getAll: (includeDeleted?: boolean) => Promise<TResourceDocument[]>;
  getByRecordId: (_id: ObjectId) => Promise<TResourceDocument | null>;
  getByResourceId: (
    resourceId: ObjectId,
    includeDeleted?: boolean
  ) => Promise<TResourceDocument | null>;
};

(DraftResource as any).getUncategorized = () => {
  throw new Error("getUncategorized can only be called on normal Resources");
};

export { DraftResource };
