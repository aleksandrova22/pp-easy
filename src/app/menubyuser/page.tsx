"use client"
import { MenuByUser } from "@/components/Menu/menu-user";
import { remult } from "remult";


export default function PageUserMemu() {

  return <>
    <h1>Ваше меню</h1>
    <br />
    <MenuByUser/>
  </>
}
