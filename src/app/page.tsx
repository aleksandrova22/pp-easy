"use client"
import "./globals.css";

export default function Home() {
  return <div className={`flex w-full items-center flex-nowrap flex-row gap-4 text-xl justify-items-center`}>


    <div className={`aspect-1/1 bg-[url(/breakfast.jpg)] bg-contain bg-center bg-no-repeat w-[60vmin] items-center justify-items-center sepia-50`} />


   
      <button><a href='/calc'> Расчитать калорийность</a></button>
      <br/>
      <button><a href='/menus'>Выбрать рецепты</a></button>

   


    </div>

}
