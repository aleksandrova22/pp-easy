import { useEffect, useState } from 'react';
import { repo } from 'remult';
import classes from './menu-list.module.css';
import { ErrorInfo } from '../Error';
import { Spinner } from '../spinner';
import { Menu } from '../../../shared/entities/Menu';
import { UsersMeal } from '../../../shared/entities/UsersMeal';
import { remult } from "remult";
import { OneDish } from './one-dish';
import toast from 'react-hot-toast';
import { useSession } from "next-auth/react";


export function MenuList({ mealId }: { mealId: number | null }) {
    const
        [loading, setLoading] = useState(true),
        [error, setError] = useState(null),
        [data, setData] = useState<Menu[]>([]),
        [userMeal, setUserMeal] = useState<UsersMeal[]>([]);
        const { data: session } = useSession();
    

    const loadMenu = async (mealId: number) => {
        setLoading(true);
        try {
            const menuData = await repo(Menu).find({ where: { mealId: mealId } });
            setData(menuData);
        }
        catch (err: any) { setError(err) }
        finally { setLoading(false); }
    };

    const loadUserMeals = async () => {
        if (remult.user?.id) {
            try {
                const userMeals = await repo(UsersMeal).find({ where: { userId: remult.user?.id } });
                setUserMeal(userMeals);
            } catch (err: any) { setError(err) }
        }
    };

    useEffect(() => {
        if (mealId)
            repo(Menu)
                .find({ where: { mealId: mealId } })
                .then(setData)
                .catch(setError)
                .finally(() => setLoading(false));
        if (!mealId) repo(Menu)
            .find()
            .then(setData)
            .catch(setError)
            .finally(() => setLoading(false));

    }, [mealId]);


    if (error) return <ErrorInfo error={error} />


    //добавление в свои блюда
    async function addDishUser(el: number) {
      
        try {
            await repo(UsersMeal).insert({ userId: session?.user?.id, menuId: el });
            toast.success("Добавлено в меню");
            // optimisticData = await fetchProduct;
            // await mutate(fetchProduct, {optimisticData, revalidate: true});

            loadUserMeals();

        } catch (error: any) {
            setError(error);
            toast.error('Ошибка при добавлении');
        }

    }

    return <div className={classes.menu}>
        {loading ? <Spinner /> :
            data?.map(el => <div key={el.id}>
                <OneDish dishId={el.id} />
                <button onClick={() => addDishUser(el.id)}>Добавить в мое меню</button>
            </div>
            )
        }

    </div>

}

