import React, { useState, useEffect } from "react";

function Hero() {
    const [vantaEffect, setVantaEffect] = useState(0);
    useEffect(() => {
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
                    color: '#003049',
                    backgroundColor: 'transparent',
                })
            );
        }
        console.log("running");
        return () => {
            if (vantaEffect) vantaEffect.destroy();
        };
    }, [vantaEffect]);

    return (
        <>
            <div className="min-vh-100 mx-auto d-flex flex-column justify-content-center" id="hero">
                <div className="md-h-50 d-flex flex-column my-auto text-center display-1 font-weight-bold justify-content-between">
                    <h2 className="display-1" style={{ color: "#003049" }}>
                        Suma Saber!
                    </h2>
                    <h2 className="display-5 w-50 mx-auto" style={{ opacity: 0.5 }}>
                        Encuentra profesores que se adapten a tus necesidades y, como profesor,
                        comparte tus conocimientos con el mundo.
                    </h2>
                </div>
            </div>
        </>
    );
}

export default Hero;