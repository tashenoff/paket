import React from "react";
import Button from "./Button";

const InstagramSection = () => {
    const images = [
        "/inst-1.png", // Замените пути на свои изображения
        "/inst-2.png",
        "/inst-3.png",
    ];

    return (
        <section className="py-8 bg-base-100 text-base-content">
            <div className="container mx-auto">
                <div className="flex justify-between w-full items-center py-5 ">
                    <h2 className="text-center text-2xl font-bold mb-6">Наш Instagram</h2>
                    <Button label={'Посмотреть все'} />
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
                {images.map((src, index) => (
                    <div
                        key={index}
                        className="overflow-hidden rounded-lg shadow-lg hover:scale-105 transform transition duration-300"
                    >
                        <img
                            src={src}
                            alt={`Instagram image ${index + 1}`}
                            className="w-full h-48 object-cover"
                        />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default InstagramSection;
