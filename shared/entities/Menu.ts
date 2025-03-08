import { Entity, Field, Fields } from "remult"
import { Relations } from "remult"
import { User } from "@/demo/auth/User";
import { Meal } from "./Meal";


@Entity<Menu>("menu", {
  allowApiCrud: true,
  defaultOrderBy: { name: "asc" },
})
export class Menu {
  @Fields.autoIncrement()
  id = 0

  @Fields.string()
  name!: string

  @Fields.integer()
  energy!: number

  @Fields.string()
  photo?: ''

  @Fields.string({ allowNull: true })
  ingredients?: string

  @Fields.string({ allowNull: true })
  recipe?: string
 
  @Fields.integer({ allowNull: true })
  mealId?: number

  @Relations.toOne(() => Meal, { field: "mealId" })
  meal?: Meal

  // Relations toMany
  // @Relations.toMany(() => StudentSubject)
  // _StudentSubjects?: StudentSubject[]

}