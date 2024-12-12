import React, { useEffect, useContext } from "react";
import '../../styles/teacherView.css';
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";
// import '../../styles/home.css';

function TeacherView() {
    const { actions, store } = useContext(Context)
    const { id } = useParams()

    useEffect(() => {
        actions.getTeacherById(id)
    }, [])

    return (
        <div className="view-container">
            <div className="profile-card">
                <div className="profile-pic">
                    <img src={store.teacher.image}
                        className="card-img-top rounded-circle"
                        alt={store.teacher.name}
                        style={{ width: "50%" }}
                    />
                </div>

                <div className="profile-info">
                    <div className="user-info">

                        <h2>{store.teacher.name}</h2>
                        <h4>{store.teacher.level}</h4>
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
                    {/* <div className="row">
                        <div className="icon">
                            <i className="fa fa-phone" />
                        </div>
                        <div className="content">
                            <span>Phone</span>
                            <h5>+123 456 789</h5>
                        </div>
                    </div> */}

                    <div className="row">
                        <div className="icon">
                            <i className="fa fa-envelope-open" />
                        </div>
                        <div className="content">
                            <span>Email</span>
                            <h5>{store.teacher.email}</h5>
                        </div>
                    </div>
                </div>
            </div>

            <div className="about">
                <h1>About Me</h1>
                <p>{store.teacher.description}</p>
                <div>
                    <h4>Especializaciones</h4>
                    {store?.teacher?.subjects?.length > 0 ? (
                        store.teacher.subjects.map((item, index) => (
                            <>
                                <button type="button" key={index} className="btn btn-light">{item.name}</button>
                            </>
                        ))
                    ) : (
                        <p>Sin especializaciones</p>
                    )}
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
                        <p className="card-text">$ {store.teacher.price} x hr. </p>
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