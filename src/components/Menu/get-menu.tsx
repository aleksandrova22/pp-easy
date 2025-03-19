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



export function GetMenu() {
    const
        [loading, setLoading] = useState(true),
        [error, setError] = useState(null),
        [data, setData] = useState<Menu[]>([]);
        // [usersmeals, setUsersmeals] = useState<UsersMeal[]>([]),
        // menuByUsers = Object.groupBy(usersmeals, usermeals => usermeals?.userId);
      
    useEffect(() => {
        repo(Menu)
            .find(               
            )
            .then(setData)
            .catch(setError)
            .finally(() => setLoading(false));
    }, []);

    if (error) return <ErrorInfo error={error} />


    async function addMenuByUser(menuId: number) {
        const optimisticMenuByUser = new UsersMeal;
        // optimisticMenuByUser.userId = newTaskTitle;
        // optimisticMenuByUser.temp = true;
        //setData([...data]);
        try {
            
            const customers = await repo(UsersMeal).find({
                include: {
                    user: true
                },
              });
            

        } catch (err) {
            // toster
        } finally {
            // const list = await repo(UsersMeal).find();
             //setData(customers);
            
            // const  newItem = await repo(UsersMeal).find({
            //     include: {
            //         user: true, menu: true
            //     }
            //   }).insert({ menuId: menuId});

        }

       // const res = await repo(UsersMeal).insert(data);

    }

    // {if (!remult.user.id) return <>Авторизируйтесь!</> }

    return <div className={classes.meal}>
        {loading ? <Spinner /> :
         data?.map(el=><OneDish dishId={el.id}/>)
            // <ul className={classes.meal}>
            //     {data?.map(menus => <li key={menus.id}><p>{menus.name}</p><p>КБЖУ:{menus.energy}</p>
            //         <Image src={"/" + menus?.photo} width={200} height={200} alt="Picture of the author" />
            //         <br /> Рецепт: <p>{menus.recipe}</p>

            //         <button onClick={addMenuByUser(menus.id)} > Добавить в мои блюда </button>
            //     </li>)}
            // </ul>

        }


    </div>

}

