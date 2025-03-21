import { v4 } from "uuid";
import { db } from "./store-utils.js";
import { placemarkJsonStore } from "./placemark-json-store.js";

export const categoryJsonStore = {
  async getAllCategorys() {
    await db.read();
    return db.data.categorys;
  },

  async addCategory(category) {
    await db.read();
    category._id = v4();
    db.data.categorys.push(category);
    await db.write();
    return category;
  },

  async getCategoryById(id) {
    await db.read();
    let list = db.data.categorys.find((category) => category._id === id);
    if (list) {
      list.placemark = await placemarkJsonStore.getPlacemarksByCategoryId(list._id);
    } else {
      list = null;
    }
    return list;
  },

  async getUserCategorys(userid) {
    await db.read();
    return db.data.categorys.filter((category) => category.userid === userid);
  },

  async deleteCategoryById(id) {
    await db.read();
    const index = db.data.categorys.findIndex((category) => category._id === id);
    if (index !== -1) db.data.categorys.splice(index, 1);
    await db.write();
  },

  async deleteAllCategorys() {
    db.data.categorys = [];
    await db.write();
  },
};
