import { useEffect, useState } from 'react';
import { repo } from 'remult';
import Image from 'next/image';
import classes from './meal-list.module.css';
import { ErrorInfo } from '../Error';
import { Spinner } from '../spinner';
import { Menu } from '../../../shared/entities/Menu';
import { UsersMeal } from '../../../shared/entities/UsersMeal';
import { User } from '@/demo/auth/User';
import { remult } from "remult";


export function MenuByUser({userId}: {userId: string | undefined}) {
    const
        [loading, setLoading] = useState(true),
        [error, setError] = useState(null),
        // [menus, setMenus] = useState<Menu[]>([]),
        [data, setData] = useState<UsersMeal[]>([]);
// const 
// data1 =  repo(UsersMeal)
// .findFirst(
//     {userId:userId },
//     {include: {
//         user: true,
//     }
    
// });

    useEffect(() => {
        repo(UsersMeal)
            .find(
               {
                include: {
                    user: true,
                },
                where: { userId:userId }
            }
            )
             .then(setData)
            .catch(setError)
            .finally(() => setLoading(false));
    }, [userId]);

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
                {data.map(menuUser => <li key={menuUser.userId}><p>{menuUser.menuId}</p>
                </li>)}
            </ul>
            
        }


    </div >

}

