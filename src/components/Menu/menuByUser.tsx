import { useEffect, useState } from 'react';
import { repo } from 'remult';
import Image from 'next/image';
import classes from './meal-list.module.css';
import { ErrorInfo } from '../Error';
import { Spinner } from '../spinner';
import { Menu } from '../../../shared/entities/Menu';
import { UsersMeal } from '../../../shared/entities/UsersMeal';
import { User } from '@/demo/auth/User';


export function MenuByUser(userId:string) {
    const
        [loading, setLoading] = useState(true),
        [error, setError] = useState(null),
        [data, setData] = useState<UsersMeal[]>([]);



    useEffect(() => {

        repo(UsersMeal)
            .find({where:{ userId: userId } })
            .then(setData)
            .catch(setError)
            .finally(() => setLoading(false));
    }, []);

    if (error) return <ErrorInfo error={error} />



    // async function addMenuByUser(menuId: number) {
    //     const optimisticMenuByUser = new UsersMeal;
    //      optimisticMenuByUser.userId = newTaskTitle;
    //      optimisticMenuByUser.temp = true;
    //      setData([...data]);
    //     try {
    //         const
    //             newUsersMeal = await repo(UsersMeal).insert({ menuId: menuId, userId: "1" });

    //     } catch (err) {
    //         // toster
    //     } finally {
    //         const data = await repo(UsersMeal).find();
    //         setData(data);
    //     }

    //     const res = await repo(UsersMeal).insert(data);

    // }


    return <div >

        {loading ? <Spinner /> :

            <ul >
                {data?.map(el => <li key={el.userId}><p>{el.menuId}</p>

                </li>)}
            </ul>

        }

    </div >

}

