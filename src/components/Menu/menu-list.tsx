import { useEffect, useState } from 'react';
import { repo } from 'remult';
// import Image from 'next/image';
import classes from './menu-list.module.css';
import { ErrorInfo } from '../Error';
import { Spinner } from '../spinner';
import { Menu } from '../../../shared/entities/Menu';
import { UsersMeal } from '../../../shared/entities/UsersMeal';
// import { User } from '@/demo/auth/User';
import { remult } from "remult";
import { OneDish } from './one-dish';


export function MenuList() {
    const
        [loading, setLoading] = useState(true),
        [error, setError] = useState(null),
        [data, setData] = useState<Menu[]>([]),
        [userId, setUserId] = useState(null),
        [userMeal, setUserMeal] = useState<UsersMeal[]>([]);

    useEffect(() => {
        loadMenu();
        loadUserMeals();
    }, []);

    const loadMenu = async () => {
        setLoading(true);
        try {
            const menuData = await repo(Menu).find();
            setData(menuData);
        }
        catch (err: any) { setError(err) }
        finally { setLoading(false); }
    };

    const loadUserMeals = async () => {
        if (remult.user?.id) {
            try {
                const userMeals = await repo(UsersMeal).find({ where: { userId: remult.user.id } });
                setUserMeal(userMeals);
            } catch (err: any) { setError(err) }
        }
    };


    if (error) return <ErrorInfo error={error} />


    //добавление в свои блюда
    async function addDishUser(el: number) {
        try {
            await repo(UsersMeal).insert({ userId: remult.user?.id, menuId: el })
            loadUserMeals();
        } catch (error: any) {
            alert((error as { message: string }).message)
        }

    }

    return <div className={classes.menu}>
        {loading ? <Spinner /> :
            data?.map(el => <div key={el.id}>
                <OneDish dishId={el.id} />
                <br />
                <button onClick={() => addDishUser(el.id)}>Добавить в мое меню</button>
            </div>
            )
        }

    </div>

}

