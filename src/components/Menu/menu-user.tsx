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
    if (!session?.user?.id) return <h2>  <a href='/authorize'>Авторизируйтесь для добавления блюд в свое меню </a> </h2>
    return <>

        {(!session?.user?.id) ? <h2>Пожалуйста, авторизируйтесь!</h2> : <div>   <h2>Привет, {<strong>{session.user?.name}</strong>}! Вот твое меню: </h2>
            <h2>Всего <strong>{sumMenu} </strong>калорий</h2>



            {
                loading ? <Spinner /> :

                    <div className={classes.menu_user_list}>
                        {data.map(userMeal => <div className={classes.menu_user} key={userMeal.id}>
                            <OneDish dishId={userMeal.menuId} />
                            <button type="button" onClick={() => deleteDishUser(userMeal)} className={`text-gray-900 bg-gradient-to-r from-green-600 via-green-400 to-lime-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 text-center m-2 mb-2`}>❌ Удалить из моего меню</button>
                           
                        </div>
                        )}
                    </div>
            }

        </div>

        }





    </>
}; 