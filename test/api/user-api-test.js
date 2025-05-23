import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { placemarkService } from "./placemark-service.js";
import { michael, mary, michaelCredentials, testUsers } from "../fixtures.js";

const users = new Array(testUsers.length);

suite("User API tests", () => {
  setup(async () => {
    placemarkService.clearAuth();
    await placemarkService.createUser(michael);
    await placemarkService.authenticate(michaelCredentials);
    await placemarkService.deleteAllUsers();
    for (let i = 0; i < testUsers.length; i += 1) {
      const cleanUser = {
        firstName: testUsers[i].firstName,
        lastName: testUsers[i].lastName,
        email: `testuser${i}_${Date.now()}@example.com`,  // ✅ unique
        password: testUsers[i].password,
      };
      try {
        // eslint-disable-next-line no-await-in-loop
        users[i] = await placemarkService.createUser(cleanUser);
      } catch (error) {
        console.error("💥 Failed to create user:", cleanUser, error.response?.data || error.message);
        throw error;
      }
    }
    await placemarkService.createUser(michael);
    await placemarkService.authenticate(michaelCredentials);
  });
  teardown(async () => {});

  test("create a user", async () => {
    const newUser = await placemarkService.createUser(michael);
    assertSubset(michael, newUser);
    assert.isDefined(newUser._id);
  });

  test("delete all user", async () => {
    let returnedUsers = await placemarkService.getAllUsers();
    assert.equal(returnedUsers.length, 4);
    await placemarkService.deleteAllUsers();
    await placemarkService.createUser(michael);
    await placemarkService.authenticate(michaelCredentials);
    returnedUsers = await placemarkService.getAllUsers();
    assert.equal(returnedUsers.length, 1);
  });

  test("get a user", async () => {
    const returnedUser = await placemarkService.getUser(users[0]._id);
    assert.deepEqual(users[0], returnedUser);
  });

  test("get a user - bad id", async () => {
    try {
      const returnedUser = await placemarkService.getUser("1234");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No User with this id");
      assert.equal(error.response.data.statusCode, 404);
    }
  });

  test("get a user - deleted user", async () => {
    await placemarkService.deleteAllUsers();
    await placemarkService.createUser(michael);
    await placemarkService.authenticate(michaelCredentials);
    try {
      const returnedUser = await placemarkService.getUser(users[0]._id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No User with this id");
      assert.equal(error.response.data.statusCode, 404);
    }
  });
});
