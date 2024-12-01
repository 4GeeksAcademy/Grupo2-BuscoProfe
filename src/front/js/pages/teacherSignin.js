import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const TeacherSignIn = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="login-container mt-4">
            <form className="login-form">
                <h2>Registrarse</h2>
                <input type="text" placeholder="Nombre completo" />
                <input type="email" placeholder="Email" />
                <select className="custom-select">
                    <option value="" disabled selected>
                        Doy clases de
                    </option>
                    <option value="bachillerato">Bachillerato</option>
                    <option value="terciario">Terciario</option>
                </select>
                <select className="custom-select">
                    <option value="" disabled selected>
                        Nivel educativo
                    </option>
                    <option value="tecnico">Técnico terciario</option>
                    <option value="licenciatura">Licenciatura</option>
                    <option value="maestría">Maestría</option>
                    <option value="doctorado">Doctorado</option>
                </select>
                <select className="custom-select">
                    <option value="" disabled selected>
                        Franja horaria
                    </option>
                    <option value="matutino">Matutino</option>
                    <option value="vespertina">Vespertino</option>
                    <option value="nocturno">Nocturno</option>
                    <option value="default">Sin preferencia</option>
                </select>
                <button type="submit">Entrar</button>
            </form>
        </div>
    );
};

export default TeacherSignIn;
