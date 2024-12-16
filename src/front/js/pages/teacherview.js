import React, { useEffect, useContext, useState } from "react";
import '../../styles/teacherView.css';
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";
import RatingModal from '../component/ratingModal';

function TeacherView() {
    const { actions, store } = useContext(Context);
    const { id } = useParams();

    const [price, setPrice] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [newPrice, setNewPrice] = useState("");
    const [newDescription, setNewDescription] = useState(""); // estado para la descripcion
    const [description, setDescription] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false); // Estado para la ventana emergente
    const [averageRating, setAverageRating] = useState(0); // Estado para la calificación promedio
    const [comments, setComments] = useState([]);

    useEffect(() => {
        actions.getTeacherById(id);
        actions.getTeacherReviews(id)
            .then(data => {
                if (data) {
                    setAverageRating(data.average_rating);
                    setComments(data.reviews.map(review => review.comments));
                } else {
                    setAverageRating(0);
                    setComments([]);

                }
            });

    }, [id, actions]);

    useEffect(() => {
        if (store.teacher?.price !== undefined) {
            setPrice(store.teacher.price);
            setNewPrice(store.teacher.price);
        }
    }, [store.teacher.price]);

    useEffect(() => {
        if (store.teacher?.description !== undefined) {
            setDescription(store.teacher.description);
            setNewDescription(store.teacher.description);
        }
    }, [store.teacher.description]);

    const handleSave = () => {
        if (newPrice === "" || isNaN(newPrice) || Number(newPrice) <= 0) {
            alert("Por favor, ingresa un precio válido.");
            return;
        }
        setPrice(newPrice);
        setIsEditing(false);
        actions.updateTeacherPrice(id, newPrice);
    };

    const handleSaveDescription = () => {
        if (newDescription === "") {
            alert("Por favor, ingresa una descripción.");
            return;
        }
        setDescription(newDescription);
        setIsEditing(false);
        actions.updateTeacherDescription(id, newDescription);
    };

    const openRatingModal = () => {
        setIsModalOpen(true);
    };

    const closeRatingModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="view-container" style={{ width: "100%" }}>
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
                    <div className="rating m-2" onClick={openRatingModal}>
                        {[...Array(5)].map((_, index) => {
                            const currentRating = parseFloat(averageRating);

                            return (
                                <span
                                    key={index}
                                    className={index < Math.floor(currentRating) ? "starFilled" : "starEmpty"}
                                >
                                    ★
                                </span>
                            );
                        })}
                    </div>
                </section>



                {/* Ventana emergente de calificación */}
                {isModalOpen && (
                    <RatingModal
                        onClose={closeRatingModal}
                        teacherId={id}
                    />
                )}

                <div className="contact-info">
                    <div className="row">
                        <div className="icon">
                            <i className="fa fa-envelope-open" />
                        </div>
                        <div className="content">
                            <span>Email</span>
                            <h5>{store.teacher.email || "Correo no disponible"}</h5>
                        </div>
                    </div>
                </div>
            </div>

            <div className="about">
                <h1>About me</h1>
                {isEditing ? (
                    <div>
                        <textarea
                            style={{ resize: "none" }}
                            type="text"
                            className="form-control"
                            value={newDescription}
                            onChange={(e) => setNewDescription(e.target.value)}
                        />
                        <button onClick={handleSaveDescription}>Guardar</button>
                        <button onClick={() => setIsEditing(false)}>Cancelar</button>
                    </div>
                ) : (
                    <div>
                        <p className="card-text">{description}</p>
                        {store.user?.typeUser !== "student" ? (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="edit-icon-button"
                            >
                                <i className="fa-solid fa-pen-to-square"></i>
                            </button>
                        ) : null}
                    </div>
                )}
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
                <div>
                    <div className="comments-card">
                        <h3>Comentarios</h3>
                        <div className="comments-list">
                            {comments.length > 0 ? (
                                comments.map((comment, index) => (
                                    <div key={index} className="comment-item">
                                        {comment}
                                    </div>
                                ))
                            ) : (
                                <div className="comment-item">No hay comentarios disponibles</div>
                            )}
                        </div>
                    </div>
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
                            />
                            <button onClick={handleSave}>Guardar</button>
                            <button onClick={() => setIsEditing(false)}>Cancelar</button>
                        </div>
                    ) : (
                        <div>
                            <p className="card-text">$ {price} x hr.</p>
                            {!store.role?.includes("student") && (
                                <button onClick={() => setIsEditing(true)}>Modificar</button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default TeacherView;
