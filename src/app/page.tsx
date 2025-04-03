// "use client"
import "./globals.css";

export default function Home() {
  return <div className={`flex w-full items-center flex-nowrap flex-row gap-4 text-xl justify-items-center`}>


    <div className={`aspect-1/1 bg-[url(/breakfast.jpg)] bg-contain bg-center bg-no-repeat w-[80vmin] items-center justify-items-center sepia-50`} > <h4 className={`my-4 text-s text-center text-gray-600`}> Рассчитайте КБЖУ в зависимости от потребностей. <br/> Добавляйте рецепты в меню. <br/>Готовьте вкусно и полезно!</h4></div>

   
    <div className={`flex-row items-center p-5`}>
   
   
      <button><a href='/calc'> Расчитать калорийность</a></button>
      <br />
      <button><a href='/menus'>Выбрать рецепты</a></button>
    </div>



  </div>

}
