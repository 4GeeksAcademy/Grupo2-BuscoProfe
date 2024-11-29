import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<img src="https://img.freepik.com/vector-premium/capybara-esta-leyendo-al-estilo-dibujos-animados_995281-13314.jpg?w=360" alt="logo" className="my-logo" /> 
				</Link>
				<div className="my-name">
				<h1>Suma Saber</h1>
				</div>
				<div className="ml-auto">
					<Link to="/login">
						<button className="btn btn-primary m-2">Login</button>
					</Link>
					<Link to="/signin">
						<button className="btn btn-secondary">Sign In</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
