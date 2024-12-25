import { useState, useEffect } from 'react';

const Notification = ({ message, onClose }) => {
    const [show, setShow] = useState(true);

    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                setShow(false);
                onClose(); // Закрыть уведомление через 3 секунды
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [show, onClose]);

    if (!show) return null;

    return (
        <div className='toast toast-center toast-middle z-50'>
            <div className="alert alert-success shadow-lg">
                <div className="flex justify-between w-full">
                    <span>{message}</span>
                </div>
            </div>
        </div>
    );
};

export default Notification;
