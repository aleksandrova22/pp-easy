
import { useState } from 'react';
import classes from './modal-dish.module.css';
import Image from 'next/image';
// import { $isOpen, isOpenToggle } from "@/store/store-data";
// import { useStore } from '@nanostores/react';

type ModalProps = {
    name: string, photo: string | null, ingredients: string | null, recipe: string | null, isOpen: boolean, onClose: () => void
}

export function ModalDish({ isOpen, onClose, name, photo, ingredients, recipe }: ModalProps) {
    const
        [isVisible, setIsVisible] = useState(false);

    const onWrapClick = (event: any) => { if (event.target.classList.contains('modal-wrap')) onClose() };

    return <>

        <div className={classes.modal}>
            <div className={classes.modal_wrap} onClick={onWrapClick}>
                {/* кнопка закрыть мод окно */}

                <div className={classes.modal_content} >
                  <span>{name}</span>
                    <div className={classes.modal_img} onClick={() => onClose()}><Image src={"/" + photo} fill alt="Photo" /></div>
                    <br />
                    <p className="text-l p-2 font-semibold text-gray-900 dark:text-white">
                        Ингредиенты: {ingredients}
                    </p>
                    <br />

                    <button type="button" className={`text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2`} onClick={() => setIsVisible(!isVisible)}>{(isVisible) ? 'Скрыть рецепт' : 'Показать рецепт'} </button>
                    {/* <button onClick={() => setIsVisible(!isVisible)}> {(isVisible) ? 'Скрыть рецепт' : 'Посмотреть рецепт'}  </button> */}
                    {isVisible && <div className={`transition-all`}>{recipe}</div>}

                    <button className={classes.btn_modal} onClick={() => onClose()}> ✖ </button>

                </div>
            </div>
        </div>
    </>
}