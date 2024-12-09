import React from "react";
import '../../styles/teacherView.css';
// import '../../styles/home.css';

function TeacherView() {
    return (
        <div className="view-container">
            <div className="header-teacher">
                <header className="view-header-info">
                    <section className="dashboard-stats">
                        <div className="stat-box">
                            <span className="teacher-name">Juan Pérez</span>
                            <h4>Ing. en sistemas</h4>
                            <img src="https://t4.ftcdn.net/jpg/00/85/77/75/360_F_85777561_m6EMdjM6Knkz7OLJmN5zr5ZeK359S3G5.jpg" className="card-img-top rounded-circle" alt="foto de juan perez" />

                            <section className="calificaciones d-flex mx-3">
                                <span className="teacher-name">Calificación</span>
                                <div class="rating m-2">
                                    <span className="star">★</span>
                                    <span className="star">★</span>
                                    <span className="star">★</span>
                                    <span className="star">★</span>
                                    <span className="star text-secondary">★</span>
                                </div>
                            </section>
                        </div>
                        <div className="stat-box">
                            <span className="teacher-name">Info</span>
                            <p> Soy un apasionado de la ingeniería en sistemas, soy estudiante avanzado
                                de la carrera y quisiera aportar con mis conocimientos a que más chicos y chicas
                                se contagien y puedan avanzar en sus metas</p></div>
                        <div className="stat-box">
                            <span className="teacher-name">Materias</span>
                            <p>
                                <li>Matemática</li>
                                <li>Física</li></p>
                            <span className="teacher-name">Palabras Clave</span>
                            <p>
                                <li>Derivadas</li>
                                <li>Funciones de tercer grado</li></p>
                        </div>

                    </section>
                </header>
            </div>
            <div className= "container-footer">
                <div className="calendar">
                    <span className="teacher-name">Calendario</span>
                    <p>10:00am - matemática Joaquín</p>
                    <div className="calendar-preview">[Calendario Aquí]</div>
                    <button className="btn btn-primary">Agendar</button>
                </div>

                <header className="view-header-coments">
                    <span className="teacher-name">Comentarios</span>

                    <section className="coments">
                        <div className="container-coment">Un genio, me re ayudó</div>
                        <div className="container-coment">Super guay</div>
                        <div className="container-coment">Capo total, lo recomiendo</div>
                        <div className="container-coment">En matemáticas, el mejor</div>
                       
                    </section>
                    
                </header>
            </div>
        </div >
    );
}

export default TeacherView;

