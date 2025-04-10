import { useEffect, useState } from 'react';
import { repo } from 'remult';
import classes from './menu-list.module.css';
import { ErrorInfo } from '../Error';
import { Spinner } from '../Home/spinner';
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


    const loadUserMeals = async () => {
        if (session?.user?.id) {
            try {
                const userMeals = await repo(UsersMeal).find({ where: { userId: session?.user?.id } });
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

        if (!session?.user)  { setError(error); toast.error('Авторизируйтесь для добавления блюд в свое меню') };

        try {
            if (session?.user) {
            await repo(UsersMeal).insert({ userId: session?.user?.id, menuId: el });
            toast.success("Добавлено в ваше меню");
            // optimisticData = await fetchProduct;
            // await mutate(fetchProduct, {optimisticData, revalidate: true});

            loadUserMeals();
            }

        } catch (error: any) {
            setError(error);
            toast.error('Ошибка при добавлении');
        }

    }

    return <div className={classes.menu_list}>
        {loading ? <Spinner /> :
            data?.map(el => <div className={classes.menu} key={el.id}>
                <OneDish dishId={el.id} />
                <button type="button" onClick={() => addDishUser(el.id)} className={`text-gray-900 bg-gradient-to-r from-green-600 via-green-400 to-lime-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2`}>Добавить в мое меню</button>
               
            </div>
            )
        }

    </div>

}

