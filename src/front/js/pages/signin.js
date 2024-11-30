import React, { useContext } from "react";
import { Context } from "../store/appContext";

export const SignIn = () => {
  const { store, actions } = useContext(Context);

  return (
    <div id="signinform">
      <h2 id="headerTitle">Registrarse</h2>
      <div className="row">
        <label htmlFor="username">Usuario</label>
        <input type="text" id="username" placeholder="Usuario" />
      </div>

      <div className="row">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" placeholder="Email" />
      </div>

      <div className="row">
        <label htmlFor="password">Contraseña</label>
        <input type="password" id="password" placeholder="Contraseña" />
      </div>

      <div className="row">
        <label htmlFor="role">Elige tu rol</label>
        <select id="role" className="input-field">
          <option value="1">Quiero aprender</option>
          <option value="2">Quiero enseñar</option>
        </select>
      </div>

      <div className="row">
        <button type="submit" className="submit-button">Registrarse</button>
      </div>
    </div>
  );
};

export default SignIn;
