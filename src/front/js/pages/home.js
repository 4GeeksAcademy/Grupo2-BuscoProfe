import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link } from 'react-router-dom';

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

			{/* sobre nosotros */}

			<section className="about-us">
				<h2>Sobre Nosotros</h2>
				<div className="about-us-cards">
					<div className="card">
						<div className="card-body">
							<h5 className="card-title">¿Eres profesor o quieres serlo?</h5>
							<Link to="/teacherSignin">
							<p className="card-text">
								Crea tu perfil, comparte lo que sabes y enseña desde cualquier lugar. Gana dinero a tu ritmo con flexibilidad y herramientas para gestionar tus clases.
							</p></Link>
						</div>
					</div>
					<div className="card">
						<div className="card-body">
							<h5 className="card-title">Encuentra al profesor ideal para ti</h5>
							
							<Link to="/studentSignin"><p className="card-text">
								Descubre profesores especializados y clases personalizadas a tu ritmo. Accede a contenido exclusivo, tutorías y recomendaciones para avanzar rápido.
								¡Todo lo que necesitas para aprender de manera fácil y divertida!
							</p></Link>
						</div>
					</div>
					<div className="card">
						<div className="card-body">
							<h5 className="card-title">Nuestra plataforma</h5>
							<p className="card-text">
								SumaSaber permite a estudiantes avanzados ganar ingresos mientras ayudan a otros a alcanzar sus metas. Conectamos a estudiantes y profesores de forma fácil y segura, brindando oportunidades para enseñar desde cualquier lugar y continuar creciendo, todo 100% online.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* ¿Tienes dudas? */}

			<div className="fqs mt-4">
				<h2>¿Tienes dudas?</h2>
				<div class="accordion accordion-flush" id="accordionFlushExample">
					<div class="accordion-item">
						<h2 class="accordion-header">
							<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
								¿Cómo puedo registrarme como estudiante o profesor?
							</button>
						</h2>
						<div id="flush-collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
							<div class="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the first item's accordion body.</div>
						</div>
					</div>
					<div class="accordion-item">
						<h2 class="accordion-header">
							<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
								¿Qué métodos de pago aceptan?
							</button>
						</h2>
						<div id="flush-collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
							<div class="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the second item's accordion body. Let's imagine this being filled with some actual content.</div>
						</div>
					</div>
					<div class="accordion-item">
						<h2 class="accordion-header">
							<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
								¿Cómo programo mis clases?
							</button>
						</h2>
						<div id="flush-collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
							<div class="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the third item's accordion body. Nothing more exciting happening here in terms of content, but just filling up the space to make it look, at least at first glance, a bit more representative of how this would look in a real-world application.</div>
						</div>
					</div>
		
				</div>
			</div>
		</div>
	);
};

