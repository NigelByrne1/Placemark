import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testUsers, trail, careys, castle, testCategorys, testPlacemarks } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Placemark Model tests", () => {

  let castleList = null;

  setup(async () => {
    db.init("mongo");
    await db.categoryStore.deleteAllCategorys();
    await db.placemarkStore.deleteAllPlacemarks();
    castleList = await db.categoryStore.addCategory(castle);
    for (let i = 0; i < testPlacemarks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testPlacemarks[i] = await db.placemarkStore.addPlacemark(castleList._id, testPlacemarks[i]);
    }
  });

  test("create single placemark", async () => {
    const trailList = await db.categoryStore.addCategory(trail);
    const placemark = await db.placemarkStore.addPlacemark(trailList._id, careys)
    assert.isNotNull(placemark._id);
    assertSubset (careys, placemark);
  });

  test("get multiple placemarks", async () => {
    const placemarks = await db.placemarkStore.getPlacemarksByCategoryId(castleList._id);
    assert.equal(placemarks.length, testPlacemarks.length)
  });

  test("delete all placemarks", async () => {
    const placemarks = await db.placemarkStore.getAllPlacemarks();
    assert.equal(testPlacemarks.length, placemarks.length);
    await db.placemarkStore.deleteAllPlacemarks();
    const newPlacemarks = await db.placemarkStore.getAllPlacemarks();
    assert.equal(0, newPlacemarks.length);
  });

  test("get a placemark - success", async () => {
    const trailList = await db.categoryStore.addCategory(trail);
    const placemark = await db.placemarkStore.addPlacemark(trailList._id, careys)
    const newPlacemark = await db.placemarkStore.getPlacemarkById(placemark._id);
    assertSubset (careys, newPlacemark);
  });

  test("delete One Placemark - success", async () => {
    await db.placemarkStore.deletePlacemark(testPlacemarks[0]._id);
    const placemarks = await db.placemarkStore.getAllPlacemarks();
    assert.equal(placemarks.length, testCategorys.length - 1);
    const deletedPlacemark = await db.placemarkStore.getPlacemarkById(testPlacemarks[0]._id);
    assert.isNull(deletedPlacemark);
  });

  test("get a placemark - bad params", async () => {
    assert.isNull(await db.placemarkStore.getPlacemarkById(""));
    assert.isNull(await db.placemarkStore.getPlacemarkById());
  });

  test("delete one placemark - fail", async () => {
    await db.placemarkStore.deletePlacemark("bad-id");
    const placemarks = await db.placemarkStore.getAllPlacemarks();
    assert.equal(placemarks.length, testCategorys.length);
  });
});
