import React, { useState, useContext } from "react";
import { Context } from "../store/appContext"; // Asegúrate de importar el contexto adecuado

const ROLES = {
  STUDENT: "student",
  TEACHER: "teacher"
};

const STUDENT_LEVELS = {
  "Bachillerato": "StudentLevel_Bachillerato",
  "Universitario": "StudentLevel_Universitario"
};

const TEACHER_LEVELS = {
  "Técnico terciario": "TeacherLevel_TecnicoTerciario",
  "Licenciatura": "TeacherLevel_Licenciatura",
  "Maestría": "TeacherLevel_Maestria",
  "Doctorado": "TeacherLevel_Doctorado"
};

const SignIn = () => {
  const { actions } = useContext(Context);

  // Datos del Usuario para luego pasarlo al endpoint
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "", // Esto estaría bueno cambiarlo a un enum en algún momento, por seguridad.
    level: "",
    subjects: "",
    timePreferences: [],
    subject: "",
    educationLevel: "",
  });

  // Maneja los cambios de los campos de texto del formulario
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // Maneja los cambios en los checkboxes de las preferencias horarias
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevState) => {
      const { timePreferences } = prevState;
      if (checked) {
        // Si está marcado agrega
        return { ...prevState, timePreferences: [...timePreferences, value] };
      } else {
        // Si no está marcado lo quita.
        return {
          ...prevState,
          timePreferences: timePreferences.filter((time) => time !== value),
        };
      }
    });
  };

  // Envia la información del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mapeamos los valores de los enums al formato esperado por el backend
    const payload = {
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password,
      role: formData.role,
      ...(formData.role === ROLES.STUDENT
        ? {
            level: STUDENT_LEVELS[formData.level],
            subjects: formData.subjects.split(","),
            timePreferences: formData.timePreferences,
          }
        : {
            level: TEACHER_LEVELS[formData.educationLevel],
            subjects: formData.subject.split(","),
            timePreferences: formData.timePreferences,
          }),
    };

    const result = await actions.registerUser(payload);

    if (result.error) {
      alert(`Error: ${result.error}`);
    } else {
      alert("User registered successfully");
    }
  };

  // Esta función maneja las preferencias horarias
  // Lo hice como una función aparte para no repetir dos veces preferencias horarias en el código de abajo.
  // En caso de necesitar agregar más tiempos se modifica el diccionario.
  // Es posible hardcodearlo abajo igual, es una mejora por optimización.
  const renderTimePreferences = () => (
    <div className="row">
      <label htmlFor="timePreferences">Preferencia horaria:</label>
      <div id="timePreferences" className="d-flex justify-content-around">
        {["mañana", "tarde", "noche"].map((time) => (
          <div className="text-center" key={time}>
            <label htmlFor={time.toLowerCase()} className="d-block">
              {time}
            </label>
            <input
              type="checkbox"
              id={time.toLowerCase()}
              name="timePreferences"
              value={time.toLowerCase()}
              onChange={handleCheckboxChange}
            />
          </div>
        ))}
      </div>
    </div>
  );

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
            placeholder="Nombre"
            value={formData.fullName}
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
            <option value="" disabled>
              Selecciona un rol
            </option>
            <option value={ROLES.STUDENT}>Quiero aprender</option>
            <option value={ROLES.TEACHER}>Quiero enseñar</option>
          </select>
        </div>

        {/* Si se elige student se muestran los campos del estudiante */}
        {formData.role === ROLES.STUDENT && (
          <>
            <div className="row">
              <label htmlFor="level">Nivel Académico</label>
              <select
                id="level"
                className="input-field px-3 py-2"
                value={formData.level}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Selecciona tu nivel
                </option>
                {Object.keys(STUDENT_LEVELS).map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>

            <div className="row">
              <label htmlFor="subjects">¿Qué deseas estudiar?</label>
              <input
                type="text"
                id="subjects"
                className="px-3 py-2"
                placeholder="Ingresa una o más asignaturas, separadas por comas"
                value={formData.subjects}
                onChange={handleChange}
              />
            </div>

            {renderTimePreferences()}
          </>
        )}

        {/* Si se elige teacher se muestran los campos del teacher */}
        {formData.role === ROLES.TEACHER && (
          <>
            <div className="row">
              <label htmlFor="subject">Doy clases de</label>
              <input
                type="text"
                id="subject"
                className="px-3 py-2"
                placeholder="Materia que enseñas (separadas por comas)"
                value={formData.subject}
                onChange={handleChange}
                required
              />
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
                {Object.keys(TEACHER_LEVELS).map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>

            {renderTimePreferences()}
          </>
        )}

        <div className="row">
          <button type="submit" className="submit-button">
            Registrarse
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;