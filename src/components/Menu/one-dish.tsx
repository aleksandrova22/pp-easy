
import { Menu } from "../../../shared/entities/Menu";
import { useEffect, useState } from 'react';
import { Spinner } from "../spinner";
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
                        <Image src={"/" + dish?.photo} width={100} height={100} alt="Picture of the author" />
                        <br />
                        <article >Ингридиенты: {dish.ingredients}</article>
                        <article >
                        <button onClick={() => setIsVisible(!isVisible)}> {(isVisible) ? 'Скрыть рецепт' : 'Показать рецепт'}  </button>
                            {isVisible && <p>{dish.recipe}</p>}
                        </article>
                        <br />
                        <button onClick={() => MenuByUser(dish.id)} >❌ Удалить из моего меню </button>
                    </div>
                )}
            </div>
        }
    </>

}
