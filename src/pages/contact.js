import Banner from "../components/Banner";

export default function Contact() {
 
    return (
        <>
            <Banner
                backgroundImage="/home.png"
                title='about_banner.title1'

            />

            <div className="container mx-auto">
                <div className="py-5">
                    <p>ИП "Paketikz" ИИН 911122350042</p>
                    <p> Казахстан, г.Астана, ул. Умай-ана 2.</p>
                    <p> тел.: +7 701 789 65 56 </p>
                    <p>e-mail: salespaketi@gmail.com</p>
                </div>

            </div>

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

