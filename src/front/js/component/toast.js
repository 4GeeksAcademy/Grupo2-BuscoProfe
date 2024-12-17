import React, { useState, useEffect } from 'react';
import './toast.css';

const toast = ({ message, type, duration = 3000, onClose }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (message) {
            setIsVisible(true);

            const timer = setTimeout(() => {
                setIsVisible(false);
                onClose(); // Llamar a la función onClose para limpiar el mensaje
            }, duration);

            return () => clearTimeout(timer); // Limpiar el temporizador cuando el componente se desmonte
        }
    }, [message, type, duration, onClose]);

    if (!isVisible) return null;

    return (
        <div className={`toast ${type}`}>
            <div className="toast-content">
                <p>{message}</p>
                <button className="close-btn" onClick={() => setIsVisible(false)}>×</button>
            </div>
        </div>
    );
};

export default toast;
