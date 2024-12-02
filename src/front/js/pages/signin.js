import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";

export const SignIn = () => {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    role: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Verificar que todos los campos estén completos
    if (!formData.userName || !formData.email || !formData.password || !formData.role) {
      alert("Por favor, completa todos los campos antes de continuar.");
      return;
    }

    // Redirigir según el rol seleccionado
    if (formData.role === '2') {
      navigate("/teacherSignin");
    } else {
      navigate("/studentSignin");
    }
  };

  return (
    <div id="signinform">
      <h2 id="headerTitle">Registrarse</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <label htmlFor="userName">Usuario</label>
          <input
            type="text"
            id="userName"
            className="px-3 py-2"
            placeholder="Usuario"
            value={formData.userName}
            onChange={handleChange}
            required
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
            required
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
            required
          />
        </div>

        <div className="row">
          <label htmlFor="role">Elige tu rol</label>
          <select
            id="role"
            className="input-field px-3 py-2"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Selecciona un rol</option>
            <option value="1">Quiero aprender</option>
            <option value="2">Quiero enseñar</option>
          </select>
        </div>

        <div className="row">
          <button type="submit" className="submit-button">Registrarse</button>
        </div>
      </form>

    </div>
  );
};

export default SignIn;
