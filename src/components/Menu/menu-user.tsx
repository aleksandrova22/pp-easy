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
import { OneDish } from './one-dish';


export function MenuByUser() {
    const
        [loading, setLoading] = useState(true),
        [error, setError] = useState(null),
        [user, setUser] = useState<User[]>([]),
        [menus, setMenus] = useState<Menu[]>([]),
        // [usermeals, setUsermeals] = useState<UsersMeal[]>([]),
        //  [userId, setUserId] = useState(remult.user?.id),
          userId = remult.user?.id,
        // menusByUsers = Object.groupBy(usermeals, usermeal => usermeal.userId),
        // userIDs = Object.keys(menusByUsers),
        [data, setData] = useState<UsersMeal[]>([]);
//         const  data1 = await repo(UsersMeal).findFirst(  { userId: userId });
//  {console.log(repo(UsersMeal).findFirst(  { userId: userId }));}
    useEffect(() => {
        repo(UsersMeal)
            .find(
                {
                    include: {
                        user: true,
                    },
                    where: { userId: userId }
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
    //         const data = await repo(UsersMeal).findFirst(  { userId: userId });
    //         setData(data);
    //     }

    //     const res = await repo(UsersMeal).insert(data);

    // }


    return <div >
        {loading ? <Spinner /> :
        <div>
              {data.map(userMeal => 
<OneDish key = {userMeal.id} dishId = {userMeal.menuId}/>

              )}
            </div>
           
        }




    </div >

}

