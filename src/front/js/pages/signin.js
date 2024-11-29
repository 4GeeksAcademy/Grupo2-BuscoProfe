import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const SignIn = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="login-container mt-4">
            <form className="login-form">
                <h2>Registrarse</h2>
                <input type="text" placeholder="Usuario"/>
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Contraseña" />
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
                        <label class="form-check-label" for="flexRadioDefault1">
                            Quiero aprender
                        </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked/>
                        <label class="form-check-label" for="flexRadioDefault2">
                           Quiero enseñar
                        </label>
                </div>
                <button type="submit">Entrar</button>
                {/* <a href="#" className="forgot-password">¿Olvidaste tu contraseña?</a> */}
            </form>
        </div>
    );
};

export default SignIn;