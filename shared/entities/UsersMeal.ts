import { Entity, Field, Fields } from "remult"
import { Relations } from "remult"
import { User } from "./User";
import { Menu } from "./Menu";
import { remult, repo} from 'remult';
import { Roles } from "@/demo/auth/Roles";



@Entity<UsersMeal>("usersMeal", {
    allowApiCrud: true,
    
    apiPrefilter: () => {
        // Defines a prefilter to restrict data access based on user roles
        if (remult.isAllowed(Roles.admin)) return {}; // Admin can see all users
        return {
          userId: remult.user!.id, // Non-admin users can only access their own data
        };
      },
})
export class UsersMeal {
    @Fields.autoIncrement()
    id = 0

    @Fields.string({ allowNull: true })
    userId!: string

    @Relations.toOne(() => User, { field: "userId" })
    user!: User

    @Fields.integer({ allowNull: true })
    menuId!: number

    @Relations.toOne(() => Menu, { field: "menuId" })
    menu!: Menu

    
}

