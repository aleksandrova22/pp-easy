export function Carousel() {
    return <>

<div className={`w-full`}>

<p className={`my-4 text-s text-center text-gray-700`}>
  Рассчитайте КБЖУ в зависимости от своих потребностей. <br />
  Выбирайте рецепты, добавляйте в свое меню.<br />
  Готовьте вкусно и полезно!</p>


        <div className={`relative aspect-1/1 bg-[url(/breakfast.jpg)] bg-center bg-no-repeat bg-cover items-center justify-items-center sepia-50 w-full z-0 rounded-b-lg`} >
            {/* <p className={`my-4 text-s text-center text-amber-50`}>
                Рассчитайте КБЖУ в зависимости от своих потребностей. <br />
                Выбирайте рецепты, добавляйте в свое меню.<br />
                Готовьте вкусно и полезно!</p>
            <br />
            <br /> */}
            <button className={`absolute top-20 left-10 text-gray-900 bg-green-500  focus:ring-4 focus:outline-none focus:ring-[#F7BE38]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#F7BE38]/50 me-2 mb-2 hover:bg-green-700 focus:outline-hidden`}>
                <a href='/calc'> Калькулятор калорий</a> </button>


            <br />
            <br />

            <button type="button" className={`absolute top-40 left-10 text-white bg-[#FF9119] hover:bg-[#FF9119]/80 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 me-2 mb-2`}>
                <a href='/menus'>Полезные рецепты</a>
            </button>


        </div>
        </div>

        {/* <div data-hs-carousel='{
    "loadingClasses": "opacity-0",
    "dotsItemClasses": "hs-carousel-active:bg-blue-700 hs-carousel-active:border-blue-700 size-3 border border-gray-400 rounded-full cursor-pointer",
    "isAutoPlay": true
  }' className="relative">
        <div className="hs-carousel relative overflow-hidden w-full min-h-96 bg-white rounded-lg">
            <div className="hs-carousel-body absolute top-0 bottom-0 start-0 flex flex-nowrap transition-transform duration-700 opacity-0">
                <div className="hs-carousel-slide">
                    <div className="flex justify-center h-full bg-gray-100 p-6">
                        <span className="self-center text-4xl text-gray-800 transition duration-700">First slide</span>
                    </div>
                </div>
                <div className="hs-carousel-slide">
                    <div className="flex justify-center h-full bg-gray-200 p-6">
                        <span className="self-center text-4xl text-gray-800 transition duration-700">Second slide</span>
                    </div>
                </div>
                <div className="hs-carousel-slide">
                    <div className="flex justify-center h-full bg-gray-300 p-6">
                        <span className="self-center text-4xl text-gray-800 transition duration-700">Third slide</span>
                    </div>
                </div>
            </div>
        </div>

        <button type="button" className="hs-carousel-prev hs-carousel-disabled:opacity-50 hs-carousel-disabled:pointer-events-none absolute inset-y-0 start-0 inline-flex justify-center items-center w-11.5 h-full text-gray-800 hover:bg-gray-800/10 focus:outline-hidden focus:bg-gray-800/10 rounded-s-lg">
            <span className="text-2xl" aria-hidden="true">
                <svg className="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m15 18-6-6 6-6"></path>
                </svg>
            </span>
            <span className="sr-only">Previous</span>
        </button>
        <button type="button" className="hs-carousel-next hs-carousel-disabled:opacity-50 hs-carousel-disabled:pointer-events-none absolute inset-y-0 end-0 inline-flex justify-center items-center w-11.5 h-full text-gray-800 hover:bg-gray-800/10 focus:outline-hidden focus:bg-gray-800/10 rounded-e-lg">
            <span className="sr-only">Next</span>
            <span className="text-2xl" aria-hidden="true">
                <svg className="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m9 18 6-6-6-6"></path>
                </svg>
            </span>
        </button>

        <div className="hs-carousel-pagination flex justify-center absolute bottom-3 start-0 end-0 gap-x-2"></div>
    </div> */}
    </>;
}