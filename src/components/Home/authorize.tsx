
"use client"

import Admin from "@/demo/Admin";
import Auth from "@/demo/auth/Auth";
import toast from 'react-hot-toast';
import { useSession } from "next-auth/react";


export default function Authorize() {
    const { data: session } = useSession();
  return <>
    <h2>Авторизация</h2>

   {console.log('session?.user?.role', session?.user)}

    <div className="tiles">
      <Auth />


{(session?.user?.role)  ? <div><Admin /></div > : '' }

      {/* <Admin /> */}
    </div>


  

  </>
}