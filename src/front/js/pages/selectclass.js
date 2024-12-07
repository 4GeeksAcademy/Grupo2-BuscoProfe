import React from "react";
import "../../styles/selectclass.css";

// Componente de cada tarjeta de profesor
const TeacherCard = ({ teacher }) => {
    return (
        <div className="teacher-card">
            <img
                src={teacher.image}
                alt={`Foto de ${teacher.name}`}
                className="teacher-image"
            />
            <div className="teacher-info">
                <h3 className="teacher-name">{teacher.name}</h3>
                <p className="teacher-profession">{teacher.profession}</p>
                <p className="teacher-subjects"><strong>Materias:</strong> {teacher.subjects}</p>
                <p className="teacher-rating"><strong>Calificación:</strong> {teacher.rating}</p>
                <p className="teacher-price"><strong>Precio por hora:</strong> {teacher.price}</p>
                <button className="availability-button">Ver disponibilidad</button>
            </div>
        </div>
    );
};

// Componente principal
export const TeacherProfiles = () => {
    const teachers = [
        {
            name: "Juan Pérez",
            profession: "Ingeniero en Sistemas",
            subjects: "Matemáticas, Física",
            rating: "4/5",
            price: "$280/hr",
            image: "https://i.pinimg.com/736x/c7/7c/6b/c77c6b5677ce4f32cb651b32c0c4363c.jpg"
        },
        {
            name: "María Gómez",
            profession: "Profesora de Química",
            subjects: "Química",
            rating: "4/5",
            price: "$180/hr",
            image: "https://i.pinimg.com/736x/04/d6/77/04d6772d245b7ea0e2eb716f5bb48633.jpg"
        },
        {
            name: "Carlos López",
            profession: "Matemático",
            subjects: "Álgebra, Geometría",
            rating: "4/5",
            price: "$215/hr",
            image: "https://i.pinimg.com/736x/16/75/16/1675162a7a066027aa797d6d9c8b3625.jpg"
        },
        {
            name: "Ana Rodríguez",
            profession: "Estudiante avanzada en arte",
            subjects: "Dibujo, Planos",
            rating: "5/5",
            price: "$200/hr",
            image: "https://i.pinimg.com/736x/df/60/ad/df60adbf99846bf79d7ec35acdb37eb1.jpg"
        },
        {
            name: "Juan Pérez",
            profession: "Ingeniero en Sistemas",
            subjects: "Matemáticas, Física",
            rating: "4/5",
            price: "$280/hr",
            image: "https://i.pinimg.com/736x/c7/7c/6b/c77c6b5677ce4f32cb651b32c0c4363c.jpg"
        },
        {
            name: "María Gómez",
            profession: "Profesora de Química",
            subjects: "Química",
            rating: "4/5",
            price: "$180/hr",
            image: "https://i.pinimg.com/736x/04/d6/77/04d6772d245b7ea0e2eb716f5bb48633.jpg"
        },
        {
            name: "Carlos López",
            profession: "Matemático",
            subjects: "Álgebra, Geometría",
            rating: "4/5",
            price: "$215/hr",
            image: "https://i.pinimg.com/736x/16/75/16/1675162a7a066027aa797d6d9c8b3625.jpg"
        },
        {
            name: "Ana Rodríguez",
            profession: "Estudiante avanzada en arte",
            subjects: "Dibujo, Planos",
            rating: "5/5",
            price: "$200/hr",
            image: "https://i.pinimg.com/736x/df/60/ad/df60adbf99846bf79d7ec35acdb37eb1.jpg"
        },
    ];

    return (
        <div className="teacher-profiles-container">
            <h1 className="page-title">Encuentra tu profersor ideal</h1>
            <div className="teacher-grid">
                {teachers.map((teacher, index) => (
                    <TeacherCard key={index} teacher={teacher} />
                ))}
            </div>
        </div>
    );
};

export default TeacherProfiles;