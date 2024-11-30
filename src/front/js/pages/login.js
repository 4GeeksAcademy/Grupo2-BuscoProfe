import React, { useContext } from "react";
import { Context } from "../store/appContext";

export const Login = () => {
  const { store, actions } = useContext(Context);

  return (
    <div id="loginform">
      <h2 id="headerTitle">Iniciar Sesión</h2>
      <div className="row">
        <label htmlFor="username">Usuario</label>
        <input id="username" type="text" placeholder="Ingresa tu usuario" />
      </div>

      <div className="row">
        <label htmlFor="password">Contraseña</label>
        <input id="password" type="password" placeholder="Ingresa tu contraseña" />
      </div>

      <div className="row">
        <button type="submit">Iniciar Sesión</button>
      </div>
    </div>
  );
};

export default Login;
