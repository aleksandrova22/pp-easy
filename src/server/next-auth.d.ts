import { Role } from "./lib/role";
import { User } from "../../shared/entities/User";

declare module "next-auth" {
    interface User {
        role?: Role | string,
        admin?: boolean | undefined
    }
    interface AdapterUser {
        // role?: Role | string,
        admin?: boolean | undefined
    }
}


