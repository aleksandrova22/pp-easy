"use client";
import { memo, ReactNode } from 'react';

type ListProps = {

    valueGender: string,
    valueLifeStyle: string,
    valueTarget: string,
    addFormValues: string[],

    // children: ReactNode
};

export const CalcBJU = memo(function ({ children }: { children: ListProps }) {
    const
        { valueGender, valueLifeStyle, valueTarget, addFormValues } = children,
        [Age, Height, Weight] = addFormValues;
    let BJU: number = 1;
    if (!valueGender || !valueTarget || Age === '' || Height === null || Weight === null || valueTarget === '') return <span>Пожалуйста заполните все поля</span>
    if (0 > +Age || 1 > +Height || 1 > +Weight) return <span>Пожалуйста введите корректные данные</span>
    const
        bovValue: number | false = bov(+Age, +Height, +Weight);

    if (valueGender === 'M') BJU = Math.round((+bovValue + 5) * kk(valueLifeStyle))
    if (valueGender === 'W') BJU = Math.round((+bovValue - 161) * kk(valueLifeStyle));
    const recomend: { b: number, j: number, u: number, BJU: number } | undefined = variation(+Weight, BJU, valueTarget);
    return <>
        <div  >
            <h3> Рекомендуемая суточная норма калорий:</h3>
            <div>{BJU} Ккал</div>
            <h3> Ориентир для сброса / набора веса:</h3>
            <p>Калории:{recomend?.BJU} </p>
            <p>Суточная норма белка: {recomend?.b} грамм</p>
            <p>Суточная норма жиров: {recomend?.j} грамм</p>
            <p>Суточная норма углеводов: {recomend?.u} грамм</p>
        </div>
    </>;
});

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
        case ("0") : {
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
    
}





