import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";


export const Home = () => {
	const { store, actions } = useContext(Context);

	return <div className="my-container">
		<div className="info">
		<div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
  <div className="carousel-inner">
    <div className="carousel-item active" data-bs-interval="2000">
      <img src="https://img.freepik.com/fotos-premium/longitud-total-estudiantes-universitarios-felices-caminando-juntos-campus_763111-5348.jpg" className="d-block w-50" alt="estudiantes"/>
    </div>
    <div className="carousel-item" data-bs-interval="2000">
      <img src="https://thumbs.dreamstime.com/b/profesores-9707867.jpg" className="d-block w-50" alt="..."/>
    </div>
    <div className="carousel-item"data-bs-interval="2000">
      <img src="https://okdiario.com/img/2023/03/10/chica-notas-min-635x358.jpg" className="d-block w-50" alt="..."/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
		{/* <h5>Info</h5>
		<p>Aquí podrás, como estudiante, encontrar un profe que se adapte a tus necesidades.
			Y como profe, podrás dar clases del tema que te apasiona!
		</p> */}
		</div>
		<div className="my-card">
		<div className="button btn-danger mt-5 w-25"><h5>Soy profe</h5></div>
		<div className="button btn-danger mt-5 w-25"><h5>Soy estudiante</h5></div>
		<div className="button btn-danger mt-5 w-25"><h5>Quienes somos</h5></div>
		</div>
	</div>


};

