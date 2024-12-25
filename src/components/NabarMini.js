// src/components/NavbarMini.js
import { useState } from 'react';
import Link from 'next/link';
import LanguageSwitcher from './LanguageSwitcher';
import Button from './Button';

const NavbarMini = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className='bg-base-300 px-5 py-4'>
            <div className='flex justify-between items-center'>


                {/* Hamburger Menu for Mobile */}
                <div className='lg:hidden'>
                    <button
                        onClick={toggleMenu}
                        className='p-2 rounded-md hover:bg-base-200 focus:outline-none focus:ring-2 focus:ring-base-100'
                    >
                        {isMenuOpen ? (
                            <span className='block w-6 h-6 bg-gray-600'>✖</span>
                        ) : (
                            <span className='block w-6 h-6 bg-gray-600'>☰</span>
                        )}
                    </button>
                </div>

                {/* Navigation Links (Hidden on Mobile) */}
                <ul className='hidden lg:flex space-x-5'>
                    <li>
                        <Link href='/'>Главная</Link>
                    </li>
                    <li>
                        <Link href='/catalog'>Каталог</Link>
                    </li>
                    <li>
                        <Link href='/about'>О нас</Link>
                    </li>
                    <li>
                        <Link href='/contact'>Контакты</Link>
                    </li>
                </ul>

                {/* Right Section */}
                <div className='hidden lg:flex items-center space-x-5'>
                    <span>По всем вопросам: 8(701)789-65-56</span>
                    <div className='mr-2'>
                        <Button label='Написать whatsapp' onClick={() => alert('Кнопка нажата')} variant='success' size='sm' />
                    </div>
                    <LanguageSwitcher />
                </div>
            </div>

            {/* Dropdown Menu for Mobile */}
            {isMenuOpen && (
                <div className='mt-4 space-y-3 lg:hidden'>
                    <ul className='flex flex-col space-y-3'>
                        <li>
                            <Link href='/catalog'>Каталог</Link>
                        </li>
                        <li>
                            <Link href='/about'>О нас</Link>
                        </li>
                        <li>
                            <Link href='/contact'>Контакты</Link>
                        </li>
                    </ul>
                    <div className='mt-3 flex flex-col space-y-3'>
                        <span>По всем вопросам: 8(701)789-65-56</span>
                        <Button label='Написать whatsapp' onClick={() => alert('Кнопка нажата')} variant='success' size='sm' />
                        <LanguageSwitcher />
                    </div>
                </div>
            )}
        </nav>
    );
};

export default NavbarMini;
