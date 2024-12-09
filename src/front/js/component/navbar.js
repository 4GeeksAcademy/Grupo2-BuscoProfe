import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useLocation } from "react-router-dom";
import "../../styles/navbar.css"


export const Navbar = () => {
	const location = useLocation();
	const isSignInPage = location.pathname === "/signin";
	const isLoginPage = location.pathname === "/login";
	const [search, setSearch] = useState("")
	const [allResults, setAllResults] = useState ([])
	
	const {store}= useContext(Context)
	
	const handleChange = (event)=>{
		setSearch(event.target.value)
	}

	return (
		<nav className="navbar">
			<div className="navbar-container">
				<a href="/" className="navbar-logo">SumaSaber</a>
				<div className="container-fluid w-50">
					<form className="d-flex" role="search">
						<input
							className="form-control me-2"
							type="search"
							placeholder="Buscar clases por materia"
							name= "search"
							value= {search}
							onChange={handleChange}
							aria-label="Search"
						/>
						<Link to="/selectclass">
							<button className="btn btn-outline-success" type="submit">
								<i className="fa-solid fa-magnifying-glass"></i>
							</button>
						</Link>
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