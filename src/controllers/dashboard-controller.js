import { db } from "../models/db.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const categorys = await db.categoryStore.getUsercategorys(loggedInUser._id);
      const viewData = {
        title: "Placemark Dashboard",
        user: loggedInUser,
        categorys: categorys,
      };
      return h.view("dashboard-view", viewData);
    },
  },

  addCategory: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const newcategory = {
        userid: loggedInUser._id,
        title: request.payload.title,
      };
      await db.categoryStore.addcategory(newcategory);
      return h.redirect("/dashboard");
    },
  },

  deleteCategory: {
    handler: async function (request, h) {
      const category = await db.categoryStore.getcategoryById(request.params.id);
      await db.categoryStore.deletecategoryById(category._id);
      return h.redirect("/dashboard");
    },
  },
};
