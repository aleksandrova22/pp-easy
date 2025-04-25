'use client';
import {  useState } from 'react';
import { useSession } from "next-auth/react";

export function Hamburger() {
	const
		[isMenuOpen, setIsMenuOpen] = useState(false),
		toggleMenu = () => { setIsMenuOpen(!isMenuOpen) };

		const { data: session } = useSession();
	
	return <>
		<div className={`lg:hidden`}>

			<button className={`navbar-burger flex items-center text-gray-800 lg:hidden bg-yellow-50`} onClick={toggleMenu}>
				☰
				
			</button>


			{/* </div> */}
			<div className={isMenuOpen ? `navbar-menu relative z-50 block` : `navbar-menu relative z-50 hidden`}  >
				<div className={`navbar-backdrop fixed inset-0 bg-gray-800 opacity-25`}></div>
				<nav className={`fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-gray-300 border-r overflow-y-auto`}>
					<div className={`flex items-center mb-8`}>
						{/* <Image className={classes.logo} src={"/logo.png"} width={70} height={70} alt="logo" priority /> */}
						<button className={`navbar-close`} onClick={toggleMenu}> ✖ </button>
					</div>
					<div className={`flex-col `}>
						<ul className={`flex flex-col items-center`}>
							<li className={`mb-1`}>
								<a className={`block p-4 text-m font-semibold text-gray-600 hover:bg-blue-50 hover:text-green-800 rounded`} href="/">Главная</a>
							</li>
							<li className={`mb-1`}>
								<a className={`block p-4 text-m font-semibold text-gray-600 hover:bg-blue-50 hover:text-green-800 rounded`} href="/calc">Калькулятор КБЖУ</a>
							</li>
							<li className={`mb-1`}>
								<a className={`block p-4 text-m font-semibold text-gray-600 hover:bg-blue-50 hover:text-green-800 rounded`} href="/menus">Рецепты</a>
							</li>
							<li className={`mb-1`}>
								<a className={`block p-4 text-m font-semibold text-gray-600 hover:bg-blue-50 hover:text-green-8000 rounded`} href="/menubyuser">Мое меню</a>
							</li>
							<li className={`mb-1`}>
								<a className={`block p-4 text-m font-semibold text-gray-600 hover:bg-blue-50 hover:text-green-8000 rounded`} href="/contact">Контакты</a>
							</li>
							<li className={`mb-1`}>
								<a className={`block p-4 text-m font-semibold text-gray-600 hover:bg-blue-50 hover:text-green-800 rounded`} href="/authorize">Авторизация</a>
							</li>

							

							<li className={`mb-1`}>  {(session?.user?.admin) ? 
								<a className={`block p-4 text-m font-semibold text-gray-600 hover:bg-blue-50 hover:text-green-800 rounded`} href="/api/admin">Управление БД </a> : ''
}</li>
							

							 

							{/* <li><a className={`block px-4 py-3 mb-3 leading-loose text-xs text-center font-semibold leading-none bg-gray-50 hover:bg-gray-100 rounded-xl`} href="/api/auth/signin">Войти</a></li> */}

						</ul>
						{/* </div> */}
						{/* <div className={`mt-auto`}> */}
						{/* <div className={`pt-6`}> */}

							{/* {(session) ?  */}
							
							{/* <a className={`block px-4 py-3 mb-2 leading-loose text-xs text-center text-white font-semibold bg-blue-600 hover:bg-blue-700  rounded-xl`} href="/authorize">Выйти</a> :
								<a className={`block px-4 py-3 mb-3 leading-loose text-xs text-center font-semibold  bg-gray-50 hover:bg-gray-100 rounded-xl`} href="/api/auth/signin">Войти</a>
							 */}
							{/* </div> */}


						{/* </div> */}
						{/* <p className={`my-4 text-s text-center text-gray-600`}> <span>© 2025</span></p> */}
					</div>
				</nav>
			</div>
		</div>
	</>

}






























































