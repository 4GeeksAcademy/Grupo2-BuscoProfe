import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const { actions } = useContext(Context);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false); // Estado para controlar si la solicitud está en progreso

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Deshabilitar el botón cuando se envía el formulario

    // Llamar a una acción de Flux para autenticar al usuario
    const result = await actions.login(formData);
    if (result.error) {
      alert(`Error: ${result.error}`);
      setIsSubmitting(false); // Habilitar el botón si hay un error
    } else {
      alert("Inicio de sesión exitoso");
      // Redirigir a /home
      navigate("/home");
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