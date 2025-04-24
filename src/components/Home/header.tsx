 'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import classes from './header.module.css';
import { Hamburger } from './hamburger';
import { useSession } from "next-auth/react";



const
  pages = [
    { href: '/', title: 'Легкий старт к здоровью' },
    { href: '/calc', title: 'Калькулятор БЖУ' },
    { href: '/menus', title: 'Рецепты' },
    { href: '/menubyuser', title: 'Мое меню' },
    // { href: '/contact', title: 'Контакты' },
    { href: '/authorize', title: 'Авторизация' },
   

  ];

export default function Header({ children = null }: { children: ReactNode }) {
  const pathname = usePathname();
  console.log(pathname);
  const { data: session } = useSession();

  return <>

    <header>

      <Hamburger />
      {children}

      {/* <Burger /> */}


      {/* логотип тарелка */}
      {/* <div className={classes.dish_logo}> <Image className={classes.dish_logo_img} src={"/dish1.png"} width={100} height={100} alt="Picture of the author" /></div>
      <div className={classes.dish_logo}> <Image src={"/dish2.png"} width={100} height={100} alt="Picture of the author" /></div> */}

      {/* <div className={`aspect-1/1 items-right bg-[url(/logo.png)] w-25 bg-contain bg-center bg-no-repeat rounded-full animate-bounce `}>  </div> */}
      <nav className={classes.header} >


        <ul>
          {pages.map(({ href, title }) =>
            <li key={href} className={pathname === href ? 'active' : ''}>
              <Link href={href}>{title} </Link>
            </li>)}
            <li> {(session?.user?.admin)  ?   <Link href={'/api/admin'}> Управление БД </Link> : ''}</li>
        </ul>



            </nav>

          <div> <a href='/'><Image className={classes.logo} src={"/logo.png"} width={65} height={65} alt="logo"/></a></div>
    </header>
    {/* <div className={`aspect-2/2 bg-[url(/breakfast.jpg)] bg-center object-cover bg-no-repeat items-center justify-items-center sepia-50 w-full z-0 rounded-b-lg`} ></div> */}


  </>;
}
