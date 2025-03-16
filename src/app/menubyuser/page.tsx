"use client"
import { MenuByUser } from "@/components/Menu/menu-user";
import { remult } from "remult";


export default function PageUserMemu() {
  
    return <>
      <h1>Мое меню</h1>
      <h2>Всего калорий</h2>
      <br/>
      сумма ккал: 
      <hr /> 
      отображение меню
      {/* <h2> <MenuByUser userId={remult.user?.id} /></h2> */}
     
    </>
  }
 