import { useEffect, useState } from 'react';
import { repo } from 'remult';
import Image from 'next/image';
import classes from './meal-list.module.css';
import { ErrorInfo } from '../Error';
import { Spinner } from '../spinner';
import { Menu } from '../../../shared/entities/Menu';
import { UsersMeal } from '../../../shared/entities/UsersMeal';
import { User } from '@/demo/auth/User';
import { MenuByUser } from './menu-user';
import { remult } from "remult";




export function GetMenu() {
    const
        [loading, setLoading] = useState(true),
        [error, setError] = useState(null),
        [data, setData] = useState<Menu[]>([]),
        [users, setUsers] = useState<User[]>([]);
    // menusByUsers = Object.groupBy(users, user => user.id),
    // usersIDs = Object.keys(menusByUsers);


    useEffect(() => {
        repo(Menu)
            .find()
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

     
    
    // {if (!remult.user?.id) return <>Авторизируйтесь!</> }


    return <div className={classes.meal}>
      
        {loading ? <Spinner /> :

            <ul className={classes.meal}>
                {data?.map(menus => <li key={menus.id}><p>{menus.name}</p><p>КБЖУ:{menus.energy}</p>
                    <Image src={"/" + menus?.photo} width={200} height={200} alt="Picture of the author" />
                    <br /> Рецепт: <p>{menus.recipe}</p>
                    {/* <button onClick={addMenuByUser(menus.id)} > Добавить в мои блюда </button> */}
                </li>)}
            </ul>
        }


    </div >

}

