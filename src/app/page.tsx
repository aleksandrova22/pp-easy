"use client"
import Tile from "../demo/Tile";
import Auth from "../demo/auth/Auth";
import Admin from "../demo/Admin";
import { FormCalc } from "@/components/Home/FormCalc";




export default function Home() {
  return (
    <div className="tiles">
      <Auth />
      <Admin />

      <h1>📇 Калькулятор БЖУ</h1>
      <FormCalc />

    </div>
  );
}
