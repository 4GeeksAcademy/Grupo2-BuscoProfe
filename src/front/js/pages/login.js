import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const { actions } = useContext(Context);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const token = localStorage.getItem("IdToken");
    if (token) {
      validateToken(token);
    } else {
      setLoading(false);
    }
  }, []);

  const validateToken = async (token) => {
    try {
      const tokenValidInfo = await actions.validateToken(token); 
      if (tokenValidInfo) {
        const roles = tokenValidInfo.roles;
        if (roles.includes('teacher')) {
          navigate("/teacherDashboard");
        } else if (roles.includes('student')) {
          navigate("/studentDashboard");
        } else {
          console.error("No valid role found");
          setLoading(false);
        }
      }
    } catch (error) {
      setLoading(false); 
    }
  };

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
  
      const roles = result.roles;
  
  
      // Redirigir según el rol
      if (roles.includes('teacher')) {
        navigate("/teacherDashboard");
      } else if (roles.includes('student')) {
        navigate("/studentDashboard");
      } else {
        console.error("No valid role found");
      }
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

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
