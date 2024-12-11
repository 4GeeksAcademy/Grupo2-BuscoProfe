import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useLocation, useNavigate } from "react-router-dom";
import "../../styles/navbar.css";

export const Navbar = () => {
    const location = useLocation();
    const isSignInPage = location.pathname === "/signin";
    const isLoginPage = location.pathname === "/login";

    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const [search, setSearch] = useState("");
    const [searchSuggestions, setSearchSuggestions] = useState([]);
    const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);

    useEffect(() => {
        actions.getSubjects();
    }, []);

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

    const handleSearchSuggestionClick = async (suggestion) => {
        setSearch(suggestion.name);
        setShowSearchSuggestions(false);
        
        // Llamar a searchClass con el valor seleccionado
        await searchClass(suggestion.name);
    };

    const searchClass = async (searchQuery) => {
        let resp = await actions.getTeachers(searchQuery);
        if (resp) {
            navigate("/selectclass");
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <a href="/" className="navbar-logo">
                    SumaSaber
                </a>
                <div className="container-fluid w-50" style={{ position: "relative" }}>
                    <form 
                        className="d-flex" 
                        role="search" 
                        onSubmit={(e) => {
                            e.preventDefault();
                            if (search.trim() !== "") { // Verifica que el campo no esté vacío
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
                        <button
                            className="btn btn-outline-success"
                            type="submit"
                        >
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
                <div className="navbar-links p-1">
                    {!isLoginPage && <a href="/login" className="navbar-link">Iniciar sesión</a>}
                    {!isSignInPage && <a href="/signin" className="navbar-link">Registrarse</a>}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;