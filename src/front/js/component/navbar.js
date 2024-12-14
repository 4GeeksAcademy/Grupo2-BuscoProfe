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

    const [search, setSearch] = useState("");
    const [searchSuggestions, setSearchSuggestions] = useState([]);
    const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
    const [role, setRole] = useState(null);
    const [teacherId, setTeacherId] = useState(null);

    // Validar token solo cuando el componente se monta o la página cambia
    useEffect(() => {
        const token = localStorage.getItem("IdToken");

        if (token) {
            validateToken(token);
        }
    }, [location]); // Dependiendo de la ubicación de la página

    // Validar token y establecer el rol
    const validateToken = async (token) => {
        try {
            const tokenValidInfo = await actions.validateToken(token);
            console.log('Token validado:', tokenValidInfo);

            if (tokenValidInfo) {
                const roles = tokenValidInfo.roles;

                if (roles && roles.length > 0) {
                    setRole(roles[0]); // Establecer el primer rol como el rol del usuario
                } else {
                    console.log("No se encontró un rol en la respuesta.");
                    setRole(null); // Si no hay rol, lo dejamos como null
                }
            } else {
                console.log("Token no válido o expirado");
                setRole(null); // Si el token no es válido, establecemos el rol como null
            }
        } catch (error) {
            console.error("Error al validar el token: ", error);
            setRole(null);
        }
    };

    // Función para obtener el teacher id
    const getTeacherId = async (user_id) => {
        try {
            const response = await fetch(process.env.BACKEND_URL + "api/" + user_id + "/teacher");
            if (response.ok) {
                const data = await response.json();
                return data.teacher_id; // Retorna solo el teacher_id
            } else {
                console.error("Error fetching teacher:", response.statusText);
                return null;
            }
        } catch (error) {
            console.error("Error while fetching teacher:", error);
            return null;
        }
    };

    // Función para redirigir según el rol
    const handleLogo = () => {
        if (role === "teacher" && teacherId) {
            navigate(`/teacherview/${teacherId}`);
        } else if (role === "student") {
            navigate("/StudentDashboard");
        } else {
            navigate("/"); // En caso de no estar autenticado
        }
    };

    // Función para manejar cierre de sesión
    const handleLogout = () => {
        localStorage.removeItem("IdToken");
        setRole(null); // Limpiar el rol después del logout
        setTeacherId(null); // Limpiar el teacherId
        navigate("/"); // Redirigir al inicio
    };

    // Manejar cambio en la barra de búsqueda
    const handleChange = (e) => {
        const value = e.target.value;
        setSearch(value);

        if (value.length > 0) {
            const filteredSuggestions = store.subjects.filter(
                (subject) =>
                    subject.name.toLowerCase().includes(value.toLowerCase())
            ).slice(0, 10); // Máximo de 10 sugerencias
            setSearchSuggestions(filteredSuggestions);
            setShowSearchSuggestions(true);
        } else {
            setShowSearchSuggestions(false);
        }
    };

    // Manejar clic en sugerencia de búsqueda
    const handleSearchSuggestionClick = async (suggestion) => {
        setSearch(suggestion.name);
        setShowSearchSuggestions(false);
        await searchClass(suggestion.name);
    };

    // Función de búsqueda de clases
    const searchClass = async (searchQuery) => {
        let resp = await actions.getTeachers(searchQuery);
        if (resp) {
            navigate("/selectclass");
        }
    };

    // Obtener teacherId cuando el componente se monta si el usuario es un profesor
    useEffect(() => {
        if (role === "teacher") {
            const userId = localStorage.getItem("user_id"); // Asegúrate de guardar el ID del usuario en el almacenamiento local
            if (userId) {
                const fetchTeacherId = async () => {
                    const teacherId = await getTeacherId(userId);
                    setTeacherId(teacherId);
                };
                fetchTeacherId();
            }
        }
    }, [role]); // Solo cuando el rol sea "teacher"

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <a href="#" className="navbar-logo" onClick={handleLogo}>
                    SumaSaber
                </a>

                {/* Mostrar enlaces si el usuario tiene un rol válido (profesor o estudiante) */}
                {role ? (
                    <>
                        {role === "teacher" && (
                            <div className="navbar-links">
                                <a
                                    href="#"
                                    className="navbar-link"
                                    onClick={() => navigate(`/teacherview/${teacherId}`)}
                                >
                                    Mi perfil
                                </a>
                                <a href="#" className="navbar-link" onClick={handleLogout}>
                                    Cerrar sesión
                                </a>
                            </div>
                        )}

                        {role === "student" && (
                            <div className="navbar-links">
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
                                                        onClick={() => handleSearchSuggestionClick(suggestion)}
                                                    >
                                                        {suggestion.name}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </form>
                                </div>
                                <a href="#" className="navbar-link" onClick={handleLogout}>
                                    Cerrar sesión
                                </a>
                            </div>
                        )}
                    </>
                ) : (
                    // Mostrar enlaces de registro e inicio de sesión si no hay rol
                    <div className="navbar-links p-1">
                        {!isLoginPage && <a href="/login" className="navbar-link">Iniciar sesión</a>}
                        {!isSignInPage && <a href="/signin" className="navbar-link">Registrarse</a>}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
