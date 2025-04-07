"use client"
import { useEffect, useState } from 'react';
import { remult, repo } from 'remult';
import { ErrorInfo } from '../Error';
import { Spinner } from '../Home/spinner';
import { UsersMeal } from '../../../shared/entities/UsersMeal';
import { OneDish } from './one-dish';
import { User } from '../../../shared/entities/User';
//import { api } from "@/server/api";
import { Menu } from '../../../shared/entities/Menu';
import classes from './menu-user.module.css';
import toast from 'react-hot-toast';
import { useSession } from "next-auth/react";
import { getUserFromRequest } from '@/server/auth';




export function MenuByUser() {
    const
        [error, setError] = useState(null),
        [loading, setLoading] = useState(true),
        [sumMenu, setSumMenu] = useState(0),
        [data, setData] = useState<UsersMeal[]>([]);
    const { data: session } = useSession();


    useEffect(() => {

        if (!session?.user) {
            setLoading(false);
            return;
        }

        const fetchData = async () => {
            try {
                const
                    meals = await
                        repo(UsersMeal)
                            .find(
                                {
                                    include: { user: true },
                                     where: { userId: session.user?.id }
                                });
                setData(meals);
                await updateSumMenu(meals);

               

            } catch (err: any) { setError(err); }
            setLoading(false);
        };
        fetchData();
    }, [session]);

    //обновление калорий
    const updateSumMenu = async (meals: UsersMeal[]) => {
        const energyPromises = meals.map(meal => getEnergyMenuById(meal.menuId));
        const energyValues = await Promise.all(energyPromises);
        const totalMenuIdSum = energyValues.reduce((sum, energy) => sum + energy, 0);
        setSumMenu(totalMenuIdSum);
    };


    if (error) return <ErrorInfo error={error} />

    //удаление из моего меню
    async function deleteDishUser(dish: UsersMeal) {

        try {
            await repo(UsersMeal).delete(dish);
            setData((prev) => prev.filter(meal => meal.id != dish.id));
            toast.success("Удалено из вашего меню");
            await updateSumMenu(data.filter(meal => meal.id != dish.id));
        } catch (error: any) {
            setError(error);
            toast.error("Ошибка при удалении");
        }
    }

    //Калории одного блюда по его id
    async function getEnergyMenuById(id: number | undefined) {
        if (!id) return 0;
        const menus = await repo(Menu).find(
            {
                where: { id: id }
            }
        );
        const energyMenuById = menus.find(item => item.id == id)?.energy;
        if (!energyMenuById) return 0;
        //increment(mas);
        console.log('energyMenuById', energyMenuById, typeof (energyMenuById));
        return energyMenuById;
    };

console.log('user', session?.user);
    if (!session?.user?.id) return <h2>Авторизируйтесь!</h2>
    return <>

        {(!session?.user?.id) ? <h2>Пожалуйста, авторизируйтесь!</h2> : <div>   <h2>Привет, {<strong>{session.user?.name}</strong>}! Вот твое меню: </h2>
            <h3>Всего <strong>{sumMenu} </strong>калорий</h3>



            {
                loading ? <Spinner /> :

                    <div className={classes.menuuser}>
                        {data.map(userMeal => <div key={userMeal.id}>
                            <OneDish dishId={userMeal.menuId} />
                            <button type="button" onClick={() => deleteDishUser(userMeal)} className={`text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2`}>❌ Удалить из моего меню</button>
                           
                        </div>
                        )}
                    </div>
            }

        </div>

        }





    </>
}; 