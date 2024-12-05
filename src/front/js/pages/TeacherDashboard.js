import React from "react";
import '../../styles/TeacherDashboard.css';

function TeacherDashboard() {
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

      {/* Classes */}
      <section className="dashboard-classes">
        <h2>Mis clases</h2>
        <div className="class-box">Clase 1</div>
        <div className="class-box">Clase 2</div>
        <div className="class-box">Clase 3</div>
      </section>
    </div>
  );
}

export default TeacherDashboard;
