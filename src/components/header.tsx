'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import classes from './header.module.css';

const
  pages = [
    { href: '/', title: 'Домашняя' },
    { href: '/product', title: 'Меню' },
    { href: '/menus', title: 'Рецепты' },
    { href: '/menubyuser', title: 'Мое меню' },
    { href: '/contact', title: 'Контакты' },

  ];

export default function Header({ children = null }: { children: ReactNode }) {
  const pathname = usePathname();
  console.log(pathname)
  return <header>
    {children}
    <div className={classes.div1}> <Image className={classes.logo} src={"/logo.png"} width={90} height={90} alt="Picture of the author" /></div>
    <nav>
      <ul>
        {pages.map(({ href, title }) =>
          <li key={href} className={pathname === href ? 'active' : ''}>
            <Link href={href}>{title} </Link>
          </li>)}
      </ul>
    </nav>
  </header>
}