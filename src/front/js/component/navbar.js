import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useLocation, useNavigate } from "react-router-dom";
import "../../styles/navbar.css";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const location = useLocation();

  const isSignInPage = location.pathname === "/signin";
  const isLoginPage = location.pathname === "/login";
  const isTeacherViewPage = location.pathname.startsWith("/teacherview/");
  const isStudentDashboardPage = location.pathname === "/studentDashboard";

  const [search, setSearch] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);

  useEffect(() => {
    if (!store.subjects.length) {
      actions.getSubjects(); // Obtener materias si aún no están cargadas
    }
  }, [store.subjects, actions]);

  const handleLogo = () => {
    if (store.role?.includes("teacher")) {
      navigate("/teacherDashboard");
    } else if (store.role?.includes("student")) {
      navigate("/studentDashboard");
    } else {
      navigate("/");
    }
  };

  const handleLogout = () => {
    actions.logout();
    navigate("/");
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (value.length > 0) {
      const filteredSuggestions = store.subjects
        .filter((subject) =>
          subject.name.toLowerCase().includes(value.toLowerCase())
        )
        .slice(0, 10); // Máximo de 10 sugerencias
      setSearchSuggestions(filteredSuggestions);
      setShowSearchSuggestions(true);
    } else {
      setShowSearchSuggestions(false);
    }
  };

  const handleSearchSuggestionClick = async (suggestion) => {
    setSearch(suggestion.name);
    setShowSearchSuggestions(false);
    await searchClass(suggestion.name);
  };

  const searchClass = async (searchQuery) => {
    let resp = await actions.getTeachers(searchQuery);
    if (resp) {
      navigate("/selectclass");
    }
  };

  const handleDashboardRedirect = () => {
    if (store.role?.includes("teacher")) {
      navigate("/teacherDashboard");
    } else if (store.role?.includes("student")) {
      navigate("/studentDashboard");
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <a href="#" className="navbar-logo" onClick={handleLogo}>
          SumaSaber
        </a>

        {/* Barra de búsqueda (visible para estudiantes y usuarios no autenticados) */}
        {(!localStorage.getItem("IdToken") || store.role?.includes("student")) && (
          <div className="container-fluid w-50" style={{ position: "relative" }}>
            <form
              className="d-flex"
              role="search"
              onSubmit={(e) => {
                e.preventDefault();
                if (search.trim() !== "") {
                  searchClass(search);
                }
              }}
            >
              <input
                className="form-control me-2"
                type="search"
                placeholder="Buscar clases por materia"
                name="search"
                value={search}
                onChange={handleChange}
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>

              {showSearchSuggestions && (
                <ul className="list-group suggestions-list">
                  {searchSuggestions.map((suggestion) => (
                    <li
                      key={suggestion.id}
                      className="list-group-item"
                      onClick={() =>
                        handleSearchSuggestionClick(suggestion)
                      }
                    >
                      {suggestion.name}
                    </li>
                  ))}
                </ul>
              )}
            </form>
          </div>
        )}

        {/* Links dependiendo del estado de autenticación */}
        {store.user_id ? (
          <>
            {store.role?.includes("teacher") && (
              <div className="navbar-links">
                {isTeacherViewPage ? (
                  <a
                    href="#"
                    className="navbar-link"
                    onClick={handleDashboardRedirect}
                  >
                    Dashboard
                  </a>
                ) : (
                  <a
                    href="#"
                    className="navbar-link"
                    onClick={() => navigate(`/teacherview/${store.teacher_id}`)}
                  >
                    Mi perfil
                  </a>
                )}
                <a href="#" className="navbar-link" onClick={handleLogout}>
                  Cerrar sesión
                </a>
              </div>
            )}

            {store.role?.includes("student") && (
              <div className="navbar-links">
                {!isStudentDashboardPage && (
                  <a
                    href="#"
                    className="navbar-link"
                    onClick={handleDashboardRedirect}
                  >
                    Dashboard
                  </a>
                )}
                <a href="#" className="navbar-link" onClick={handleLogout}>
                  Cerrar sesión
                </a>
              </div>
            )}
          </>
        ) : (
          <div className="navbar-links p-1">
            {!isLoginPage && (
              <a href="/login" className="navbar-link">
                Iniciar sesión
              </a>
            )}
            {!isSignInPage && (
              <a href="/signin" className="navbar-link">
                Registrarse
              </a>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
