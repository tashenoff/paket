import Banner from "../components/Banner";
import VideoWithText from "../components/VideoWithText";

export default function About() {

    return (
        <>
            <Banner
                backgroundImage="/home.png"
                title='about_banner.title1'
           
            />
            <VideoWithText />

            <Banner
                backgroundImage="/footer.png"
                title='home_banner.title2'
                description='home_banner.description2'
                buttonText='home_banner.button2'
                onButtonClick={() => alert('home_banner.button2')}
            />
        </>
    );
}

