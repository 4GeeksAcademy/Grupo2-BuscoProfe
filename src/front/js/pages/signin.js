import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from 'react-router-dom';

export const SignIn = () => {
  const { store, actions } = useContext(Context);

  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    role: '',
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  return (
    <div id="signinform">
      <h2 id="headerTitle">Registrarse</h2>
      <div className="row">
        <label htmlFor="userName">Usuario</label>
        <input 
          type="text" 
          id="userName" 
          className="px-3 py-2" 
          placeholder="Usuario" 
          value={formData.userName}
          onChange={handleChange}
        />
      </div>

      <div className="row">
        <label htmlFor="email">Email</label>
        <input 
          type="email" 
          id="email" 
          className="px-3 py-2" 
          placeholder="Email" 
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <div className="row">
        <label htmlFor="password">Contraseña</label>
        <input 
          type="password" 
          id="password" 
          className="px-3 py-2" 
          placeholder="Contraseña" 
          value={formData.password}
          onChange={handleChange}
        />
      </div>

      <div className="row">
        <label htmlFor="role">Elige tu rol</label>
        <select
          id="role"
          className="input-field px-3 py-2"
          value={formData.role}
          onChange={handleChange}
        >
          <option value="" disabled>Selecciona un rol</option>
          <option value="1">Quiero aprender</option>
          <option value="2">Quiero enseñar</option>
        </select>
      </div>

      <div className="row">
        {formData.role === '1' ? (
          <Link to="/studentSignin">
            <button type="submit" className="submit-button">Registrarse</button>
          </Link>
        ) : (
          <Link to="/teacherSignin">
            <button type="submit" className="submit-button">Registrarse</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default SignIn;
