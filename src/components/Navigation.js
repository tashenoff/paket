// src/components/Navigation.js
import Link from 'next/link';
import MiniCart from './MiniCart'; // Импортируем компонент мини корзины
import Image from "next/image";

const Navigation = () => {
    return (
        <nav className="bg-base-200 p-4 px-10">
            <ul className="flex justify-between items-center w-full">
                <div className='flex space-x-4 items-center '>

                    <Image
                        className="light:invert"
                        src="/logo.svg"
                        alt="Next.js logo"
                        width={120}
                        height={38}
                        priority
                    />


                </div>
                <div>
                    <li>
                        <MiniCart />
                    </li>
                </div>
            </ul>
        </nav>
    );
};

export default Navigation;
