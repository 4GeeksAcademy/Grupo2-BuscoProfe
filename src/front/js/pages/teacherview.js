import React from "react";
import '../../styles/teacherView.css';
import '../../styles/home.css';

function TeacherView() {
    return (
        <div className="view-container">
            {/* Header */}
            <header className="view-header-teacher">
                <span className="teacher-name">Juan Pérez</span>
                <h4>Ing en sistemas</h4>
                <img src="https://t4.ftcdn.net/jpg/00/85/77/75/360_F_85777561_m6EMdjM6Knkz7OLJmN5zr5ZeK359S3G5.jpg" className="card-img-top rounded-circle" alt="foto de juan perez" />
                
                <section className="calificaciones d-flex mx-3">
                <span className="teacher-name">Calificación</span>
                <div class="rating">
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star text-secondary">★</span>
                </div>
            </section>
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

            <header className="view-header">
                <span className="teacher-name">Calificación</span>             
            </header>
            

            <header className="view-header">
                             
            </header>

            <section className="dashboard-stats">              
                <div className="stat-box">Un genio, me re ayudó</div>
                <div className="stat-box">Super guay</div>
                <div className="stat-box">Capo total, lo recomiendo</div>
                <div className="stat-box">En matemáticas, el mejor</div>
                <div className="stat-box">Arreglamos un horario y cumplió sin problema. Responsable y divertido</div>
                <div className="stat-box">Recomiendo 100%, lo volvería a contratar</div>
            </section>

        </div>
    );
}

export default TeacherView;
