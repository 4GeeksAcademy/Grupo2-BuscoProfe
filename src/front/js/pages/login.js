import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Login = () => {
	const { store, actions } = useContext(Context);
    
    return (
        <div className="login-container mt-4">
          <form className="login-form">
            <h2>Iniciar Sesión</h2>
            <input type="text" placeholder="Usuario" />
            <input type="password" placeholder="Contraseña" />
            <button type="submit">Entrar</button>
            <a href="#" className="forgot-password">¿Olvidaste tu contraseña?</a>
          </form>
        </div>
      );
    };
    
export default Login;