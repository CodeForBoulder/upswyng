import { TCategory, TResource, TSubcategory } from "@upswyng/upswyng-types";

export const mockResources: TResource[] = [
  {
    _id: "5def5b875fe02cacaec1919c",
    address: {
      address1: "515 Coffman Street",
      city: "Longmont",
      state: "CO",
      zip: "80501",
    },
    createdAt: new Date("2019-12-10T08:47:03.662Z"),
    deleted: false,
    description:
      "WIC promotes and maintains the health and well-being of nutritionally at-risk pregnant, breastfeeding, and postpartum women and infants and children by providing: Supplemental nutritious foods,  Nutrition and breastfeeding information and Referral to other health and nutrition services",
    resourceId: "5def5b87376022bd30417191",
    kudos: 0,
    lastModifiedAt: new Date("2016-12-25T00:44:00.000Z"),
    latitude: 40.1684319,
    legacyId: "-KZnRX-8rV1552vd0P7_",
    longitude: -105.10422549999998,
    name: "WIC: Women, Infants and Children (Longmont)",
    phone: "(303) 678-6130",
    schedule: {
      alwaysOpen: false,
      timezone: "America/Denver",
      _items: [
        {
          recurrenceRule: "RRULE:FREQ=WEEKLY;INTERVAL=1;BYDAY=MO,TU,WE,TH,FR",
          comment: "",
          fromTime: "0800",
          toTime: "1630",
        },
      ],
    },
    services: ["Supplemental Nutritious Foods"],
    streetViewImage: "http://placeimg.com/640/480/arch",
    subcategories: [],
    website: "www.BoulderCountyWIC.org",
  },
  {
    _id: "5def5b875fe02cacaec1919b",
    address: {
      address1: "3482 Broadway",
      city: "Boulder",
      state: "CO",
      zip: "80304",
    },
    createdAt: new Date("2019-12-10T08:47:03.654Z"),
    deleted: false,
    description:
      "WIC promotes and maintains the health and well-being of nutritionally at-risk pregnant, breastfeeding, and postpartum women and infants and children by providing: Supplemental nutritious foods,  Nutrition and breastfeeding information and Referral to other health and nutrition services",
    resourceId: "5def5b87376022bd30417190",
    kudos: 0,
    lastModifiedAt: new Date("2019-12-10T08:47:03.654Z"),
    latitude: 40.0377945,
    legacyId: "-KZnPFZkHYmZILzaU-PX",
    longitude: -105.28020600000002,
    name: "WIC: Women, Infants and Children (Boulder)",
    phone: "303-413-7520",
    schedule: {
      alwaysOpen: false,
      timezone: "America/Denver",
      _items: [
        {
          recurrenceRule: "RRULE:FREQ=WEEKLY;INTERVAL=1;BYDAY=MO,TU,WE,TH",
          comment: "",
          fromTime: "0800",
          toTime: "1630",
        },
      ],
    },
    services: ["Food Assistance(SNAP)"],
    streetViewImage: null,
    subcategories: [],
    website: "www.BoulderCountyWIC.org",
  },
  {
    _id: "5def5b885fe02cacaec191da",
    address: {
      address1: "515 Kimbark St.",
      city: "Longmont",
      state: "CO",
      zip: "80501",
    },
    createdAt: new Date("2019-12-10T08:47:04.248Z"),
    deleted: false,
    description:
      "Our goal is to address the needs of a diverse population of families and individuals experiencing homelessness by providing time-limited housing with case management and life skills training to build their capacity to live self-sufficiently. The Inn Between has created a safe place and community of support for those facing homelessness. The Inn Between of Longmont believes that education is necessary to live self-sufficiently and to break the cycle of homelessness. Skills classes help resident's learn to live independently and are taught by experts from the community. ",
    resourceId: "5def5b88376022bd304171c2",
    kudos: 4,
    lastModifiedAt: new Date("2017-04-29T00:49:00.000Z"),
    latitude: 40.1679979,
    legacyId: "-KirBtsI2jXVhrgWt8Pm",
    longitude: -105.1015473,
    name: "The Inn Between",
    phone: "303-684-0810",
    schedule: {
      alwaysOpen: false,
      timezone: "America/Denver",
      _items: [
        {
          recurrenceRule: "RRULE:FREQ=WEEKLY;INTERVAL=1;BYDAY=MO,TU,WE,TH,FR",
          comment: "",
          fromTime: "0800",
          toTime: "1600",
        },
      ],
    },
    services: ["Supportive Housing", "Life Skills Training"],
    streetViewImage: "http://placeimg.com/640/480/arch",
    subcategories: [],
    website: "https://www.theinnbetween.org",
  },
  {
    _id: "5def5b875fe02cacaec1919d",
    address: {
      address1: "1345 Plaza Court North # 3A",
      city: "Lafayette",
      state: "CO",
      zip: "80026",
    },
    createdAt: new Date("2019-12-10T08:47:03.672Z"),
    deleted: false,
    description:
      "WIC promotes and maintains the health and well-being of nutritionally at-risk pregnant, breastfeeding, and postpartum women and infants and children by providing: Supplemental nutritious foods,  Nutrition and breastfeeding information and Referral to other health and nutrition services",
    resourceId: "5def5b87376022bd30417192",
    kudos: 0,
    lastModifiedAt: new Date("2019-12-10T08:47:03.673Z"),
    latitude: 39.9864839,
    legacyId: "-KZnScxOgxQxcyGn0Y1k",
    longitude: -105.10889159999999,
    name: "WIC: Women, Infants and Children (Lafayette)",
    phone: "(720) 564-2213",
    schedule: {
      alwaysOpen: false,
      timezone: "America/Denver",
      _items: [
        {
          recurrenceRule: "RRULE:FREQ=WEEKLY;INTERVAL=1;BYDAY=TU,WE,TH",
          comment: "",
          fromTime: "0800",
          toTime: "1630",
        },
      ],
    },
    services: ["Supplemental Nutritious Foods"],
    streetViewImage: "",
    subcategories: [],
    website: "www.BoulderCountyWIC.org",
  },
  {
    _id: "5def5b885fe02cacaec191c5",
    address: {
      address1: "P.O. Box 19589",
      city: "Boulder",
      state: "CO",
      zip: "80308",
    },
    createdAt: new Date("2019-12-10T08:47:04.047Z"),
    deleted: false,
    description:
      "More than a shelter, Mother House is a program that strives to build a young woman’s confidence and skills for a successful future. It serves women who have made the decision to carry their baby to term, whether they decide to parent or choose adoption. Mother House is located in Boulder, Colorado.  Residents come primarily from Colorado, but we have had residents who were from other locations. Typically, the applicants arrive early in their pregnancy and stay until 3 months after the birth of their baby. Our facility can house up to 7 women and their babies.  It provides a family environment where women can participate in group living, which helps to give support and promote friendships that will hopefully last long after leaving Mother House.  We often invite our alumni back to visit with current residents and continue to offer our support when they might need it.",
    resourceId: "5def5b88376022bd304171ae",
    kudos: 1,
    lastModifiedAt: new Date("2016-12-31T04:09:00.000Z"),
    latitude: 40.0149856,
    legacyId: "-K_I4jMH82abjnhJxtfr",
    longitude: -105.27054559999999,
    name: "Mother House",
    phone: "(303) 447-9602",
    schedule: {
      alwaysOpen: false,
      timezone: "America/Denver",
      _items: [
        {
          recurrenceRule: "RRULE:FREQ=WEEKLY;INTERVAL=1;BYDAY=MO,TU,WE,TH,FR",
          comment: "",
          fromTime: "0800",
          toTime: "1700",
        },
      ],
    },
    services: ["Transitional Housing for Pregnant Women"],
    streetViewImage: "http://placeimg.com/640/480/arch",
    subcategories: [],
    website: "https://www.mother-house.org/our-program/our-program.html",
  },
  {
    _id: "5def5b885fe02cacaec191cf",
    address: {
      address1: "6739 S. Boulder Rd.",
      city: "Boulder",
      state: "CO",
      zip: "80303",
    },
    createdAt: new Date("2019-12-10T08:47:04.145Z"),
    deleted: false,
    description:
      "Gabriel House is a network of parishes and volunteers that assist families throughout Northern Colorado. We are committed to providing much-needed supplies to mothers and families with young children.  The Gabriel Project is a ministry of Catholic Charities of Denver. We provide pregnant women and young families in need with spiritual, material, and emotional support. All families are welcome!",
    resourceId: "5def5b88376022bd304171b8",
    kudos: 0,
    lastModifiedAt: new Date("2019-12-10T08:47:04.145Z"),
    latitude: 39.9883808,
    legacyId: "-KhyYGCD-0JR0iLV6l7h",
    longitude: -105.19547130000001,
    name: "Boulder Gabriel House",
    phone: "303-449-0122",
    schedule: {
      alwaysOpen: false,
      timezone: "America/Denver",
      _items: [
        {
          recurrenceRule: "RRULE:FREQ=WEEKLY;INTERVAL=1;BYDAY=TU",
          comment: "",
          fromTime: "0900",
          toTime: "1400",
        },
        {
          recurrenceRule: "RRULE:FREQ=WEEKLY;INTERVAL=1;BYDAY=SA",
          comment: "",
          fromTime: "0900",
          toTime: "1200",
        },
      ],
    },
    services: [
      "Diapers",
      "Wipes",
      "Formula",
      "Baby Food",
      "Blankets",
      "Clothing (up to 5T)",
    ],
    streetViewImage: "http://placeimg.com/640/480/arch",
    subcategories: [],
    website: "https://ccdenver.org/gabriel-house/",
  },
  {
    _id: "5def5b885fe02cacaec191d1",
    address: {
      address1: "20 West Mountain View Ave",
      city: "Longmont",
      state: "CO",
      zip: "80501",
    },
    createdAt: new Date("2019-12-10T08:47:04.164Z"),
    deleted: false,
    description:
      "Life Choices helps women and men who are facing unplanned pregnancies, offers healing from after-abortion stress, and educates about sexual life choices.  At Life Choices our goal is to educate women on all their options so that each woman can make a choice that she is comfortable with. We come along side each woman to support her no matter what her choice may be. Whether a woman decides to carry her child to full term, go through the adoption process, or terminate the pregnancy, we will provide support.",
    resourceId: "5def5b88376022bd304171ba",
    kudos: 0,
    lastModifiedAt: new Date("2019-12-10T08:47:04.164Z"),
    latitude: 40.1815242,
    legacyId: "-Kigar_wzpTiyh2mUEXy",
    longitude: -105.09414649999997,
    name: "Life Choices - Longmont",
    phone: "303-651-2050",
    schedule: { alwaysOpen: false, timezone: "America/Denver", _items: [] },
    services: ["Free Pregnancy", "Ultrasound", "STI Testing"],
    streetViewImage: "http://placeimg.com/640/480/arch",
    subcategories: [],
    website: "http://www.lifechoices.org",
  },
  {
    _id: "5def5b885fe02cacaec191de",
    address: {
      address1: "PO Box 270181",
      city: "Louisville",
      state: "CO",
      zip: "80027",
    },
    createdAt: new Date("2019-12-10T08:47:04.293Z"),
    deleted: false,
    description:
      "The Little Flower Maternity Home is a home where pregnant mothers over 18, can come and live free of charge from any point in their pregnancy until their baby is 6 months old.  The Little Flower is not a hand-out, but rather a hand-up to these homeless mothers in need.    Mothers at The Little Flower spend their time saving money and working towards self-sufficiency.  Staff members and Volunteers guide and encourage her on her way toward self-sufficiency.   This gives her the opportunity to focus on having a safe & healthy pregnancy and to set future goals for her baby and herself.  The Little Flower provides a safe, healthy and loving community environment.  Mothers can enter the next chapter of their lives, leaving behind unhealthy and unsafe behavior. Basic Qualifications for Mothers: Pregnant, At least 18 years old, Currently Drug and Alcohol free, Free from immediate physical danger, Free from diagnosed severe mental illness, Without other children in her care",
    resourceId: "5def5b88376022bd304171c6",
    kudos: 0,
    lastModifiedAt: new Date("2019-12-10T08:47:04.293Z"),
    latitude: 39.977763,
    legacyId: "-KmOFmcStxVNB-5Tszdx",
    longitude: -105.13192960000003,
    name: "The Little Flower Maternity Home",
    phone: "(720) 609-2934",
    schedule: { alwaysOpen: false, timezone: "America/Denver", _items: [] },
    services: ["Maternity housing"],
    streetViewImage: "http://placeimg.com/640/480/arch",
    subcategories: [],
    website: "http://littleflowermaternity.org",
  },
];

export const category: TCategory = {
  subcategories: [],
  _id: "5dad0693dbe5cc7b65bcabbd",
  name: "Category Name Here",
  stub: "category-name-here",
  color: "orangePrimary",
  createdAt: new Date(),
  lastModifiedAt: new Date(),
};

export const subCategory: TSubcategory = {
  resources: mockResources,
  _id: "5dad0693dbe5cc7b65bcabbe",
  name: "Sub-Category Name Here",
  stub: "subcategory-name-here",
  parentCategory: category,
  createdAt: new Date(),
  lastModifiedAt: new Date(),
};

category.subcategories = [subCategory];
