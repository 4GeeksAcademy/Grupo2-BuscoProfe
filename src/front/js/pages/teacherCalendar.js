import React, { useState, useMemo } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../../styles/teacherCalendar.css";

import "moment/locale/es";
moment.locale("es");

const localizer = momentLocalizer(moment);

const colors = {
    Fisica: "rgba(255, 153, 51, 0.6)",
    Quimica: "rgba(51, 153, 255, 0.6)",
    Matematica: "rgba(153, 102, 255, 0.6)",
};

const availableDays = [
        { date: "2024-12-19", start: "09:00", end: "15:00" },
        { date: "2024-12-20", start: "10:00", end: "12:00" },
        { date: "2024-12-23", start: "15:00", end: "17:00" },
        { date: "2024-12-26", start: "15:00", end: "18:00" },
        { date: "2024-12-27", start: "13:00", end: "17:00" },
];

const scheduledDates = [
    { student_name: "Jorge Gonzalez", date: "2024-12-16", start: "09:00", end: "10:00", subject: "Fisica" },
    { student_name: "Pedro Martinez", date: "2024-12-16", start: "10:30", end: "11:30", subject: "Quimica" },
    { student_name: "Juan Lopez", date: "2024-12-16", start: "11:30", end: "13:00", subject: "Matematica" },
    { student_name: "Maria Fernandez", date: "2024-12-16", start: "13:00", end: "14:00", subject: "Fisica" },
    { student_name: "Laura Sanchez", date: "2024-12-16", start: "17:00", end: "18:00", subject: "Matematica" },
    { student_name: "Camila Pérez", date: "2024-12-19", start: "08:00", end: "09:00", subject: "Matematica" },
    { student_name: "Carlos Hernandez", date: "2024-12-17", start: "09:30", end: "10:30", subject: "Fisica" },
    { student_name: "Sara Gomez", date: "2024-12-17", start: "14:00", end: "15:00", subject: "Quimica" },
    { student_name: "Pedro Herrera", date: "2024-12-20", start: "12:00", end:" 14:00", subject: "Quimica" },
    { student_name: "Pedro Martinez", date: "2024-12-20", start: "08:00", end:" 09:00", subject: "Fisica" },
    { student_name: "Jorge Gonzalez", date: "2024-12-20", start: "09:00", end:" 10:00", subject: "Fisica" },
];

const CustomToolbar = (toolbar) => {
    const goToBack = () => toolbar.onNavigate("PREV");
    const goToNext = () => toolbar.onNavigate("NEXT");
    const goToToday = () => toolbar.onNavigate("TODAY");

    return (
        <div className="custom-toolbar">
            <div className="toolbar-left">
                <button className="toolbar-button" onClick={goToBack}>&lt;</button>
                <button className="toolbar-button" onClick={goToNext}>&gt;</button>
            </div>
            <div className="toolbar-title">
                <span>{toolbar.label}</span>
            </div>
            <div className="toolbar-right">
                <button
                    className={`toolbar-button ${toolbar.view === "week" ? "active" : ""}`}
                    onClick={() => toolbar.onView("week")}
                >
                    Semana
                </button>
                <button
                    className={`toolbar-button ${toolbar.view === "day" ? "active" : ""}`}
                    onClick={() => toolbar.onView("day")}
                >
                    Día
                </button>
            </div>
        </div>
    );
};

const TeacherCalendar = () => {
    const [view, setView] = useState("week");

    const allEvents = useMemo(() => {
        const scheduledEvents = scheduledDates.map((event) => ({
            title: `${event.subject} - ${event.student_name}`,
            start: moment(`${event.date} ${event.start}`, "YYYY-MM-DD HH:mm").toDate(),
            end: moment(`${event.date} ${event.end}`, "YYYY-MM-DD HH:mm").toDate(),
            color: colors[event.subject],
        }));

        const availableEvents = availableDays.map((day) => ({
            title: "Disponible",
            start: moment(`${day.date} ${day.start}`, "YYYY-MM-DD HH:mm").toDate(),
            end: moment(`${day.date} ${day.end}`, "YYYY-MM-DD HH:mm").toDate(),
            color: "rgba(144, 238, 144, 0.4)",
        }));

        return [...scheduledEvents, ...availableEvents];
    }, []);

    const eventStyleGetter = (event) => ({
        style: {
            backgroundColor: event.color,
            color: "black",
            borderRadius: "5px",
            padding: "4px",
            border: event.color.includes("0.6") ? "1px solid #666" : "1px solid transparent",
        },
    });

    return (
        <div className="teacher-calendar mt-5 pt-5 col-10 col-sm-12">
            <h2 className="calendar-header">Calendario de Clases</h2>
            <div style={{ height: "700px", marginTop: "20px" }}>
                <Calendar
                    localizer={localizer}
                    events={allEvents}
                    startAccessor="start"
                    endAccessor="end"
                    view={view}
                    views={{ week: true, day: true }}
                    onView={setView}
                    eventPropGetter={eventStyleGetter}
                    components={{
                        toolbar: CustomToolbar, // Override the default toolbar
                    }}
                    scrollToTime={new Date(1970, 1, 1, 8)}
                    style={{ height: "100%", fontFamily: "Arial, sans-serif" }}
                />
            </div>
        </div>
    );
};

export default TeacherCalendar;
