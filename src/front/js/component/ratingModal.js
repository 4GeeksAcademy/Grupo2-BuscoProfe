import React, { useState, useContext } from 'react';
import { Context } from "../store/appContext";
import '../../styles/ratingTeacher.css';

function RatingModal({ onClose, teacherId }) {
    const { store, actions } = useContext(Context);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (rating === 0) {
            alert("Por favor, selecciona una calificación.");
            return;
        }

        setLoading(true);
        try {
            const reviewData = {
                teacher_id: teacherId,
                rating: rating,
                comments: comment,
                student_id: store.student_id,
            };

            // Llamar a la acción del flujo (flux) para manejar el envío de la calificación
            const result = await actions.addReview(reviewData);

            if (result) {
                alert("¡Calificación registrada exitosamente!");
                onClose(); // Cerrar el modal después de guardar
            } else {
                alert("Hubo un error al registrar tu calificación. Por favor, intenta nuevamente.");
            }
        } catch (error) {
            console.error("Error al guardar la calificación:", error);
            alert("Hubo un error al registrar tu calificación. Por favor, intenta nuevamente.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content rating-teacher-card">
                <div className="rating-teacher-header">Califica a tu Profesor</div>
                <div className="rating-teacher-content">
                    <div className="rating-stars">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span
                                key={star}
                                className={`starRating ${star <= rating ? "selected" : ""}`}
                                onClick={() => setRating(star)}
                            >
                                ★
                            </span>
                        ))}
                    </div>
                    <div className="rating-teacher-score">{rating}</div>
                </div>
                <textarea
                    placeholder="Deja un comentario"
                    value={comment}
                    onChange={(e) => {
                        if (e.target.value.length <= 50) {
                            setComment(e.target.value);
                        }
                    }}
                    rows="3"
                    cols="25"
                    className="rating-teacher-comments form-control"
                />
                <div className="rating-teacher-footer">
                    <div className="button-container">
                        <button onClick={handleSubmit} disabled={loading} className="submit-button">
                            {loading ? "Enviando..." : "Enviar"}
                        </button>
                        <button onClick={onClose} className="close-button">Cerrar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RatingModal;
