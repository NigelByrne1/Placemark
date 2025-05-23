import { EventEmitter } from "events";
import { assert } from "chai";
import { placemarkService } from "./placemark-service.js";
import { assertSubset } from "../test-utils.js";
import { michael, michaelCredentials, trail, testCategorys } from "../fixtures.js";

EventEmitter.setMaxListeners(25);

suite("Category API tests", () => {
  let user = null;

  setup(async () => {
    placemarkService.clearAuth();
    user = await placemarkService.createUser(michael);
    await placemarkService.authenticate(michaelCredentials);
    await placemarkService.deleteAllCategorys();
    await placemarkService.deleteAllUsers();
    user = await placemarkService.createUser(michael);
    await placemarkService.authenticate(michaelCredentials);
    trail.userid = user._id;
  });

  teardown(async () => {});

  test("create category", async () => {
    const returnedCategory = await placemarkService.createCategory(trail);
    assert.isNotNull(returnedCategory);
    assertSubset(trail, returnedCategory);
  });

  test("delete a category", async () => {
    const category = await placemarkService.createCategory(trail);
    const response = await placemarkService.deleteCategory(category._id);
    assert.equal(response.status, 204);
    try {
      const returnedCategory = await placemarkService.getCategory(category.id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Category with this id", "Incorrect Response Message");
    }
  });

  test("create multiple categorys", async () => {
    for (let i = 0; i < testCategorys.length; i += 1) {
      const category = {
        title: testCategorys[i].title,
        userid: user._id,
      };
      // eslint-disable-next-line no-await-in-loop
      await placemarkService.createCategory(category);
    }

    let returnedLists = await placemarkService.getAllCategorys();
    assert.equal(returnedLists.length, testCategorys.length);
    await placemarkService.deleteAllCategorys();
    returnedLists = await placemarkService.getAllCategorys();
    assert.equal(returnedLists.length, 0);
  });

  test("remove non-existant category", async () => {
    try {
      const response = await placemarkService.deleteCategory("not an id");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Category with this id", "Incorrect Response Message");
    }
  });
});
