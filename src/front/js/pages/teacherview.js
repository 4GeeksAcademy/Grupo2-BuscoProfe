import React, { useEffect, useContext, useState } from "react";
import '../../styles/teacherView.css';
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";
import RatingModal from '../component/ratingModal';
import { toast } from "react-toastify";

function TeacherView() {
    const { actions, store } = useContext(Context);
    const { id } = useParams();
    const [photo, setPhoto] = useState(null);
    const [displayedPhoto, setDisplayedPhoto] = useState(null); // Estado para la foto mostrada
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

    useEffect(() => {
        if (store.teacher?.image) {
            setDisplayedPhoto(store.teacher.image);
        }
    }, [store.teacher.image]);

    const handleSave = () => {
        if (newPrice === "" || isNaN(newPrice) || Number(newPrice) <= 0) {
            toast.info("Por favor, ingresa un precio válido.");
            return;
        }
        setPrice(newPrice);
        setIsEditing(false);
        actions.updateTeacherPrice(id, newPrice);
    };

    const handleSaveDescription = () => {
        if (newDescription === "") {
            toast.info("Por favor, ingresa una descripción.");
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

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setPhoto(file);
            setDisplayedPhoto(URL.createObjectURL(file)); // Mostrar vista previa
        }
    };

    const handlePhoto = async () => {
        if (!photo) return;

        try {
            await actions.updateTeacherPhoto(id, photo); // Subir la foto al servidor
            toast.success("¡Foto subida correctamente!");
            setPhoto(null); // Limpiar la selección
        } catch (error) {
            toast.error("Error al subir la foto. Intenta nuevamente.");
            setDisplayedPhoto(store.teacher.image); // Revertir a la imagen anterior en caso de error
        }
    };

    return (
        <div className="view-container">
            <div className="profile-card">
                <div className="profile-pic">
                    <label htmlFor="file-input" style={{ cursor: store.role?.includes("student") ? "default" : "pointer" }}>
                        <img
                            src={displayedPhoto || store.teacher.image}
                            className="card-img-top rounded-circle"
                            alt={store.teacher.name}
                            style={{ width: "70%", padding: "20px" }}
                        />
                    </label>
                    {!store.role?.includes("student") && (
                        <>
                            <input
                                id="file-input"
                                type="file"
                                style={{ display: "none" }}
                                onChange={handleFileChange}
                            />
                            {photo && (
                                <button className="btn btn-light mt-3" onClick={handlePhoto}>
                                    Subir foto
                                </button>
                            )}
                        </>
                    )}
                </div>


                <div className="profile-info">
                    <div className="user-info">
                        <h2>{store.teacher.name}</h2>
                        <h4>{store.teacher.level}</h4>
                    </div>
                </div>

                <section className="calificaciones">
                    <span className="calificacion-titulo">Calificación</span>
                    <div
                        className="rating m-2"
                        onClick={() => {
                            if (!store.role?.includes("teacher")) {
                                openRatingModal();
                            }
                        }}
                        style={{ cursor: store.role?.includes("teacher") ? "default" : "pointer" }} // Cambia el cursor si es teacher
                    >
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


                {isModalOpen && (
                    <RatingModal
                        onClose={closeRatingModal}
                        teacherId={id}
                    />
                )}

                <div className="contact-info">
                    <div className="row">
                        <div className="contact-title">
                            <h5>Información de contacto</h5>
                        </div>
                        <div className="contact-info">
                            <h2>{store.teacher.email || "Información de contacto no disponible"}</h2>
                        </div>
                    </div>
                </div>

                <div className="agendar" style={{padding: "10px"}}>
                {store.role?.includes("student") && (
                    <button className="modificar-agenda">
                        <a href="../studentSchedule">Agendar con {store.teacher.name} </a>
                    </button>
                )}
                </div>

                <div className="price-card">
                    {isEditing ? (
                        <div>
                            <input
                                type="number"
                                className="input-field"
                                value={newPrice}
                                onChange={(e) => setNewPrice(e.target.value)}
                                placeholder="Agregar precio de clase x hr."
                            />
                            <button onClick={handleSave}>Guardar</button>
                            <button onClick={() => setIsEditing(false)}>Cancelar</button>
                        </div>
                    ) : (
                        <div>
                            <p className="card-text">$ {price} x hr.</p>
                            {!store.role?.includes("student") && (
                                <button onClick={() => setIsEditing(true)}>Modificar precio</button>
                            )}
                        </div>
                    )}

                </div>
            </div>

            <div className="about">
                <h1>Sobre mí</h1>
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
                        {/* Solo los que no son estudiantes pueden ver el botón de editar */}
                        {!store.role?.includes("student") && (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="edit-icon-button"
                            >
                                <i className="fa-solid fa-pen-to-square"></i>
                            </button>
                        )}
                    </div>
                )}
                <div>
                    <h4 className="espe-h4">Especializaciones</h4>
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
        </div>
    );
}

export default TeacherView;
