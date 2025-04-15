import { ReactNode } from 'react';
import classes from './burger.module.css';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export function Burger() {

    const
        [isMenuOpen, setIsMenuOpen] = useState(false),
        toggleMenu = () => { setIsMenuOpen(!isMenuOpen) };

    return <>
        <nav className={classes.burger_nav}>
            <div className={isMenuOpen ? classes.btn_burger_active : classes.btn_burger} onClick={toggleMenu}>
                <span className={isMenuOpen ? classes.span_burger_active : classes.span_burger} onClick={toggleMenu}></span>
                <span className={isMenuOpen ? classes.span_burger_active : classes.span_burger} onClick={toggleMenu}></span>
                <span className={isMenuOpen ? classes.span_burger_active : classes.span_burger} onClick={toggleMenu}></span>
            </div>

            <div className={isMenuOpen ? classes.burger_menu_active : classes.burger_menu}>
                <button className={`navbar-close`} onClick={toggleMenu}> ✖ </button>

                <a className={`block p-4 text-sm font-semibold text-gray-600 hover:bg-blue-50 hover:text-green-800 rounded`} href="/">Главная</a>
                <a className={`block p-4 text-sm font-semibold text-gray-600 hover:bg-blue-50 hover:text-green-800 rounded`} href="/calc">Калькулятор БЖУ</a>
                <a className={`block p-4 text-sm font-semibold text-gray-600 hover:bg-blue-50 hover:text-green-800 rounded`} href="/menus">Рецепты</a>
                <a className={`block p-4 text-sm font-semibold text-gray-600 hover:bg-blue-50 hover:text-green-8000 rounded`} href="/menubyuser">Мое меню</a>
                <a className={`block p-4 text-sm font-semibold text-gray-600 hover:bg-blue-50 hover:text-green-8000 rounded`} href="/contact">Контакты</a>
                <p className={`my-4 text-s text-center text-gray-600`}> <span>© 2025</span></p>
            </div>


        </nav>
    </>



}