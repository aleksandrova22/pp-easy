import { useEffect, useState } from 'react';
import { repo, remult, withRemult } from 'remult';
import { ErrorInfo } from '../Error';
import { Spinner } from '../spinner';
import { UsersMeal } from '../../../shared/entities/UsersMeal';
import { OneDish } from './one-dish';
import useSWR from 'swr';


const
    API_URL = '/api/users/',

    fetcher = async () => {
        if (!remult.user) {throw new Error('Нет авторизации!') }
        const response = await fetch(API_URL + remult.user?.id);
        if (!response.ok) throw new Error('fetch ' + response.status);
        return await response.json();
    };

// const
// userId = remult.user?.id;

function useUser() {
    const
        //userId = remult.user?.id,
        { data, error, isLoading } = useSWR(remult.user?.id ? remult.user.id : null, fetcher);
    return {
        user: data,
        isLoading: !error && !data,
        isError: error
    }
};


 function MenuByUser() {
    const
        [error, setError] = useState(null),
        { user, isLoading } = useUser(),
        [data, setData] = useState<UsersMeal[]>([]);

    // if (!user?.id) return;

    useEffect(() => {
        if ((!remult.user)) return;
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
            } catch (err: any) { setError(err); }
        };
        fetchData();
    }, [remult.user]);

    if (error) return <ErrorInfo error={error} />

    //удаление из моего меню
    async function deleteDishUser(dish: UsersMeal) {
        try {
            await repo(UsersMeal).delete(dish);
            setData((prev) => prev.filter(meal => meal.id != dish.id));
        } catch (error: any) {
            setError(error)
        }
    }

     if (!remult.user) return <h2>Авторизируйтесь!</h2>
    return <>
        {
            isLoading ? <Spinner /> :

                <div>  <h2>Привет, {user?.name}! <br />Твое меню: </h2>
                    {data.map(userMeal => <div key={userMeal.id}>
                        <OneDish key={userMeal.id} dishId={userMeal.menuId} />
                        <br />
                        <button onClick={() => deleteDishUser(userMeal)}>❌ Удалить из моего меню</button>
                    </div>
                    )}
                </div>
        }
    </>
};





