import { useEffect, useState } from 'react';
import { repo, remult } from 'remult';
import { ErrorInfo } from '../Error';
import { Spinner } from '../spinner';
import { UsersMeal } from '../../../shared/entities/UsersMeal';
import { OneDish } from './one-dish';
import { User } from '@/demo/auth/User';
//import { api } from "@/server/api";
import { Menu } from '../../../shared/entities/Menu';
import classes from './menu-user.module.css';
import toast from 'react-hot-toast';


// const remult = await api.getRemult(),
//remultUser = async ()=> (await api.getRemult()).repo(User).find({where: {id: remult.user?.id}}); 



export function MenuByUser() {
    const
        [error, setError] = useState(null),
        [loading, setLoading] = useState(true),
        // [userId, setUserId] = useState(remult.user?.id),
        [sumMenu, setSumMenu] = useState(0),
        [data, setData] = useState<UsersMeal[]>([]);


    useEffect(() => {

        if (!remult.user?.id) return;
        const fetchData = async () => {
            try {
                const
                    meals = await
                        repo(UsersMeal)
                            .find(
                                {
                                    include: { user: true },
                                    where: { userId: remult.user?.id }
                                });
                setData(meals);
                //setSumMenu([...meals]);
                //setUserId(userId);
            } catch (err: any) { setError(err); }
            setLoading(false);
        };
        fetchData();
    }, []);

    if (error) return <ErrorInfo error={error} />

    //удаление из моего меню
    async function deleteDishUser(dish: UsersMeal) {

        try {
            await repo(UsersMeal).delete(dish);

            setData((prev) => prev.filter(meal => meal.id != dish.id));
            toast.success("Блюдо удалено");
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


    if (!remult.user?.id) return <h2>Авторизируйтесь!</h2>
    return <>

        {!remult.user?.id ? <h2>Авторизируйтесь!</h2> : <div >
            <h2>Привет, {remult.user?.name}! Твое меню: </h2>
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
        </div>}

    </>
};