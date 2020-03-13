import Alert, { alertDocumentToFullAlert } from "../Alert";

import { MongoMemoryServer } from "mongodb-memory-server";
import User from "../User";
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

beforeEach(async () => {
  await Alert.deleteMany({});
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("Alert (model)", () => {
  describe("genActiveAlerts", () => {
    it("gets an active alert", async () => {
      const testUser = await new User().save();
      const now = new Date("2010-01-02");
      const start = new Date("2010-01-01");
      const end = new Date("2010-01-03");
      const a = new Alert({
        createdBy: testUser._id,
        lastModifiedBy: testUser._id,
        isApproved: true,
        isCancelled: false,
        color: "#ffffff",
        icon: "fas fa-icon",
        title: "Should show this",
        start,
        end,
      });
      await a.save();

      const b = new Alert({
        createdBy: testUser._id,
        lastModifiedBy: testUser._id,
        isApproved: true,
        isCancelled: false,
        color: "#ffffff",
        icon: "fas fa-icon",
        title: "Should NOT show this",
        start: new Date("2019-12-30"),
        end: new Date("2020-01-01"),
      });
      await b.save();

      const result = await Alert.genActiveAlerts(now);

      expect(result.length).toEqual(1);
      expect(result[0].title).toEqual("Should show this");
    });

    it("hides a cancelled alert", async () => {
      const testUser = await new User().save();
      const now = new Date("2010-01-02");
      const start = new Date("2010-01-01");
      const end = new Date("2010-01-03");
      const a = new Alert({
        createdBy: testUser._id,
        lastModifiedBy: testUser._id,
        isApproved: true,
        isCancelled: true,
        color: "#ffffff",
        icon: "fas fa-icon",
        title: "Should not show this",
        start,
        end,
      });
      await a.save();

      const result = await Alert.genActiveAlerts(now);

      expect(result.length).toEqual(0);
    });

    it("hides an unapproved alert", async () => {
      const testUser = await new User().save();
      const now = new Date("2010-01-02");
      const start = new Date("2010-01-01");
      const end = new Date("2010-01-03");
      const a = new Alert({
        createdBy: testUser._id,
        lastModifiedBy: testUser._id,
        isApproved: false,
        isCancelled: false,
        color: "#ffffff",
        icon: "fas fa-icon",
        title: "Should not show this",
        start,
        end,
      });
      await a.save();

      const result = await Alert.genActiveAlerts(now);

      expect(result.length).toEqual(0);
    });
  });

  describe("converting alert documents to alerts", () => {
    it("converts to full alert (populating user)", async () => {
      const testUser = await new User().save();
      const start = new Date("2010-01-01");
      const end = new Date("2010-01-03");
      const a = new Alert({
        createdBy: testUser._id,
        lastModifiedBy: testUser._id,
        isApproved: false,
        isCancelled: false,
        color: "#ffffff",
        icon: "fas fa-icon",
        title: "Test Title",
        start,
        end,
      });

      const result = await alertDocumentToFullAlert(a);

      expect(result.title).toEqual("Test Title");
      expect(result.start).toEqual(start);
      expect(result.end).toEqual(end);
      expect(result.createdBy._id).toEqual(testUser._id);
      expect(result.lastModifiedBy._id).toEqual(testUser._id);
    });
  });
});
