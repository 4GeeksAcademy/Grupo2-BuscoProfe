import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../../styles/studentSchedule.css';

const localizer = momentLocalizer(moment);

const StudentSchedule = () => {
    const [formData, setFormData] = useState({
        date: '',
        time: '',
        subject: '',
        comments: '',
    });

    const [isScheduled, setIsScheduled] = useState(false);
    const [view, setView] = useState('month');
    const [selectedDate, setSelectedDate] = useState(null);
    const [showCalendar, setShowCalendar] = useState(true);

    const events = [
        {
            start: new Date(2024, 11, 2, 10, 0),
            end: new Date(2024, 11, 5, 18, 0),
        },
        {
            start: new Date(2024, 11, 10, 10, 0),
            end: new Date(2024, 11, 13, 18, 0),
        },
    ];

    const handleSelectSlot = ({ start }) => {
        if (view === 'month') {
            const date = moment(start).format('YYYY-MM-DD');
            setSelectedDate(start);
            setFormData({ ...formData, date });
            setView('day');
        } else if (view === 'day') {
            const time = moment(start).format('HH:mm');
            setFormData({ ...formData, time });
            setShowCalendar(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        setIsScheduled(true);
    };

    const ScheduledForm = () => (
        <div className="col-md-6 mt-5 pt-5">
            <div className="p-4 border rounded shadow-sm">
                <h4 className="text-success">Reunión solicitada</h4>
                <p><strong>Fecha:</strong> {formData.date}</p>
                <p><strong>Hora:</strong> {formData.time}</p>
                <p><strong>Materia:</strong> {formData.subject}</p>
                <p><strong>Comentarios:</strong> {formData.comments}</p>
            </div>
        </div>
    );

    const SchedulingForm = () => (
        <div className="container pt-5 mt-5 d-flex flex-column align-items-center">
            <h2>Agendar Reunión</h2>
            <div className="container ms-5 mt-4">
                <div className="d-flex align-items-center">
                    <span className="reference"></span>
                    <label>Fechas disponibles</label>
                </div>
            </div>
            {showCalendar && (
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    selectable
                    onSelectSlot={handleSelectSlot}
                    view={view}
                    date={selectedDate || new Date()}
                    onNavigate={(newDate) => setSelectedDate(newDate)}
                    onView={(newView) => setView(newView)} // Capture the view change
                    views={{ month: true, day: true }}
                    defaultView="month"
                    style={{ height: 400, margin: "50px" }}
                    eventPropGetter={(event) => ({
                        style: {
                            backgroundColor: 'lightgreen', // Apply green background for events
                            height: '100%',
                            border: 'none',
                        },
                    })}
                    dayPropGetter={(date) => {
                        // In the 'month' view, highlight the date label if it has an event
                        if (view === 'month') {
                            const eventForDay = events.find(event => {
                                const eventStartDate = moment(event.start).format('YYYY-MM-DD');
                                const eventEndDate = moment(event.end).format('YYYY-MM-DD');
                                const currentDate = moment(date).format('YYYY-MM-DD');
                                return currentDate >= eventStartDate && currentDate <= eventEndDate;
                            });
                            if (eventForDay) {
                                return {
                                    className: 'highlighted-date', // Custom class to highlight the date label
                                };
                            }
                        }

                        return {}; // Default style with no background
                    }}
                />
            )}
            <div className="container col-8 shadow-sm">
                <form onSubmit={handleSubmit} className="p-2 mt-4 border rounded shadow-sm d-flex flex-column">
                    <label className="form-label">
                        Fecha:
                        <input
                            type="text"
                            className="form-control"
                            name="date"
                            value={formData.date}
                            readOnly
                        />
                    </label>
                    <label className="form-label">
                        Hora:
                        <input
                            type="time"
                            className="form-control"
                            name="time"
                            value={formData.time}
                            readOnly
                        />
                    </label>
                    <label className="form-label">
                        Materia:
                        <input
                            type="text"
                            className="form-control"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label className="form-label">
                        Comentarios:
                        <textarea
                            name="comments"
                            className="form-control"
                            value={formData.comments}
                            onChange={handleChange}
                        ></textarea>
                    </label>
                    <button type="submit" className="btn btn-primary w-100">Agendar</button>
                </form>
            </div>
        </div>
    );

    return isScheduled ? <ScheduledForm /> : <SchedulingForm />;
};

export default StudentSchedule;