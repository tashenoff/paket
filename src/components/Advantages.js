import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "next-i18next";

const Advantages = () => {
    const { t } = useTranslation("common"); // Указываем namespace "common"

    const advantages = [
        { value: 1000, label: t("advantages.clients") },
        { value: 27, label: t("advantages.years") },
        { value: 100, label: t("advantages.quality"), isPercentage: true },
        { value: 90, label: t("advantages.cheaper"), isPercentage: true },
    ];

    const [visible, setVisible] = useState(false);
    const sectionRef = useRef(null);

    // Наблюдение за блоком
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                }
            },
            { threshold: 0.5 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) observer.unobserve(sectionRef.current);
        };
    }, []);

    return (
        <div ref={sectionRef} className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-8 bg-base-100 text-base-content">
                {advantages.map((advantage, index) => (
                    <AdvantageCard
                        key={index}
                        value={advantage.value}
                        label={advantage.label}
                        isPercentage={advantage.isPercentage}
                        animate={visible}
                    />
                ))}
            </div>
        </div>
    );
};

const AdvantageCard = ({ value, label, isPercentage, animate }) => {
    const [currentValue, setCurrentValue] = useState(0);

    useEffect(() => {
        if (!animate) return;

        let startValue = 0;
        const duration = 2000; // Длительность анимации (мс)
        const increment = value / (duration / 16); // Рассчитываем шаг

        const updateValue = () => {
            startValue += increment;
            if (startValue >= value) {
                setCurrentValue(value);
            } else {
                setCurrentValue(Math.floor(startValue));
                requestAnimationFrame(updateValue);
            }
        };

        updateValue();
    }, [animate, value]);

    return (
        <div className="flex flex-col items-center justify-center text-center p-4 rounded-lg shadow-md bg-base-200">
            <span className="text-4xl font-bold text-primary">
                {currentValue}
                {isPercentage && "%"}
            </span>
            <span className="text-sm font-medium text-secondary">{label}</span>
        </div>
    );
};

export default Advantages;
