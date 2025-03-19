import { v4 } from "uuid";
import { db } from "./store-utils.js";

export const placemarkJsonStore = {
  async getAllplacemarks() {
    await db.read();
    return db.data.placemarks;
  },

  async addplacemark(categoryId, placemark) {
    await db.read();
    placemark._id = v4();
    placemark.categoryid = categoryId;
    db.data.placemarks.push(placemark);
    await db.write();
    return placemark;
  },

  async getplacemarksBycategoryId(id) {
    await db.read();
    return db.data.placemarks.filter((placemark) => placemark.categoryid === id);
  },

  async getplacemarkById(id) {
    await db.read();
    return db.data.placemarks.find((placemark) => placemark._id === id);
  },

  async deleteplacemark(id) {
    await db.read();
    const index = db.data.placemarks.findIndex((placemark) => placemark._id === id);
    db.data.placemarks.splice(index, 1);
    await db.write();
  },

  async deleteAllplacemarks() {
    db.data.placemarks = [];
    await db.write();
  },

  async updateplacemark(placemark, updatedplacemark) {
    placemark.name = updatedplacemark.name;
    placemark.description = updatedplacemark.description;
    placemark.latitude = updatedplacemark.latitude;
    placemark.longitude = updatedplacemark.longitude;
    await db.write();
  },
};
