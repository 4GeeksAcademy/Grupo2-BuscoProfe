import React, { useState, useCallback, useMemo } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/es";
import "../../styles/studentSchedule.css";
import ClassDetails from "./classDetails"

const localizer = momentLocalizer(moment);

const CustomToolbar = React.memo(({ label, onNavigate, onView }) => (
    <div className="rbc-toolbar d-flex justify-content-between align-items-center mb-3">
        <div>
            <button type="button" className="btn btn-light" onClick={() => onNavigate("PREV")}> &lt; </button>
            <button type="button" className="btn btn-light ms-2" onClick={() => onNavigate("NEXT")}> &gt; </button>
        </div>
        <span className="rbc-toolbar-label">{label}</span>
        <div>
            <button type="button" className="btn btn-light" onClick={() => onView("month")}> Mes </button>
            <button type="button" className="btn btn-light ms-2" onClick={() => onView("day")}> Día </button>
        </div>
    </div>
));

const SchedulingForm = React.memo(({ formData, handleChange, handleSubmit }) => (
    <div className="container col-8 shadow-sm">
        <form onSubmit={handleSubmit} className="p-2 mt-4 border rounded shadow-sm d-flex flex-column">
            <label className="form-label"> Fecha:
                <input type="text" className="form-control" name="date" value={formData.date} readOnly />
            </label>
            <label className="form-label"> Hora Inicio:
                <input type="time" className="form-control" name="start" value={formData.start} onChange={handleChange} required />
            </label>
            <label className="form-label"> Hora Fin:
                <input type="time" className="form-control" name="end" value={formData.end} onChange={handleChange} required />
            </label>
            <label className="form-label"> Materia:
                <input type="text" className="form-control" name="subject" value={formData.subject} onChange={handleChange} required />
            </label>
            <label className="form-label"> Comentarios:
                <textarea name="comments" className="form-control" value={formData.comments} onChange={handleChange} rows={4}></textarea>
            </label>
            <button type="submit" className="btn btn-primary w-100">Agendar</button>
        </form>
    </div>
));

const StudentSchedule = () => {
    const [formData, setFormData] = useState({ date: "", start: "", end: "", subject: "", comments: "" });
    const [isScheduled, setIsScheduled] = useState(false);
    const [view, setView] = useState("month");
    const [selectedDate, setSelectedDate] = useState(null);
    const [label, setLabel] = useState("Selecciona una fecha disponible");
    const [showCalendar, setShowCalendar] = useState(true);

    const availableDays = useMemo(() => [
        { date: "2024-12-19", start: "08:00", end: "15:00" },
        { date: "2024-12-20", start: "10:00", end: "12:00" },
        { date: "2024-12-23", start: "15:00", end: "17:00" },
        { date: "2024-12-26", start: "15:00", end: "18:00" },
        { date: "2024-12-27", start: "13:00", end: "17:00" },
    ], []);

    const allEvents = useMemo(() => availableDays.map((day) => ({
        title: "Disponible",
        start: moment(`${day.date} ${day.start}`).toDate(),
        end: moment(`${day.date} ${day.end}`).toDate(),
    })), [availableDays]);

    const [timeRange, setTimeRange] = useState({ min: moment("00:00", "HH:mm").toDate(), max: moment("23:59", "HH:mm").toDate() });

    const handleSelectSlot = useCallback(({ start }) => {
        const formattedDate = moment(start).format("YYYY-MM-DD");
        const formattedTime = moment(start).format("HH:mm");

        if (view === "month") {
            const dayAvailability = availableDays.find((day) => day.date === formattedDate);
            if (dayAvailability) {
                setFormData((prevState) => ({ ...prevState, date: formattedDate }));
                setSelectedDate(moment(formattedDate).toDate());
                setLabel("Selecciona la hora de comienzo");
                setView("day");
                setTimeRange({
                    min: moment(`${dayAvailability.date} ${dayAvailability.start}`).toDate(),
                    max: moment(`${dayAvailability.date} ${dayAvailability.end}`).toDate(),
                });
            }
        } else if (view === "day") {
            if (!formData.start) {
                setFormData((prevState) => ({ ...prevState, start: formattedTime }));
                setLabel("Selecciona la hora de finalizado");
            } else if (!formData.end) {
                setFormData((prevState) => ({ ...prevState, end: formattedTime }));
                setShowCalendar(false);
                setLabel("");
            }
        }
    }, [view, availableDays, formData]);

    const messages = useMemo(() => ({
        allDay: "Todo el día",
        previous: "<",
        next: ">",
        today: "Hoy",
        month: "Mes",
        week: "Semana",
        day: "Día",
        agenda: "Agenda",
        date: "Fecha",
        time: "Hora",
        event: "Evento",
        noEventsInRange: "No hay eventos en este rango.",
        showMore: (total) => `+ Ver más (${total})`,
    }), []);

    const ScheduledForm = () => (
        <ClassDetails />
        
    );

    return isScheduled ? (
        <ScheduledForm />
    ) : (
        <div className="container pt-5 mt-5 d-flex flex-column align-items-center student-calendar">
            <h2 className="mt-5">Agendar Reunión</h2>
            {showCalendar && (
                <div style={{ marginBottom:'10px', fontWeight:'bold' }}>
                    {label}
                </div>
            )}
            {showCalendar && (
                <Calendar
                    localizer={localizer}
                    events={allEvents}
                    startAccessor="start"
                    endAccessor="end"
                    selectable
                    onSelectSlot={handleSelectSlot}
                    view={view}
                    date={selectedDate || new Date()}
                    onNavigate={(newDate) => setSelectedDate(newDate)}
                    onView={(newView) => setView(newView)}
                    views={{ month:true, day:true }}
                    defaultView="month"
                    style={{ height:"400px", margin:"50px"}}
                    components={{ toolbar : CustomToolbar }}
                    messages={messages}
                    dayPropGetter={(date) => {
                        const isAvailable = availableDays.some((day) => moment(day.date).isSame(date, 'day'));
                        return {
                            style:{
                                backgroundColor:isAvailable ? 'lightgreen' : 'white',
                                cursor:isAvailable ? 'pointer' : 'not-allowed',
                            },
                            onClick:isAvailable ? () => handleSelectSlot({ start : date }) : undefined,
                        };
                    }}
                    min={timeRange.min}
                    max={timeRange.max}
                    eventPropGetter={(event) => ({
                        style:{ backgroundColor:'white' },
                    })}
                />
            )}
            {!isScheduled && !showCalendar && (
                <SchedulingForm
                    formData={formData}
                    handleChange={(e) => {
                        const { name, value } = e.target;
                        setFormData((prevState) => ({ ...prevState, [name]: value }));
                    }}
                    handleSubmit={(e) => {
                        e.preventDefault();
                        setIsScheduled(true);
                    }}
                />
            )}
        </div>
 
    );
    
};

export default StudentSchedule;