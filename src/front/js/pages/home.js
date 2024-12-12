import React, { useContext } from "react";
import { Context } from "../store/appContext";
import Hero from "../component/hero";
import "../../styles/home.css";
import { Link } from 'react-router-dom';

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="home-container">

			<Hero />

			{/* sobre nosotros */}

			<section className="about-us">
				<h2 className="sobre-nosotros">Sobre Nosotros</h2>
				<div className="about-us-cards">
					<div className="card">
						<div className="card-body">
							<h5 className="card-title">¿Eres profesor o quieres serlo?</h5>
							<Link to="/teacherSignin">
								<p className="card-text">
									Crea tu perfil, comparte lo que sabes y enseña desde cualquier lugar. Gana dinero a tu ritmo con flexibilidad y herramientas para gestionar tus clases. Viví de lo que te apasiona.
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
				<h2>Preguntas frecuentes</h2>
				<div class="accordion accordion-flush" id="accordionFlushExample">
					<div class="accordion-item">
						<h2 class="accordion-header">
							<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
								¿Cómo puedo registrarme como estudiante o profesor?
							</button>
						</h2>
						<div id="flush-collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
							<div class="accordion-body">
							En la parte superior derecha de esta página, encontrarás el botón 'Registrarse'. 
							Al hacer clic, podrás elegir registrarte como estudiante o profesor, y a partir de ahí, tendrás acceso a más opciones. 
							Si eliges registrarte como profesor, se te mostrarán los planes disponibles para publicar tu perfil.
							</div>
						</div>
					</div>
					<div class="accordion-item">
						<h2 class="accordion-header">
							<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
								¿Qué métodos de pago aceptan?
							</button>
						</h2>
						<div id="flush-collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
							<div class="accordion-body">El pago de las clases y el método para realizarlo se coordinan directamente con tu profesor. 
								Si eres profesor y deseas pagar un plan para publicar tu perfil y tus clases, puedes hacerlo a través de Mercado Pago.
							</div>
						</div>
					</div>
					<div class="accordion-item">
						<h2 class="accordion-header">
							<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
								¿Cómo programo mis clases?
							</button>
						</h2>
						<div id="flush-collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
							<div class="accordion-body">En la barra de buscador, puedes buscar la materia que estás necesitando estudiar,
								allí verás un listado de profesores que pueden ayudarte con esa asignatura. 
								Tú eliges al que prefieras, y dentro de su perfil podrás coordinar y agendar una clase.
							</div>
						</div>
					</div>
					<div class="accordion-item">
						<h2 class="accordion-header">
							<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseThree">
								¿Mi suscripción como profe tiene un costo?
							</button>
						</h2>
						<div id="flush-collapseFour" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
							<div class="accordion-body">Contamos con varios planes diseñados para adaptarse a tus necesidades: 
								mensuales, semestrales y anuales, asegurando tu visibilidad en nuestro portal.  
								Para más información, no dudes en comunicarte con nosotros haciendo <a href="mailto:info@sumasaber.com "target="_blank">click aquí</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

