import { v4 } from "uuid";
import { placemarkMemStore } from "./placemark-mem-store.js";

let categorys = [];

export const categoryMemStore = {
  async getAllcategorys() {
    return categorys;
  },

  async addcategory(category) {
    category._id = v4();
    categorys.push(category);
    return category;
  },

  async getcategoryById(id) {
    const list = categorys.find((category) => category._id === id);
    list.placemarks = await placemarkMemStore.getplacemarksBycategoryId(list._id);
    return list;
  },

  async getUsercategorys(userid) {
    return categorys.filter((category) => category.userid === userid);
  },

  async deletecategoryById(id) {
    const index = categorys.findIndex((category) => category._id === id);
    categorys.splice(index, 1);
  },

  async deleteAllcategorys() {
    categorys = [];
  },
};
