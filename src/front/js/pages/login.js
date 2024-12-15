import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";

export const Login = () => {
  const { actions } = useContext(Context);

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false); 

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); 
  
    const result = await actions.login(formData);
  
    if (result.error) {
      alert(`Error: ${result.error}`);
      setIsSubmitting(false); 
    } else {
      alert("Inicio de sesión exitoso");
    }
  };

  return (
    <div id="loginform">
      <h2 id="headerTitle">Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Ingresa tu email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="row">
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            placeholder="Ingresa tu contraseña"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="row">
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Enviando..." : "Iniciar Sesión"}
          </button>
        </div>
        <p></p>
        <p>Si no tienes una cuenta <a href="../signin">regístrate aquí</a></p>
      </form>
    </div>
  );
};

export default Login;
