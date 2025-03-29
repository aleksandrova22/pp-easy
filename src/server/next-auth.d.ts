import { Role } from "./lib/role";
import { User } from "../demo/auth/User";

declare module "next-auth" {
    interface User {
        role?: Role | string
    }
}


