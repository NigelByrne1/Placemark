import { v4 } from "uuid";
import { db } from "./store-utils.js";

export const placemarkJsonStore = {
  async getAllplacemarks() {
    await db.read();
    return db.data.placemarks;
  },

  async addPlacemark(categoryId, placemark) {
    await db.read();
    placemark._id = v4();
    placemark.categoryid = categoryId;
    db.data.placemarks.push(placemark);
    await db.write();
    return placemark;
  },

  async getPlacemarksByCategoryId(id) {
    await db.read();
    return db.data.placemarks.filter((placemark) => placemark.categoryid === id);
  },

  async getPlacemarkById(id) {
    await db.read();
    return db.data.placemarks.find((placemark) => placemark._id === id);
  },

  async deletePlacemark(id) {
    await db.read();
    const index = db.data.placemarks.findIndex((placemark) => placemark._id === id);
    db.data.placemarks.splice(index, 1);
    await db.write();
  },

  async deleteAllPlacemarks() {
    db.data.placemarks = [];
    await db.write();
  },

  async updatePlacemark(placemark, updatedplacemark) {
    placemark.name = updatedplacemark.name;
    placemark.description = updatedplacemark.description;
    placemark.latitude = updatedplacemark.latitude;
    placemark.longitude = updatedplacemark.longitude;
    await db.write();
  },
};
