import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { placemarkService } from "./placemark-service.js";
import { michael, trail, michaelCredentials, testPlacemarks, careys } from "../fixtures.js";

suite("Placemark API tests", () => {
  let user = null;
  let sampleCategory = null;

  setup(async () => {
    placemarkService.clearAuth();
    user = await placemarkService.createUser(michael);
    await placemarkService.authenticate(michaelCredentials);
    await placemarkService.deleteAllCategorys();
    await placemarkService.deleteAllPlacemarks();
    await placemarkService.deleteAllUsers();
    user = await placemarkService.createUser(michael);
    await placemarkService.authenticate(michaelCredentials);
    trail.userid = user._id;
    sampleCategory = await placemarkService.createCategory(trail);
  });

  teardown(async () => {});

  test("create placemark", async () => {
    const returnedPlacemark = await placemarkService.createPlacemark(sampleCategory._id, careys);
    assertSubset(careys, returnedPlacemark);
  });

  test("create Multiple placemarks", async () => {
    for (let i = 0; i < testPlacemarks.length; i += 1) {
      const cleanPlacemark = {
        name: testPlacemarks[i].name,
        description: testPlacemarks[i].description,
        latitude: testPlacemarks[i].latitude,
        longitude: testPlacemarks[i].longitude,
      };
      // eslint-disable-next-line no-await-in-loop
      await placemarkService.createPlacemark(sampleCategory._id, cleanPlacemark);
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
      const cleanPlacemark = {
        name: testPlacemarks[i].name,
        description: testPlacemarks[i].description,
        latitude: testPlacemarks[i].latitude,
        longitude: testPlacemarks[i].longitude,
      };
      // eslint-disable-next-line no-await-in-loop
      await placemarkService.createPlacemark(sampleCategory._id, cleanPlacemark);
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
      const cleanPlacemark = {
        name: testPlacemarks[i].name,
        description: testPlacemarks[i].description,
        latitude: testPlacemarks[i].latitude,
        longitude: testPlacemarks[i].longitude,
      };
      // eslint-disable-next-line no-await-in-loop
      await placemarkService.createPlacemark(sampleCategory._id, cleanPlacemark);
    }
    const returnedCategory = await placemarkService.getCategory(sampleCategory._id);
    assert.equal(returnedCategory.placemarks.length, testPlacemarks.length);
    for (let i = 0; i < testPlacemarks.length; i += 1) {
      assertSubset(testPlacemarks[i], returnedCategory.placemarks[i]);
    }
  });
});
