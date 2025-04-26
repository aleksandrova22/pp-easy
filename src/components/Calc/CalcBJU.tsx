
import classes from './FormCalc.module.css';
type ListProps = {
    children: {
        valueGender: string,
        valueLifeStyle: string,
        valueTarget: string,
        addFormValues: string[]
    },
    onClose: () => void,
};


export function CalcBJU({ onClose, children }: ListProps) {
    const

        { valueGender, valueLifeStyle, valueTarget, addFormValues } = children,
        [Age, Height, Weight] = addFormValues;
    let BJU: number = 1;
    if (!valueGender || !valueTarget || Age === '' || Height === null || Weight === null || valueTarget === '') return <span >Пожалуйста, заполните все поля</span>
    if (0 > +Age || 1 > +Height || 1 > +Weight) return  <span>Пожалуйста, введите корректные данные</span>
    
    // {   const onWrapClick = (event: any) => { if (event.target.classList.contains('modal-wrap')) onClose() };  
    // <div className={classes.modal_wrap} onClick={onWrapClick}>
    //     {/* кнопка закрыть мод окно */}
    //     <div className={classes.modal_content} >

    //  <span>Пожалуйста, введите корректные данные</span>

    //  </div> </div>};


    const
        bovValue: number | false = bov(+Age, +Height, +Weight);


    if (valueGender === 'M') BJU = Math.round((+bovValue + 5) * kk(valueLifeStyle));
    if (valueGender === 'W') BJU = Math.round((+bovValue - 161) * kk(valueLifeStyle));
    const recommendation: { b: number, j: number, u: number, BJU: number } | undefined = variation(+Weight, +BJU, valueTarget);
    console.log('recommendation', recommendation, BJU);


    return <>
        <ModalCalc recommendation={recommendation} BJU={BJU} onClose={onClose} />
    </>
}


//всякие вычислительные функции
// расчет кооэффициента
function kk(LifeStyle: string) {
    let k = 1;
    if (LifeStyle === "lifeSmall" || "") { k = 1.2 }
    else if (LifeStyle === "lifeMedium") { k = 1.3 }
    else if (LifeStyle === "lifeLarge") { k = 1.5 }
    else if (LifeStyle === "LifeExtrim") { k = 1.9 };
    return k;
}

// расчет базового обмена веществ
function bov(Age: number, Height: number, Weight: number) {
    let bov = 1;
    if (Age < 0 || Height < 1 || Weight < 1) return false;
    else bov = Math.round(10 * Weight + 6.25 * Height - 5 * Age);
    return bov;
}

//вычисление рекомендаций по бжу
function variation(Weight: number, BJU: number, Target: string) {
    switch (Target) {
        case ("-1"): {
            const shift = BJU - 200,
                b = Math.round(2.5 * Weight),
                j = Math.round(0.9 * Weight),
                u = Math.round((shift - b * 4 - j * 9) / 4),
                BJURec = { b: b, j: j, u: u, BJU: shift };
            return BJURec;
        };
        case ("0"): {
            const
                b = Math.round(2 * Weight),
                j = Math.round(1 * Weight),
                u = Math.round((BJU - b * 4 - j * 9) / 4),
                BJURec = { b: b, j: j, u: u, BJU: BJU };
            return BJURec;
        };
        case ("+1"): {
            const shift = BJU + 200,
                b = Math.round(2 * Weight),
                j = Math.round(1.2 * Weight),
                u = Math.round((shift - b * 4 - j * 9) / 4),
                BJURec = { b: b, j: j, u: u, BJU: shift };
            return BJURec;
        };

    };

};

type modalCalcProps = {
    recommendation: { b: number, j: number, u: number, BJU: number } | undefined, onClose: () => void, BJU: number
}

//модальное окно калькулятора
export function ModalCalc({ recommendation, BJU, onClose }: modalCalcProps) {
    const onWrapClick = (event: any) => { if (event.target.classList.contains('modal-wrap')) onClose() };
    return <div className={classes.modal}>
        <div className={classes.modal_wrap} onClick={onWrapClick}>
            {/* кнопка закрыть мод окно */}

            <div className={classes.modal_content} >

                <span> Рекомендуемая суточная норма калорий:  </span>
                <div>{BJU} Ккал</div>
                <span> Ориентир для сброса / набора веса:</span>
                <p>Калории:{recommendation?.BJU} </p>
                <p>Суточная норма белка: {recommendation?.b} грамм</p>
                <p>Суточная норма жиров: {recommendation?.j} грамм</p>
                <p>Суточная норма углеводов: {recommendation?.u} грамм</p>

                <div className={classes.btn_modal} onClick={() => onClose()}> ✖ </div>

            </div>
        </div>
    </div>
}





