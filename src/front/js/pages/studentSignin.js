import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from 'react-router-dom';

export const StudentSignIn = () => {
  const { store, actions } = useContext(Context);

  const [formData, setFormData] = useState({
    level: '',
    subjects: '',
    timePreference: '',
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  return (
    <div id="signinform">
      <h2 id="headerTitle">¡Bienvenido/a!</h2>
      <p>Por favor, completa la siguiente información para continuar</p>
      <div className="row">
        <label htmlFor="level">Nivel Académico</label>
        <select 
          id="level" 
          className="input-field px-3 py-2"
          value={formData.level}
          onChange={handleChange}
        >
          <option value="" disabled>Selecciona tu nivel</option>
          <option value="1">Primaria</option>
          <option value="2">Secundaria</option>
          <option value="3">Terciaria</option>
        </select>
      </div>
      <div className="row">
        <label htmlFor="subjects">¿Que deseas estudiar?</label>
        <input 
          type="text" 
          id="subjects" 
          className="px-3 py-2"
          placeholder="Ingresa una asignatura" 
          value={formData.subjects}
          onChange={handleChange}
        />
      </div>
      <div className="row">
        <label htmlFor="timePreference">Preferencia horaria</label>
        <select 
          id="timePreference" 
          className="input-field px-3 py-2"
          value={formData.timePreference}
          onChange={handleChange}
        >
          <option value="" disabled>Selecciona tus horarios</option>
          <option value="1">Matutino</option>
          <option value="2">Vespertino</option>
          <option value="3">Nocturno</option>
        </select>
      </div>
      <div className="row">
        <button type="submit" className="submit-button">Guardar</button>
      </div>
    </div>
  );
};

export default StudentSignIn;