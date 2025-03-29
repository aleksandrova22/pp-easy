
import { useEffect, useState } from 'react';
import { repo } from 'remult';
import Image from 'next/image';
import classes from './meal-list.module.css';
import { Meal } from '../../../shared/entities/Meal';
import { ErrorInfo } from '../Error';
import { Spinner } from '../spinner';
import { MenuList } from './menu-list';
import { Menu } from '../../../shared/entities/Menu';
import { OneDish } from './one-dish';


export function MealList() {
    const
        [loading, setLoading] = useState(true),
        [error, setError] = useState(null),
        [list, setList] = useState<Meal[]>([]),
        [mealId, setMealId] = useState<number | null>(null);


    useEffect(() => {
        repo(Meal)
            .find()
            .then(setList)
            .catch(setError)
            .finally(() => setLoading(false));
    }, []);

    if (error) return <ErrorInfo error={error} />

    return <>
        {loading ? <Spinner /> :

            <div className={classes.meal}>
                <button onClick={() => setMealId(null)}>Показать все</button>
                {list.map(meal => <div key={meal.id}>
                    <button onClick={() => setMealId(meal.id)}> <Image src={"/" + meal?.img} width={220} height={220} alt="meal" /> {meal.title} </button>
                </div>)}
            </div>

        }
        <MenuList mealId={mealId} />
    </>

}


