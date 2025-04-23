
import { Menu } from "../../../shared/entities/Menu";
import { useEffect, useState } from 'react';
import { Spinner } from "../Home/spinner";
import Image from "next/image";
import { repo } from 'remult';
import { ErrorInfo } from "../Error";
import classes from './one-dish.module.css';
import { MenuByUser } from "./menu-user";
import { ModalDish } from "./modal-dish";
import { $isOpen, isOpenToggle } from "@/store/store-data";
import { useStore } from '@nanostores/react';


export function OneDish({ dishId }: { dishId: number }) {
    const
        [loading, setLoading] = useState(true),
        [error, setError] = useState(null),
        [isVisible, setIsVisible] = useState(false),
        [isVisibleModal, setIsVisibleIModal] = useState(false),
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
                    <div className={classes.one_dish} key={dish.id}>
                        <div className={classes.one_dish}>Калорийность: {dish.energy} Ккал </div>
                        <div className={classes.one_dish}>Название: {dish.name}</div>

                        <Image src={"/" + dish?.photo} width={100} height={100} alt="Image" onClick={() => setIsVisibleIModal(true)} />

                        {/* {isVisibleModal && <ModalDish photo = {dish?.photo || null}  ingredients={dish?.ingredients || null}  recipe = {dish?.recipe || null} />} */}
                        {isVisibleModal && <ModalDish isOpen={isVisibleModal} onClose={()=>setIsVisibleIModal(false)} name={dish.name} photo = {dish?.photo || null}  ingredients={dish?.ingredients || null}  recipe = {dish?.recipe || null} energy = {dish?.energy || null}/>}
                    


                    </div>



                    // </div>
                )}
            </div >
        }
    </>

}
