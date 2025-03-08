import { Entity, Fields } from "remult"
import { Relations } from "remult"
import { Menu } from "./Menu";

@Entity<Meal>("meal", {
    allowApiCrud: true,
    defaultOrderBy: { title: "asc" },
})
export class Meal {
    @Fields.autoIncrement()
    id = 0

    @Fields.string()
    title!: string

    @Fields.string()
    img?: string

    // Relations toMany
    @Relations.toMany(() => Menu)
    Menu?: Menu[]
}