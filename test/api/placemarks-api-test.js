import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { placemarkService } from "./placemark-service.js";
import { michael, trail, testCategorys, testPlacemarks, careys } from "../fixtures.js";

suite("Placemark API tests", () => {
  let user = null;
  let beachClub = null;

  setup(async () => {
    await placemarkService.deleteAllCategorys();
    await placemarkService.deleteAllUsers();
    await placemarkService.deleteAllPlacemarks();
    user = await placemarkService.createUser(michael);
    trail.userid = user._id;
    beachClub = await placemarkService.createCategory(trail);
  });

  teardown(async () => {});

  test("create placemark", async () => {
    const returnedPlacemark = await placemarkService.createPlacemark(beachClub._id, careys);
    assertSubset(careys, returnedPlacemark);
  });

  test("create Multiple placemarks", async () => {
    for (let i = 0; i < testPlacemarks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await placemarkService.createPlacemark(beachClub._id, testPlacemarks[i]);
    }
    const returnedPlacemarks = await placemarkService.getAllPlacemarks();
    assert.equal(returnedPlacemarks.length, testPlacemarks.length);
    for (let i = 0; i < returnedPlacemarks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const placemark = await placemarkService.getPlacemark(returnedPlacemarks[i]._id);
      assertSubset(placemark, returnedPlacemarks[i]);
    }
  });

  test("Delete PlacemarkApi", async () => {
    for (let i = 0; i < testPlacemarks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await placemarkService.createPlacemark(beachClub._id, testPlacemarks[i]);
    }
    let returnedPlacemarks = await placemarkService.getAllPlacemarks();
    assert.equal(returnedPlacemarks.length, testPlacemarks.length);
    for (let i = 0; i < returnedPlacemarks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const placemark = await placemarkService.deletePlacemark(returnedPlacemarks[i]._id);
    }
    returnedPlacemarks = await placemarkService.getAllPlacemarks();
    assert.equal(returnedPlacemarks.length, 0);
  });

  test("denormalised category", async () => {
    for (let i = 0; i < testPlacemarks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await placemarkService.createPlacemark(beachClub._id, testPlacemarks[i]);
    }
    const returnedCategory = await placemarkService.getCategory(beachClub._id);
    assert.equal(returnedCategory.placemarks.length, testPlacemarks.length);
    for (let i = 0; i < testPlacemarks.length; i += 1) {
      assertSubset(testPlacemarks[i], returnedCategory.placemarks[i]);
    }
  });
});
