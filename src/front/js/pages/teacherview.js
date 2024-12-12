import React from "react";
import '../../styles/teacherView.css';
// import '../../styles/home.css';

function TeacherView() {
    return (
        <div className="view-container">
            <div className="profile-card">
                <div className="profile-pic">
                    <img src="https://t4.ftcdn.net/jpg/00/85/77/75/360_F_85777561_m6EMdjM6Knkz7OLJmN5zr5ZeK359S3G5.jpg" className="card-img-top rounded-circle" alt="foto de juan perez" />
                </div>

                <div className="profile-info">
                    <div className="user-info">
                        <h2>Samuel Carmona</h2>
                        <h4>Ingeniero en Sistemas</h4>
                    </div>
                </div>

                <section className="calificaciones">
                    <span className="teacher-name">Calificación</span>
                    <div class="rating m-2">
                        <span className="star">★</span>
                        <span className="star">★</span>
                        <span className="star">★</span>
                        <span className="star">★</span>
                        <span className="star text-secondary">★</span>
                    </div>
                </section>

                <div className="contact-info">
                    <div className="row">
                        <div className="icon">
                            <i className="fa fa-phone" />
                        </div>
                        <div className="content">
                            <span>Phone</span>
                            <h5>+123 456 789</h5>
                        </div>
                    </div>

                    <div className="row">
                        <div className="icon">
                            <i className="fa fa-envelope-open" />
                        </div>
                        <div className="content">
                            <span>Email</span>
                            <h5>Samuelamaellol@gmail.com</h5>
                        </div>
                    </div>
                </div>
            </div>


            <div className="about">
                <h1>About Me</h1>
                <p>
                    Soy un estudiante de la facultad de ingenieria actualmente cursando la carrera de Ingeniero en Sistemas
                    y mi objetivo es poder ayudar a otros estudiantes con mi conocimiento.
                </p>
                <div>
                    <h4>Especializaciones</h4>
                    <button type="button" class="btn btn-light">Integrales</button>
                    <button type="button" class="btn btn-light">Programacion 2</button>
                    <button type="button" class="btn btn-light">Conjunto y Ecuaciones</button>
                </div>

            </div>

            <div>
                <div className="comments-card">
                    <h3>Comentarios</h3>
                    <div className="comments-list">
                        <div className="comment-item">Muy buen profe 😀</div>
                        <div className="comment-item">Un capo</div>
                        <div className="comment-item">No me gusta cuando canta👌</div>
                        <div className="comment-item">Excelente</div>
                        <div className="comment-item">Muy útil, gracias.🤩</div>
                        <div className="comment-item">✅</div>
                        <div className="comment-item">Muy buen profe 😀</div>
                        <div className="comment-item">Un capo</div>
                        <div className="comment-item">No me gusta cuando canta👌</div>
                        <div className="comment-item">Excelente</div>
                        <div className="comment-item">Muy útil, gracias.🤩</div>
                        <div className="comment-item">✅</div>
                    </div>
                </div>
                <div className="price-card">
                    <div className="card-body">
                        <h5 className="card-title">Precio de las Clases</h5>
                        <p className="card-text">

                            Info
                        </p>
                        <div>
                            <a href="https://calendly.com/jparatge/15min" target="_blank">
                                <button>Book a Meeting</button>
                            </a>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default TeacherView;