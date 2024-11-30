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
			<div className="hero-image">
			  <img src="https://files.oaiusercontent.com/file-WYbXVk5tAHCD6KuBBhwTLJ?se=2024-11-30T16%3A55%3A19Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D299%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3Ddescarga%2520%25281%2529-fotor-bg-remover-20241130134921.png&sig=Olzw/6z2VPaSFwbs/A/oSjL6P7PSaaSAOhXIuLEkh9U%3D" alt="Hero Illustration" />
			</div>
		  </section>
	
		  {/* About Us Section */}
		  <section className="about-us">
			<h2>Sobre Nosotros</h2>
			<div className="about-us-cards">
			  <div className="card">
				<p>Conecta con la creatividad para enseñar y aprender.</p>
			  </div>
			  <div className="card">
				<p>Clases diseñadas para adaptarse a tus metas.</p>
			  </div>
			  <div className="card">
				<p>Aprende y crece al ritmo que tú elijas.</p>
			  </div>
			</div>
		  </section>
		</div>
	  );
	};

