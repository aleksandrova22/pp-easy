import { remultNextApp } from "remult/remult-next";
import { createPostgresDataProvider } from "remult/postgres";
import { getUserFromRequest } from "./auth";
import { User } from "../../shared/entities/User";
import { Meal } from "../../shared/entities/Meal";
import { Menu } from "../../shared/entities/Menu";
import { UsersMeal } from "../../shared/entities/UsersMeal";
import { Roles } from "@/demo/auth/Roles";

export const api = remultNextApp({
  getUser: getUserFromRequest,
  initApi: async () => {
    await User.createDemoUsers();
  },
  dataProvider: createPostgresDataProvider({
    connectionString: process.env["DATABASE_URL"]
  }),
  admin: Roles.admin,
  entities: [User, Meal, Menu, UsersMeal],
});