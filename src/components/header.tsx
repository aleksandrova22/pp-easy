'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

const
  pages = [
    { href: '/', title: 'Домашняя' },
    { href: '/product', title: 'Меню' },
    { href: '/menus', title: 'Рецепты' },
    //  { href: '/account', title: 'Рецепты-test' },
    { href: '/contact', title: 'Контакты' },
   
  ];

export default function Header({ children = null }: { children: ReactNode} ) {
  const pathname = usePathname();
  console.log(pathname)
  return <header>
    {children}
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