import { useEffect, useState } from 'react';
import { repo, remult } from 'remult';
import { ErrorInfo } from '../Error';
import { Spinner } from '../spinner';
import { Menu } from '../../../shared/entities/Menu';
import { UsersMeal } from '../../../shared/entities/UsersMeal';
import { User } from '@/demo/auth/User';
import { OneDish } from './one-dish';


export function MenuByUser() {
    const
        [loading, setLoading] = useState(true),
        [error, setError] = useState(null),
         [user, setUser] = useState<User[]>([]),
        [data, setData] = useState<UsersMeal[]>([]);
        
        // [userId, setUserId] = useState(remult.user?.id);

        // const
        //  userId = remult.user?.id;


    useEffect(() => {
        // if (!userId) return;
        repo(UsersMeal)
            .find(
                {
                   include: {user: true},
                    where: { userId: remult.user?.id}
                }
            )
            .then(setData)
            .catch(setError)
            .finally(() => setLoading(false));
    }, [remult.user?.id]);

    if (error) return <ErrorInfo error={error} />

    //удаление из моего меню

    async function deleteDishUser(dish: UsersMeal) {
        try {
            await repo(UsersMeal).delete(dish)
        } catch (error: any) {
            alert((error as { message: string }).message)
        }
    }


    return <div >
        {loading ? <Spinner /> :
            <div>
                {data.map(userMeal => <div key={userMeal.id}>
                    <OneDish key={userMeal.id} dishId={userMeal.menuId} />
                    <br />
                    <button onClick={() => deleteDishUser(userMeal)}>❌ Удалить из моего меню</button>
                </div>
                )}
            </div>

        }


    </div >

}

