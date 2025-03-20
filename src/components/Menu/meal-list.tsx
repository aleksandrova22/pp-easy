
import { useEffect, useState } from 'react';
import { repo } from 'remult';
import Image from 'next/image';
import classes from './meal-list.module.css';
import { Meal } from '../../../shared/entities/Meal';
import { ErrorInfo } from '../Error';
import { Spinner } from '../spinner';


export function MealList() {
    const
        [loading, setLoading] = useState(true),
        [error, setError] = useState(null),
        [list, setList] = useState<Meal[]>([]);

    useEffect(() => {
        repo(Meal)
            .find()
            .then(setList)
            .catch(setError)
            .finally(() => setLoading(false));
    }, []);

    if (error) return <ErrorInfo error={error} />


    return <div className={classes.meal}>

        {loading ? <Spinner /> :

            list.map(meal => <div key={meal.id}><p>{meal.title}</p>
                <button >  <Image src={"/" + meal?.img} width={300} height={300} alt="Picture of the author" />
                </button>
            </div>)
        }

    </div>

}

