import mongoose from "mongoose";
import * as dotenv from "dotenv";
import Category from "../src/models/Category";

dotenv.config();

const categories: { name: string; color: string; subcategories: string[] }[] = [
  {
    name: "Food",
    color: "gold",
    subcategories: ["Meals", "Food Pantries"]
  },
  {
    name: "Health",
    color: "red",
    subcategories: [
      "Addiction Recovery Services",
      "Clinics",
      "Dental",
      "Hospital",
      "Mental",
      "Pharmacies",
      "Vision"
    ]
  },
  {
    name: "Hygiene",
    color: "teal",
    subcategories: [
      "Feminine Products",
      "Water Fountains",
      "Showers",
      "Restrooms"
    ]
  },
  {
    name: "Job Training",
    color: "lavendar",
    subcategories: [
      "Craigs List",
      "Temp Agency",
      "Day Labor",
      "Ready to Work",
      "Career Counseling"
    ]
  },
  {
    name: "Resources",
    color: "purple",
    subcategories: [
      "Pets",
      "Hair Care",
      "Laundry",
      "Legal Help",
      "Outdoor Gear",
      "Home Goods",
      "Shoes",
      "Clothing"
    ]
  },
  {
    name: "Shelters",
    color: "orangePrimary",
    subcategories: [
      "Pregnant",
      "Abused",
      "Youth",
      "Family",
      "Transitional",
      "Temporary",
      "Emergency"
    ]
  },
  {
    name: "Social Services",
    color: "brown",
    subcategories: [
      "Social Security",
      "Health and Human Services",
      "Food Stamps"
    ]
  },
  {
    name: "Transit",
    color: "green",
    subcategories: ["Bus", "Bicycle", "Lite Rail"]
  },
  {
    name: "Wifi",
    color: "blue",
    subcategories: ["Free Wifi", "Public Computer", "Charging"]
  }
];

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
  .then(() => console.log(`Connected to MongoDB instance at ${DATABASE_URL}`))
  .catch(e =>
    console.log(
      `There was an error connecting to the MongoDB instance at ${DATABASE_URL}:\n${e}`
    )
  )
  .then(async () => {
    for (const category of categories) {
      const categoryRecord = await Category.findByNameOrCreate(category.name);
      for (const subcategory of category.subcategories) {
        await (categoryRecord as any).addSubcategory(subcategory);
      }
      await (categoryRecord as any).save();
    }
  })
  .catch(e =>
    console.log(
      `There was an error creating categories:\n${e}\n${console.trace()}`
    )
  )
  .finally(() => mongoose.connection.close());
