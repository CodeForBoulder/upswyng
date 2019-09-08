import mongoose from "mongoose";
import * as dotenv from "dotenv";
import Category from "../src/models/Category";

dotenv.config();

const categories: {
  name: string;
  color: string;
  stub: string;
  subcategories: { name: string; stub: string }[];
}[] = [
  {
    color: "gold",
    name: "Food",
    stub: "food",
    subcategories: [
      { name: "Meals", stub: "meals" },
      { name: "Food Pantries", stub: "food_pantries" }
    ]
  },
  {
    color: "red",
    name: "Health",
    stub: "health",
    subcategories: [
      {
        name: "Addiction Recovery Services",
        stub: "addiction_recovery_services"
      },
      { name: "Clinics", stub: "clinics" },
      { name: "Dental", stub: "dental" },
      { name: "Hospital", stub: "hospital" },
      { name: "Mental", stub: "mental" },
      { name: "Pharmacies", stub: "pharmacies" },
      { name: "Vision", stub: "vision" }
    ]
  },
  {
    color: "teal",
    name: "Hygiene",
    stub: "hygiene",
    subcategories: [
      { name: "Feminine Products", stub: "feminine_products" },
      { name: "Water Fountains", stub: "water_fountains" },
      { name: "Showers", stub: "showers" },
      { name: "Restrooms", stub: "restrooms" }
    ]
  },
  {
    color: "lavendar",
    name: "Job Training",
    stub: "job_training",
    subcategories: [
      { name: "Craigs List", stub: "craigslist" },
      { name: "Temp Agency", stub: "temp_agency" },
      { name: "Day Labor", stub: "day_labor" },
      { name: "Ready to Work", stub: "ready_to_work" },
      { name: "Career Counseling", stub: "career_counseling" }
    ]
  },
  {
    color: "purple",
    name: "Resources",
    stub: "resources",
    subcategories: [
      { name: "Pets", stub: "pets" },
      { name: "Hair Care", stub: "hair_care" },
      { name: "Laundry", stub: "laundry" },
      { name: "Legal Help", stub: "legal_help" },
      { name: "Outdoor Gear", stub: "outdoor_gear" },
      { name: "Home Goods", stub: "home_goods" },
      { name: "Shoes", stub: "shoes" },
      { name: "Clothing", stub: "clothing" }
    ]
  },
  {
    color: "orangePrimary",
    name: "Shelters",
    stub: "shelters",
    subcategories: [
      { name: "Pregnant", stub: "pregnant" },
      { name: "Abused", stub: "abused" },
      { name: "Youth", stub: "youth" },
      { name: "Family", stub: "family" },
      { name: "Transitional", stub: "transitional" },
      { name: "Temporary", stub: "temporary" },
      { name: "Emergency", stub: "emergency" }
    ]
  },
  {
    color: "brown",
    name: "Social Services",
    stub: "social_services",
    subcategories: [
      { name: "Social Security", stub: "social_security" },
      { name: "Health and Human Services", stub: "health_and_human_services" },
      { name: "Food Stamps", stub: "food_stamps" }
    ]
  },
  {
    color: "green",
    name: "Transit",
    stub: "transit",
    subcategories: [
      { name: "Bus", stub: "bus" },
      { name: "Bicycle", stub: "bicycle" },
      { name: "Lite Rail", stub: "lite_rail" }
    ]
  },
  {
    color: "blue",
    name: "Wifi",
    stub: "wifi",
    subcategories: [
      { name: "Free Wifi", stub: "free_wifi" },
      { name: "Public Computer", stub: "public_computer" },
      { name: "Charging", stub: "charging" }
    ]
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
      const categoryRecord = await Category.findOrCreate(category.name, category.stub);
      for (const subcategory of category.subcategories) {
        await (categoryRecord as any).addSubcategory(subcategory.name, subcategory.stub);
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
