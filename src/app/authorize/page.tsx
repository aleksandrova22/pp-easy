"use client"

import Admin from "@/demo/Admin";
import Auth from "@/demo/auth/Auth";



export default function PageAuth() {

  return <>
    <h1>Авторизация</h1>

    <div className="tiles">
       <Auth /> 
       <Admin /> 
       </div>
  </>
}
