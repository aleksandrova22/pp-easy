
import { Menu } from "../../../shared/entities/Menu";
import { useEffect, useState } from 'react';
import { Spinner } from "../Home/spinner";
import Image from "next/image";
import { repo } from 'remult';
import { ErrorInfo } from "../Error";
import classes from './one-dish.module.css';
import { MenuByUser } from "./menu-user";


export function OneDish({ dishId }: { dishId: number }) {
    const
        [loading, setLoading] = useState(true),
        [error, setError] = useState(null),
        [isVisible, setIsVisible] = useState(false),
        [isVisibleImg, setIsVisibleImg] = useState(false),
        [data, setData] = useState<Menu[]>([]);
    useEffect(() => {
        repo(Menu)
            .find(
                {
                    where: { id: dishId }
                }
            )
            .then(setData)
            .catch(setError)
            .finally(() => setLoading(false));
    }, []);

    if (error) return <ErrorInfo error={error} />

    return <>
        {loading ? <Spinner /> :
            <div className={classes.dish}>
                {data.map(dish =>
                    <div className={classes.onedish} key={dish.id}>
                        <span className={classes.span}>Калорийность: {dish.energy} Ккал</span>
                        {/* <article></article> */}
                        <br />
                        <span className={classes.span}>Название: {dish.name}</span>
                        <br />
                        <Image src={"/" + dish?.photo} width={100} height={100} alt="Image" onClick={() => setIsVisibleImg(true)} />


                        {/* модальное окно фото */}
                        <div id="default-modal" className={isVisibleImg ? "block" : "hidden"}>
                            <div className="relative p-4 w-full ">
                                <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                                        <h3 className="text-l p-2 font-semibold text-gray-900 dark:text-white">
                                            {dish.name}
                                        </h3>
                                        <button onClick={() => setIsVisibleImg(false)} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                            </svg>
                                        </button>
                                    </div>
                                    <div className="p-4 md:p-5 space-y-4 flex">
                                        <Image src={"/" + dish?.photo} width={500} height={500} alt="Picture of the author" />
                                    </div>

                                </div>
                            </div>
                        </div>








                        <br />
                        <article >Ингридиенты: {dish.ingredients}</article>
                        <article >
                            <button type="button" className={`text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2`} onClick={() => setIsVisible(!isVisible)}>{(isVisible) ? 'Скрыть рецепт' : 'Показать рецепт'} </button>
                            {/* <button onClick={() => setIsVisible(!isVisible)}> {(isVisible) ? 'Скрыть рецепт' : 'Показать рецепт'}  </button> */}
                            {isVisible && <p>{dish.recipe}</p>}
                        </article>

                    </div>
                )}
            </div>
        }
    </>

}
