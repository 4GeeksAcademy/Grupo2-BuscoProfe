import React, { useEffect, useContext, useState } from "react";
import '../../styles/teacherView.css';
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";

function TeacherView() {
    const { actions, store } = useContext(Context);
    const { id } = useParams();

    const [price, setPrice] = useState(store.teacher.price); // Estado del precio actual
    const [isEditing, setIsEditing] = useState(false); // Estado para alternar entre vista y edición
    const [newPrice, setNewPrice] = useState(price); // Estado para el nuevo precio

    useEffect(() => {
        actions.getTeacherById(id);
        setPrice(store.teacher.price); // Sincroniza el estado con el precio del store
    }, [id, store.teacher.price]);

    const handleSave = () => {
        setPrice(newPrice); // Guardar el nuevo precio
        setIsEditing(false); // Salir del modo edición
        // Aquí puedes agregar una acción para actualizar el precio en el store o backend
        actions.updateTeacherPrice(id, newPrice);
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            handleSave(); // Guardar al presionar Enter
        }
    };

    return (
        <div className="view-container">
            <div className="profile-card">
                <div className="profile-pic">
                    <img
                        src={store.teacher.image}
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
                    <div className="rating m-2">
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
                            <button
                                type="button"
                                key={index}
                                className="btn btn-light"
                            >
                                {item.name}
                            </button>
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
                    </div>
                </div>

                <div className="price-card">
                    <div className="card-body">
                        <h5 className="card-title">Precio de las Clases</h5>
                        {isEditing ? (
                            <div>
                                <input
                                    type="number"
                                    className="input-field"
                                    value={newPrice}
                                    onChange={(e) => setNewPrice(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                />
                                <button onClick={handleSave}>Save Data</button>
                            </div>
                        ) : (
                            <p
                                className="card-text"
                                onDoubleClick={() => setIsEditing(true)}
                            >
                                $ {price} x hr.
                            </p>
                        )}
                       
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TeacherView;