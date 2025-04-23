
import { useState } from 'react';
import classes from './modal-dish.module.css';
import Image from 'next/image';
// import { $isOpen, isOpenToggle } from "@/store/store-data";
// import { useStore } from '@nanostores/react';

type ModalProps = {
    name: string, photo: string | null, ingredients: string | null, recipe: string | null, isOpen: boolean, energy: number | null, onClose: () => void
}

export function ModalDish({ isOpen, onClose, name, photo, ingredients, recipe, energy }: ModalProps) {
    const
        [isVisible, setIsVisible] = useState(false);

    const onWrapClick = (event: any) => { if (event.target.classList.contains('modal-wrap')) onClose() };

    return <>

        <div className={classes.modal}>
            <div className={classes.modal_wrap} onClick={onWrapClick}>
                {/* кнопка закрыть мод окно */}

                <div className={classes.modal_content} >
                  <span>{name}</span>
                  <span>{energy} Ккал</span>
                    <div className={classes.modal_img} onClick={() => onClose()}><Image src={"/" + photo} fill alt={"'" + photo + "'"} /></div>
                    <br />
                    <article className="flex text-l text-left font-semibold text-gray-900 dark:text-white">
                        Ингредиенты: {ingredients}
                    </article>
                    <br />

                    <button type="button" className={`text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2`} onClick={() => setIsVisible(!isVisible)}>{(isVisible) ? 'Скрыть рецепт' : 'Показать рецепт'} </button>
                    {/* <button onClick={() => setIsVisible(!isVisible)}> {(isVisible) ? 'Скрыть рецепт' : 'Посмотреть рецепт'}  </button> */}
                    {isVisible && <article className={`transition-all font-semibold text-left text-gray-800 dark:text-white`}>{recipe}</article>}

                    <button className={classes.btn_modal} onClick={() => onClose()}> ✖ </button>

                </div>
            </div>
        </div>
    </>
}