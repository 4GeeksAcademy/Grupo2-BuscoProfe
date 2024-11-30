import React from "react";
import { Link } from "react-router-dom";
import "../../styles/navbar.css"

export const Navbar = () => {
	return (
			<nav className="navbar">
			  <div className="navbar-container">
				<a href="/" className="navbar-logo">SumaSaber</a>
				<div className="navbar-links p-1">
				  <a href="/login" className="navbar-link">Iniciar sesión</a>
				  <a href="/signin" className="navbar-link">Registrarse</a>
				</div>
			  </div>
			</nav>
		  );
		};
		
export default Navbar;