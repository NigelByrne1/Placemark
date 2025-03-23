import { userApi } from "./api/user-api.js";
import { categoryApi } from "./api/category-api.js";

export const apiRoutes = [
  { method: "GET", path: "/api/users", config: userApi.find },
  { method: "POST", path: "/api/users", config: userApi.create },
  { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
  { method: "GET", path: "/api/users/{id}", config: userApi.findOne },

  { method: "POST", path: "/api/categorys", config: categoryApi.create },
  { method: "DELETE", path: "/api/categorys", config: categoryApi.deleteAll },
  { method: "GET", path: "/api/categorys", config: categoryApi.find },
  { method: "GET", path: "/api/categorys/{id}", config: categoryApi.findOne },
  { method: "DELETE", path: "/api/categorys/{id}", config: categoryApi.deleteOne },
];
