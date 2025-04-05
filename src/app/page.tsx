
import Image from "next/image";
import "./globals.css";

export default function Home() {
  return <>

<div className={`grid-element aspect-1/1 bg-[url(/breakfast.jpg)] bg-center  bg-contain bg-no-repeat items-center justify-items-center sepia-50 w-full`}>

<p className={`my-4 text-s text-center text-gray-600`}>
        Рассчитайте КБЖУ в зависимости от потребностей. <br /> 
        Добавляйте рецепты в меню. <br />Готовьте вкусно и полезно!</p>
        <br />
        <br />
      <button><a href='/calc'> Расчитать калорийность</a></button>
      <br />
      <br />
      <button><a href='/menus'>Выбрать рецепты</a></button>

      {/* <Image  src="/breakfast.jpg" fill={true}  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"/> */}
    </div>




    {/* <div className={`flex w-full items-center flex-nowrap flex-row gap-4 text-xl justify-items-center`}> */}

    {/* <div className={`flex w-200 aspect-1/1`}>  
 <Image src={"/breakfast.jpg"} fill={true} alt="home" />

 </div> */}

    {/* <div className={`aspect-3/2 bg-[url(/breakfast.jpg)] bg-contain bg-center object-cover bg-no-repeat items-center justify-items-center sepia-50 w-full z-40 rounded-b-lg`} ></div> */}

    {/* <div className={`flex flex-row items-center w-full`}> */}

      {/* <Image src="/breakfast.jpg" width={500} height={500} alt="logo" priority={true} /> */}

      {/* <div className={` flex aspect-1/1 bg-[url(/breakfast.jpg)] bg-contain bg-center bg-no-repeat items-center justify-items-center sepia-50`} >  */}

     







 
  </>
}
