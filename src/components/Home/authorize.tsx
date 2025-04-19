
"use client"

import Admin from "@/demo/Admin";
import Auth from "@/demo/auth/Auth";
import toast from 'react-hot-toast';
import { useSession } from "next-auth/react";


export default function Authorize() {
    const { data: session } = useSession();
  return <>
    <h2>Авторизация</h2>

   {/* { (session?.user) ? <h2>Вы вошли как {<strong>{session.user?.name}</strong>}</h2> :  */}

    <div className="tiles">
      <Auth />
      {/* <Admin /> */}
    </div>


  

  </>
}