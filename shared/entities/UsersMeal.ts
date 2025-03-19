import { Entity, Field, Fields } from "remult"
import { Relations } from "remult"
import { User } from "@/demo/auth/User";
import { Menu } from "./Menu";


@Entity<UsersMeal>("usersMeal", {
    allowApiCrud: true,
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

