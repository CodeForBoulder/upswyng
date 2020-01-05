import Category from "../Category";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

// May require additional time for downloading MongoDB binaries
jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;

let mongoServer;

beforeAll(async () => {
  mongoServer = new MongoMemoryServer();
  const mongoUri = await mongoServer.getConnectionString();
  await mongoose.connect(mongoUri, {}, err => {
    if (err) console.error(err);
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("Category (model)", () => {
  it("gets a category by stub", async () => {
    await (
      await Category.findOrCreate("Test Category 1", "test-category-1")
    ).save();
    const c = await Category.getByStub("test-category-1");
    expect(c.name).toEqual("Test Category 1");
  });

  it("gets the category List", async () => {
    await (
      await Category.findOrCreate("Test Category 1", "test-category-1")
    ).save();
    await (
      await Category.findOrCreate("Test Category 2", "test-category-2")
    ).save();
    const list = await Category.getCategoryList();
    expect(list.length).toEqual(2);
    expect(list.map(x => x.name)).toContain("Test Category 1");
    expect(list.map(x => x.name)).toContain("Test Category 2");
  });
});
