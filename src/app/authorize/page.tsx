"use client"

import Admin from "@/demo/Admin";
import Auth from "@/demo/auth/Auth";



export default function PageAuth() {

  return <>
    <h2>Авторизация</h2>

    <div className="tiles">
      <Auth />
      <Admin />
    </div>
  </>
}
