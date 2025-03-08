"use client"

import { MealList } from "@/components/Menu/meal-list"


//без авторизации
export default function PageMenu() {
  

  return <>
    <h1>Приемы пищи</h1>
    <h2>Выберите прием пищи</h2>
    <MealList  />
  </>
}
