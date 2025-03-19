import { db } from "../models/db.js";

export const categoryController = {
  index: {
    handler: async function (request, h) {
      const category = await db.categoryStore.getcategoryById(request.params.id);
      const viewData = {
        title: "Category",
        category: category,
      };
      return h.view("category-view", viewData);
    },
  },

  addPlacemark: {
    handler: async function (request, h) {
      const category = await db.categoryStore.getcategoryById(request.params.id);
      const newplacemark = {
        name: request.payload.name,
        description: request.payload.description,
        latitude: Number(request.payload.latitude),
        longitude: Number(request.payload.longitude),
      };
      await db.placemarkStore.addplacemark(category._id, newplacemark);
      return h.redirect(`/category/${category._id}`);
    },
  },

  deletePlacemark: {
    handler: async function (request, h) {
      const category = await db.categoryStore.getcategoryById(request.params.id);
      await db.placemarkStore.deleteplacemark(request.params.placemarkid);
      return h.redirect(`/category/${category._id}`);
    },
  },
};
