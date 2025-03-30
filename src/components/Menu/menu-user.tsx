"use client"
import { useEffect, useState } from 'react';
import { repo } from 'remult';
import { ErrorInfo } from '../Error';
import { Spinner } from '../spinner';
import { UsersMeal } from '../../../shared/entities/UsersMeal';
import { OneDish } from './one-dish';
import { User } from '@/demo/auth/User';
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
        // [userSession, setUserSession] = useState<User[]>([]),
        // user = {id: userSession, name: userSession};
    const { data: session } = useSession();
         
    

    useEffect(() => {

        if (!session?.user) {
            setLoading(false);
            return;
        }

        const fetchData = async () => {
            try {
                const
               //userSession = await  repo(User).find({where: {id: session.user?.id}}),
              
                    meals = await
                        repo(UsersMeal)
                            .find(
                                {
                                    include: { user: true },
                                    where: { userId: session.user?.id}
                                });
                setData(meals);
                //setSumMenu([...meals]);
               // setUserSession(userSession);
            } catch (err: any) { setError(err); }
            setLoading(false);
        };
        fetchData();
    }, [session]);

    if (error) return <ErrorInfo error={error} />

    //удаление из моего меню
    async function deleteDishUser(dish: UsersMeal) {

        try {
            await repo(UsersMeal).delete(dish);

            setData((prev) => prev.filter(meal => meal.id != dish.id));
            toast.success("Удалено из вашего меню");
        } catch (error: any) {
            setError(error);
            toast.error("Ошибка при удалении");
        }
    }



    //получаем калории блюда

    async function getEnergyMenuById(id: number) {
        const menus = await repo(Menu).find(
            {
                include: {
                    meal: true
                }
            }
        );
        const menu = menus.find(h => id === h.id);
        console.log('menu', menu);
        const EnergyMenuById = menu?.energy;
        console.log('menu', EnergyMenuById);

        return EnergyMenuById
    };


     if (!session?.user?.id) return <h2>Авторизируйтесь!</h2>
    return <>

{ (!session?.user?.id)  ? <h2>Пожалуйста, авторизируйтесь!</h2> : <div>   <h2>Привет, {session?.user?.name}! Ваше меню: </h2>
            <h3>Всего ккал: {sumMenu}</h3>
            {
                loading ? <Spinner /> :

                    <div className={classes.menuuser}>
                        {data.map(userMeal => <div key={userMeal.id}> 
                           
                            <OneDish dishId={userMeal.menuId} />

                            <button onClick={() => deleteDishUser(userMeal)}>❌ Удалить из моего меню</button>
                        </div>
                        )}
                    </div>
            }

 </div>

}
        
           
      


    </>
};