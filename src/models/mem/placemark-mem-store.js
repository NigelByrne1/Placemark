import { v4 } from "uuid";

let placemarks = [];

export const placemarkMemStore = {
  async getAllplacemarks() {
    return placemarks;
  },

  async addplacemark(categoryId, placemark) {
    placemark._id = v4();
    placemark.categoryid = categoryId;
    placemarks.push(placemark);
    return placemark;
  },

  async getplacemarksBycategoryId(id) {
    return placemarks.filter((placemark) => placemark.categoryid === id);
  },

  async getplacemarkById(id) {
    return placemarks.find((placemark) => placemark._id === id);
  },

  async getcategoryplacemarks(categoryId) {
    return placemarks.filter((placemark) => placemark.categoryid === categoryId);
  },

  async deleteplacemark(id) {
    const index = placemarks.findIndex((placemark) => placemark._id === id);
    placemarks.splice(index, 1);
  },

  async deleteAllplacemarks() {
    placemarks = [];
  },

  async updateplacemark(placemark, updatedplacemark) {
    placemark.name = updatedplacemark.name;
    placemark.description = updatedplacemark.description;
    placemark.latitude = updatedplacemark.latitude;
    placemark.longitude = updatedplacemark.longitude;
  },
};
