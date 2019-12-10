import { TResource } from "@upswyng/upswyng-types";
import { ResourceSchedule } from "@upswyng/upswyng-core";

export const blankResource: TResource = {
  _id: "",
  address: {
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
  },
  createdBy: {
    id: "",
    name: "",
    email: "",
    providers: ["facebook", "google"],
    isAdmin: false,
    isSuperAdmin: false,
  },
  createdAt: new Date(),
  deleted: false,
  description: "",
  kudos: 0,
  lastModifiedAt: new Date(),
  latitude: 0,
  legacyId: "",
  longitude: 0,
  name: "",
  phone: "",
  resourceId: "",
  schedule: new ResourceSchedule().toData(),
  services: [""],
  subcategories: [],
  website: "",
};

export const foodResource: TResource = {
  address: {
    address1: "220 Collyer St",
    city: "South Park",
    state: "CO",
    zip: "80501",
  },
  deleted: false,
  kudos: 0,
  services: ["Breakfast\\Lunch"],
  _id: "5d9431ab521d2e1c354bd23d",
  description:
    "Our Hospitality Care services can all be found inside our facility. New members must become a participant first by meeting with a trained Resource Navigator and  once a plan is agree upon these services may be offered to assist with basic need expenses. Warm, nutritious meals are created 364 days a year with our assistance of our in-house cook and volunteer staff. Weekend meals are provided by Café Outreach Team’s which are families, schools, businesses, and faith-based groups from our community. Community Cafe Lunch 7 days a week 11:30am-1pm. Breakfast M-F 8:30am-9:30am.",
  legacyId: "-KZomZhy4WBsvTu6tcXC",
  name: "OUR Center Community Cafe",
  phone: "(303) 772-5529",
  resourceId: "5d9431ab521d2e1c354bd23c",
  schedule: {
    alwaysOpen: false,
    timezone: "America/Denver",
    _items: [
      {
        comment: "",
        fromTime: "1000",
        recurrenceRule: "RRULE:FREQ=WEEKLY;INTERVAL=1;BYDAY=WE",
        toTime: "1545",
      },
      {
        comment: "",
        fromTime: "0830",
        recurrenceRule: "RRULE:FREQ=WEEKLY;INTERVAL=1;BYDAY=TH,FR",
        toTime: "1345",
      },
      {
        recurrenceRule: "RRULE:FREQ=WEEKLY;INTERVAL=1;BYDAY=SU,SA",
        comment: "mnkjnk",
        fromTime: "0000",
        toTime: "0030",
      },
    ],
  },
  website: "https://www.ourcenter.org/hospitality-care/",
  createdAt: new Date(),
  lastModifiedAt: new Date(),
  latitude: 1234,
  longitude: 5678,
  subcategories: [
    {
      resources: [],
      _id: "5d8f0303c0e6672699a50098",
      name: "Meals",
      stub: "meals",
      parentCategory: {
        subcategories: [],
        _id: "5d8f0302c0e6672699a50097",
        name: "Food",
        stub: "food",
        color: "gold",
        createdAt: new Date(),
        lastModifiedAt: new Date(),
      },
      createdAt: new Date(),
      lastModifiedAt: new Date(),
    },
  ],
};
