"use client"

import { MealList } from "@/components/Menu/meal-list"


//без авторизации
export default function PageMenu() {
  

  return <>
       <h2>Полезные рецепты с рассчитанной калорийностью</h2>
    <MealList  />
  </>
}
