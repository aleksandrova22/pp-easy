import { useEffect, useState } from 'react';
import { repo, remult, withRemult } from 'remult';
import { ErrorInfo } from '../Error';
import { Spinner } from '../spinner';
import { UsersMeal } from '../../../shared/entities/UsersMeal';
import { OneDish } from './one-dish';
import useSWR from 'swr';
import { User } from '@/demo/auth/User';


// const
//     API_URL = '/api/users/',

//     fetcher = async () => {
//         const userId = remult.user?.id || '';
//         if (userId) {throw new Error('Нет авторизации!') }
//         const response = await fetch(API_URL + userId);
//         if (!response.ok) throw new Error('fetch ' + response.status);
//         return await response.json();
//     };

// const
// userId = remult.user?.id;

// function useUser() {
//     const
//         //userId = remult.user?.id,
//         { data, error, isLoading } = useSWR(remult.user?.id ? remult.user.id : null, fetcher);
//     return {
//         user: data,
//         isLoading: !error && !data,
//         isError: error
//     }
// };


export function MenuByUser() {
    const
        [error, setError] = useState(null),
        [loading, setLoading] = useState(true),
        [userId, setUserId] = useState(remult.user?.id),
        // { user, isLoading } = useUser(),
        [data, setData] = useState<UsersMeal[]>([]);

  
        const 
        user = async ()=> await
                            repo(User)
                                .findFirst(
                                    {

                                        id: remult.user?.id 
                                    });
    // console.log(user);

    useEffect(() => {

                if (!user) return;
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
                setUserId(userId);
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
        } catch (error: any) {
            setError(error)
        }
    }

    if (!userId) return <h2>Авторизируйтесь!</h2>
    return <>
        {
            loading ? <Spinner /> :

                <div>  <h2>Привет, {remult.user?.name}! <br />Твое меню: </h2>
                    {data.map(userMeal => <div>
                        <OneDish key={userMeal.id} dishId={userMeal.menuId} />
                        <br />
                        <button onClick={() => deleteDishUser(userMeal)}>❌ Удалить из моего меню</button>
                    </div>
                    )}
                </div>
        }
    </>
};