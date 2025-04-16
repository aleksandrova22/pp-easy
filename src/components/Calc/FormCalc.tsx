"use client";
import { useState } from 'react';
import classes from './FormCalc.module.css';
import { Column, config } from './const';
import { CalcBJU } from './CalcBJU';

type DataFormProps = {
    columns: Column[],
    values: string[],
    setValues: (values: any) => void
}

function DataForm({ columns, values, setValues }: DataFormProps) {
    return <div >
        {columns.map(({ setVal, title }, i: number) =>
            <div key={i}>    {title}  <br />
                {setVal
                    ?
                    <input type='number' min={0} max={500} value={values[i]}
                        onInput={(event) => setValues((prev: string[]) => prev.with(i, (event.target as HTMLInputElement).value))} />
                    : ''
                } <br />
            </div>)}
    </div>;
}

export function FormCalc() {
    'use client';
    console.log('FormCalc=');
    const
        [addFormValues, setAddFormValues] = useState(Array.from({ length: config.columns.length }, () => '')),
        [valueLifeStyle, setValueLifeStyle] = useState<string>('Не указано'),
        [valueGender, setValueGender] = useState<string>(''),
        [valueTarget, setValueTarget] = useState<string>('') || null,
        [show, setShow] = useState(false);

    return <>
        <div className={classes.calc}>

            <h3>Что такое КБЖУ?</h3>
            <p>Аббревиатура "КБЖУ" расшифровывается следующим образом: «К» – калории, «Б» – белки, «Ж» – жиры, «У» – углеводы. </p>
            <p>Данные элементы являются жизненно важными для человеческого организма.</p>
            <p>Соблюдать КБЖУ-БАЛАНС - это обязательное условие для успешного избавления от лишних килограммов</p>
            <p>Калькулятор КБЖУ поможет рассчитать калории и нормы нутриентов по формуле Миффлина-Сан Жеора в зависимости от целей. </p>

            <br />

            <h3>КАЛЬКУЛЯТОР КБЖУ</h3>
            <div>
                <span>Ваш пол:</span><br/>
                <div className={classes.form_target}>
                <button style={{ backgroundColor: valueGender === 'M' || '' ? 'green' : '' } }
                    onClick={() => { setValueGender('M') }}>Мужской </button>
                <button style={{ backgroundColor: valueGender === 'W' || '' ? 'green' : '' }}
                    onClick={() => { setValueGender('W') }}> Женский </button>
            </div>
            </div>
            <br />
            <DataForm columns={config.columns} values={addFormValues} setValues={setAddFormValues} />
            <br />
            <div >
            <form>
                <span>Ваш образ жизни:</span><br/>
                <select value={valueLifeStyle} onChange={event => setValueLifeStyle(event.target.value)}>
                    <option value="">Не указано</option>
                    <option value="lifeSmall">Малоподвижный</option>
                    <option value="lifeMedium">Тренировки 1-3 раза в неделю</option>
                    <option value="lifeLarge">Тренировки 3-5 раза в неделю</option>
                    <option value="LifeExtrim">Высокие нагрузки каждый день</option>
                </select>
            </form>
            </div>
            <br />


            <div >
                <span>Ваша цель:</span> <br />
                <div className={classes.form_target}>
                    <button style={{ backgroundColor: valueTarget === '-1' || '' ? 'green' : '' }}
                        onClick={() => { setValueTarget('-1') }}>Сбросить вес </button>
                    <button style={{ backgroundColor: valueTarget === '0' || '' ? 'green' : '' }}
                        onClick={() => { setValueTarget('0') }}>Поддерживать вес </button>
                    <button style={{ backgroundColor: valueTarget === '+1' || '' ? 'green' : '' }}
                        onClick={() => { setValueTarget('+1') }}>Набрать мышечную массу </button>
                </div>

            </div>
            <br />


            <button style={{ backgroundColor: show ? 'green' : '' }}
                onClick={() => {
                    // if (!valueGender) return <span></span>
                    setShow(!show); console.log(addFormValues, valueLifeStyle, valueGender, valueTarget); <div >
                    </div>
                }}>
                Рассчитать </button>
            <div >
                {show && <CalcBJU children={{ valueGender, valueLifeStyle, valueTarget, addFormValues}} onClose={() => setShow(false)}  />}
            </div>

        </div>
    </>
};