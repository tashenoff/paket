import '../globals.css'; // Путь к вашему стилевому файлу
import { appWithTranslation } from 'next-i18next';
// import i18n from '../../lib/i18n'; // Импорт инициализации i18next
import Navigation from '../components/Navigation'; // Импортируем компонент навигации
import NavbarMini from '../components/NabarMini';
import { CartProvider } from '../../context/CartContext';
import Footer from '../components/Footer';
function MyApp({ Component, pageProps }) {
    return (
        <div>


            <CartProvider>
                <NavbarMini />
                <Navigation /> {/* Отображаем компонент навигации */}
                


                    <Component {...pageProps} />
        
                <Footer />
            </CartProvider>
        </div>

    );
}


export default appWithTranslation(MyApp); // Оборачиваем приложение в поддержку переводов
