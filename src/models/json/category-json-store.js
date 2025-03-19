import { v4 } from "uuid";
import { db } from "./store-utils.js";
import { placemarkJsonStore } from "./placemark-json-store.js";

export const categoryJsonStore = {
  async getAllcategorys() {
    await db.read();
    return db.data.categorys;
  },

  async addcategory(category) {
    await db.read();
    category._id = v4();
    db.data.categorys.push(category);
    await db.write();
    return category;
  },

  async getcategoryById(id) {
    await db.read();
    const list = db.data.categorys.find((category) => category._id === id);
    list.placemarks = await placemarkJsonStore.getplacemarksBycategoryId(list._id);
    return list;
  },

  async getUsercategorys(userid) {
    await db.read();
    return db.data.categorys.filter((category) => category.userid === userid);
  },

  async deletecategoryById(id) {
    await db.read();
    const index = db.data.categorys.findIndex((category) => category._id === id);
    db.data.categorys.splice(index, 1);
    await db.write();
  },

  async deleteAllcategorys() {
    db.data.categorys = [];
    await db.write();
  },
};
