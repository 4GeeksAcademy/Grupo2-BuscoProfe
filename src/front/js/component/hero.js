import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

function Hero() {
    const { actions } = useContext(Context);
    const [vantaEffect, setVantaEffect] = useState(0);
    const [loading, setLoading] = useState(true);  // Estado para controlar el spinner
    const navigate = useNavigate(); // Usamos navigate para redirigir al usuario

    useEffect(() => {
        // Efecto para VANTA.js
        if (!vantaEffect && window.VANTA) {
            setVantaEffect(
                window.VANTA.TOPOLOGY({
                    el: "#hero",
                    touchControls: true,
                    gyroControls: false,
                    minHeight: 200.00,
                    minWidth: 200.00,
                    scale: 1.00,
                    scaleMobile: 1.00,
                    color: '#6abaa4',
                    backgroundColor: 'transparent',
                })
            );
        }

        return () => {
            if (vantaEffect) vantaEffect.destroy();
        };
    }, [vantaEffect]);

    useEffect(() => {
        const token = localStorage.getItem("IdToken");

        if (token) {
            validateToken(token);
        } else {
            setLoading(false); 
        }
    }, []);

    const validateToken = async (token) => {
        try {
            const tokenValidInfo = await actions.validateToken(token); 

            if (tokenValidInfo) {
                const roles = tokenValidInfo.roles;
    
                if (roles && roles.length > 0) {
                    const role = roles[0]; 
    
                    if (role === "teacher") {
                        navigate("/teacherDashboard");
                    } else if (role === "student") {
                        navigate("/studentDashboard");
                    } else {
                        navigate("/");
                    }
                }
            } else {
                console.log("Token no válido o expirado");
            }
        } catch (error) {
            console.error("Error al validar el token: ", error);
        }
        setLoading(false); 
    };

    return (
        <div>
            {loading ? (
                <div className="d-flex justify-content-center align-items-center min-vh-100">
                    {/* Spinner de Bootstrap */}
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Cargando...</span>
                    </div>
                </div>
            ) : (
                <div id="hero" className="hero-container min-vh-100 mx-auto d-flex flex-column justify-content-center">
                    <div className="text-center hero-content">
                        <h1 className="hero-title display-1" style={{ color: "#6abaa4", fontWeight: "600", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7), 0px 0px 10px rgba(106, 186, 164, 0.5)" }}>
                            ¡Suma Saber!
                        </h1>
                        <h3 className="hero-subtitle display-5 w-75 mx-auto" style={{ opacity: 0.75, color: "#06090a", fontWeight: 'lighter' }}>
                            Conecta con el profesor ideal para ti y, como docente, inspira al mundo compartiendo tu conocimiento y experiencia.
                        </h3>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Hero;
