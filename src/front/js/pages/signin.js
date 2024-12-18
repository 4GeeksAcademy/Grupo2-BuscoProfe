import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ROLES = {
  STUDENT: "student",
  TEACHER: "teacher",
};

const STUDENT_LEVELS = {
  Bachillerato: "StudentLevel_Bachillerato",
  Universitario: "StudentLevel_Universitario",
};

const TEACHER_LEVELS = {
  "Técnico terciario": "TeacherLevel_TecnicoTerciario",
  Licenciatura: "TeacherLevel_Licenciatura",
  Maestría: "TeacherLevel_Maestria",
  Doctorado: "TeacherLevel_Doctorado",
};

const SignIn = () => {
  const { store, actions } = useContext(Context);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "",
    level: "",
    subjects: "",
    timePreferences: [],
    subject: "",
    educationLevel: "",
  });

  const [subjectSuggestions, setSubjectSuggestions] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

  // Llama a getSubjects al montar el componente
  useEffect(() => {
    if (store.subjects.length === 0) {
      actions.getSubjects(); // Llama a la función para obtener las materias
    }
  }, [actions, store.subjects]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevState) => {
      const { timePreferences } = prevState;
      if (checked) {
        return { ...prevState, timePreferences: [...timePreferences, value] };
      } else {
        return {
          ...prevState,
          timePreferences: timePreferences.filter((time) => time !== value),
        };
      }
    });
  };

  const handleSubjectChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, subject: value });

    if (value.length > 0) {
      const filteredSuggestions = store.subjects
        .filter(
          (subject) =>
            subject.name.toLowerCase().includes(value.toLowerCase()) &&
            !selectedSubjects.some((selected) => selected.id === subject.id)
        )
        .slice(0, 10); // Máximo de 10 sugerencias
      setSubjectSuggestions(filteredSuggestions);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    if (!selectedSubjects.some((subject) => subject.id === suggestion.id)) {
      setSelectedSubjects([...selectedSubjects, suggestion]);
    }
    setFormData({ ...formData, subject: "" });
    setShowSuggestions(false);
  };

  const handleRemoveSubject = (id) => {
    setSelectedSubjects(selectedSubjects.filter((subject) => subject.id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.role === ROLES.TEACHER && selectedSubjects.length === 0) {
      toast.info("Por favor, selecciona al menos una materia que das.");
      return;
    }

    const payload = {
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password,
      role: formData.role,
      ...(formData.role === ROLES.STUDENT
        ? {
            level: STUDENT_LEVELS[formData.level],
            subjects: selectedSubjects.map((sub) => sub.id),
            timePreferences: formData.timePreferences,
          }
        : {
            level: TEACHER_LEVELS[formData.educationLevel],
            subjects: selectedSubjects.map((sub) => sub.id),
            timePreferences: formData.timePreferences,
          }),
    };

    const result = await actions.registerUser(payload);

    if (result.error) {
      toast.error(`Error: ${result.error}`);

    } else {
      toast.success("Usuario registrado con éxito");
      navigate("/login");
    }
  };

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

            <div className="row" style={{ position: "relative" }}>
              <label htmlFor="subject">¿De qué materias quisieras recibir clases?</label>
              <input
                type="text"
                id="subject"
                className="form-control"
                value={formData.subject}
                onChange={handleSubjectChange}
                placeholder="Materias"
              />
              {showSuggestions && (
                <ul className="list-group suggestions-list">
                  {subjectSuggestions.map((suggestion) => (
                    <li
                      key={suggestion.id}
                      className="list-group-item"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="row">
              <div className="selected-subjects">
                {selectedSubjects.map((subject) => (
                  <span key={subject.id} className="chip">
                    {subject.name}
                    <button
                      type="button"
                      className="close"
                      onClick={() => handleRemoveSubject(subject.id)}
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {renderTimePreferences()}
          </>
        )}

        {formData.role === ROLES.TEACHER && (
          <>
            <div className="row" style={{ position: "relative" }}>
              <label htmlFor="subject">Doy clases de</label>
              <input
                type="text"
                id="subject"
                className="form-control"
                value={formData.subject}
                onChange={handleSubjectChange}
                placeholder="Materia que enseñas"
              />
              {showSuggestions && (
                <ul className="list-group suggestions-list">
                  {subjectSuggestions.map((suggestion) => (
                    <li
                      key={suggestion.id}
                      className="list-group-item"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="row">
              <div className="selected-subjects">
                {selectedSubjects.map((subject) => (
                  <span key={subject.id} className="chip">
                    {subject.name}
                    <button
                      type="button"
                      className="close"
                      onClick={() => handleRemoveSubject(subject.id)}
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="row">
              <label htmlFor="educationLevel">Nivel educativo</label>
              <select
                id="educationLevel"
                className="form-control input-field px-3 py-2"
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
        <p></p>
        <p>Si ya tienes una cuenta <a href="../login">inicia sesión</a></p>
      </form>
    </div>
  );
};

export default SignIn;
