import React from 'react';

const faqData = [
    {
        question: "Что входит в базовый пакет?",
        answer: "Базовый пакет включает 1 сервис, базовое хранилище данных и круглосуточную поддержку.",
    },
    {
        question: "Какие особенности продвинутого пакета?",
        answer: "Продвинутый пакет включает 5 сервисов, приоритетную поддержку, дополнительное хранилище и интеграцию с API.",
    },
    {
        question: "Что предоставляет премиум пакет?",
        answer: "Премиум пакет включает 10 сервисов, персонального менеджера, неограниченное хранилище и полный доступ ко всем инструментам.",
    },
];

const Faq = () => {
    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Часто задаваемые вопросы</h2>
            <div className="accordion">
                {faqData.map((item, index) => (
                    <div key={index} className="collapse collapse-arrow">
                        <input type="checkbox" id={`faq-${index}`} className="peer" />
                        <div className="collapse-title font-medium">{item.question}</div>
                        <div className="collapse-content">
                            <p>{item.answer}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Faq;
