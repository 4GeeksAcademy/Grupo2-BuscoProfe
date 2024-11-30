import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";


export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="home-container">
			<section className="hero">
				<div className="hero-content">
					<h1>Suma Saber!</h1>
					<p>
						Encuentra profesores que se adapten a tus necesidades y, como profesor,
						comparte tus conocimientos con el mundo.
					</p>
				</div>
			</section>

			{/* About Us Section */}
			<section className="about-us">
				<h2>Sobre Nosotros</h2>
				<div className="about-us-cards">
					<div className="card">
						<h3>¿Eres profesor o quieres serlo?</h3>
						<p>Conecta con la creatividad para enseñar y aprender.</p>
					</div>
					<div className="card">
						<h3>Encuentra al profesor ideal para ti</h3>
						<p>Clases diseñadas para adaptarse a tus metas.</p>
					</div>
					<div className="card">
						<h3>Nuestra plataforma</h3>
						<p>Aprende y crece al ritmo que tú elijas.</p>
					</div>
				</div>
			</section>
		</div>
	);
};

