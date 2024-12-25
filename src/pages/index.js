import Banner from "../components/Banner";
import Advantages from "../components/Advantages";
import InstagramSection from "../components/InstagramSection";
import { useTranslation } from 'next-i18next';
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function Home() {
    const { t } = useTranslation('common'); // 'common' соответствует имени JSON-файла

    return (
        <>
            <Banner
                backgroundImage="/home.png"
                title={t('home_banner.title1')}
                description={t('home_banner.description1')}
                buttonText={t('home_banner.button1')}
                onButtonClick={() => alert(t('home_banner.button1'))}
            />
            <Advantages />
            <InstagramSection />
            <Banner
                backgroundImage="/footer.png"
                title={t('home_banner.title2')}
                description={t('home_banner.description2')}
                buttonText={t('home_banner.button2')}
                onButtonClick={() => alert(t('home_banner.button2'))}
            />
        </>
    );
}

// export async function getStaticProps({ locale }) {
//     return {
//         props: {
//             ...(await serverSideTranslations(locale, ['common'])),
//         },
//     };
// }
