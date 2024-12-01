import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const TeacherSignIn = () => {
  const { store, actions } = useContext(Context);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    educationLevel: "",
    timeSlot: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Aquí puedes llamar a una acción del contexto o hacer un POST a la API.
  };

  return (
    <div id="signinform">
      <h2 id="headerTitle">Registrarse</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <label htmlFor="fullName">Nombre completo</label>
          <input
            type="text"
            id="fullName"
            className="px-3 py-2"
            placeholder="Nombre completo"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="row">
          <label htmlFor="subject">Doy clases de</label>
          <select
            id="subject"
            className="input-field px-3 py-2"
            value={formData.subject}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Selecciona tu materia
            </option>
            <option value="bachillerato">Bachillerato</option>
            <option value="terciario">Terciario</option>
          </select>
        </div>

        <div className="row">
          <label htmlFor="educationLevel">Nivel educativo</label>
          <select
            id="educationLevel"
            className="input-field px-3 py-2"
            value={formData.educationLevel}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Selecciona un nivel
            </option>
            <option value="tecnico">Técnico terciario</option>
            <option value="licenciatura">Licenciatura</option>
            <option value="maestría">Maestría</option>
            <option value="doctorado">Doctorado</option>
          </select>
        </div>

        <div className="row">
          <label htmlFor="timeSlot">Franja horaria</label>
          <select
            id="timeSlot"
            className="input-field px-3 py-2"
            value={formData.timeSlot}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Selecciona una franja horaria
            </option>
            <option value="matutino">Matutino</option>
            <option value="vespertino">Vespertino</option>
            <option value="nocturno">Nocturno</option>
          </select>
        </div>

        <div className="row" id="button">
          <button type="submit">Registrarse</button>
        </div>
      </form>
    </div>
  );
};

export default TeacherSignIn;
