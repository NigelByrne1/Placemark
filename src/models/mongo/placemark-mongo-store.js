import { Placemark } from "./placemark.js";

export const placemarkMongoStore = {
  async getPlacemarksByPlaylistId(id) {
    const placemarks = await Placemark.find({ categoryid: id }).lean();
    return placemarks;
  },
};
