import React from "react";
import '../../styles/TeacherDashboard.css';

function TeacherView() {
    return (
        <div className="dashboard-container">
            {/* Header */}
            <header className="dashboard-header">
                <span className="teacher-name">NOMBRE</span>
                <a href="/perfil" className="profile-link">
                    ir al perfil
                </a>
            </header>

            {/* Stats */}
            <section className="dashboard-stats">
                <div className="stat-box">rating</div>
                <div className="stat-box">clases agendadas para la semana</div>
                <div className="stat-box">ver chats(?)</div>
                <div className="stat-box calendar">
                    <h3>calendario</h3>
                    <p>10:00am - matemática Joaquín</p>
                    <div className="calendar-preview">[Calendario Aquí]</div>
                </div>
            </section>


            <section className="calificaciones d-flex mx-3">

                <h3>Calificación</h3>
                <div class="rating">
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star text-secondary">★</span>
                </div>

            </section>
            <section className="comentarios">
                <h3>Comentarios</h3>
                <div className="comentario-box">Un genio, me re ayudó</div>
                <div className="comentario-box">Super guay</div>
                <div className="comentario-box">Capo total, lo recomiendo</div>
            </section>

        </div>
    );
}

export default TeacherView;
