import React, { useContext } from "react";
import "../../styles/selectclass.css";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

// Componente de cada tarjeta de profesor
const TeacherCard = ({ teacher }) => {
    console.log (teacher?.subjects[0].name)
    return (
        <div className="teacher-card">
            <img
                src={teacher.image}
                alt={`Foto de ${teacher.teacher_name}`}
                className="teacher-image"
            />
            <div className="teacher-info">
                <h3 className="teacher-name">{teacher.teacher_name}</h3>
                <p className="teacher-profession">{teacher.profession}</p> 
                <p className="teacher-subjects"><strong>Materias:</strong> {teacher?.subjects[0].name}</p> 
                { /*
                <p className="teacher-rating"><strong>Calificación:</strong> {teacher.rating}</p> */}
                <p className="teacher-price"><strong>Precio por hora: $ </strong> {teacher.price}</p> 
                <Link to= {"/teacherview/"+ teacher.teacher_id}>
                <button className="availability-button">Ver perfil</button>
                </Link>
                
            </div>
        </div>
    );
};

// Componente principal
export const TeacherProfiles = (props) => {
    const { store, actions } = useContext(Context)
    // const teachers = [
    //     {
    //         name: "Juan Pérez",
    //         profession: "Ingeniero en Sistemas",
    //         subjects: "Matemáticas, Física",
    //         rating: "4/5",
    //         price: "$280/hr",
    //         image: "https://i.pinimg.com/736x/c7/7c/6b/c77c6b5677ce4f32cb651b32c0c4363c.jpg"
    //     },
    //     {
    //         name: "María Gómez",
    //         profession: "Profesora de Química",
    //         subjects: "Química",
    //         rating: "4/5",
    //         price: "$180/hr",
    //         image: "https://i.pinimg.com/736x/04/d6/77/04d6772d245b7ea0e2eb716f5bb48633.jpg"
    //     },
    //     {
    //         name: "Carlos López",
    //         profession: "Matemático",
    //         subjects: "Álgebra, Geometría",
    //         rating: "4/5",
    //         price: "$215/hr",
    //         image: "https://i.pinimg.com/736x/16/75/16/1675162a7a066027aa797d6d9c8b3625.jpg"
    //     },
    //     {
    //         name: "Ana Rodríguez",
    //         profession: "Estudiante avanzada en arte",
    //         subjects: "Dibujo, Planos",
    //         rating: "5/5",
    //         price: "$200/hr",
    //         image: "https://i.pinimg.com/736x/df/60/ad/df60adbf99846bf79d7ec35acdb37eb1.jpg"
    //     },
    //     {
    //         name: "Juan Pérez",
    //         profession: "Ingeniero en Sistemas",
    //         subjects: "Matemáticas, Física",
    //         rating: "4/5",
    //         price: "$280/hr",
    //         image: "https://i.pinimg.com/736x/c7/7c/6b/c77c6b5677ce4f32cb651b32c0c4363c.jpg"
    //     },
    //     {
    //         name: "María Gómez",
    //         profession: "Profesora de Química",
    //         subjects: "Química",
    //         rating: "4/5",
    //         price: "$180/hr",
    //         image: "https://i.pinimg.com/736x/04/d6/77/04d6772d245b7ea0e2eb716f5bb48633.jpg"
    //     },
    //     {
    //         name: "Carlos López",
    //         profession: "Matemático",
    //         subjects: "Álgebra, Geometría",
    //         rating: "4/5",
    //         price: "$215/hr",
    //         image: "https://i.pinimg.com/736x/16/75/16/1675162a7a066027aa797d6d9c8b3625.jpg"
    //     },
    //     {
    //         name: "Ana Rodríguez",
    //         profession: "Estudiante avanzada en arte",
    //         subjects: "Dibujo, Planos",
    //         rating: "5/5",
    //         price: "$200/hr",
    //         image: "https://i.pinimg.com/736x/df/60/ad/df60adbf99846bf79d7ec35acdb37eb1.jpg"
    //     },
    // ];

    return (
        <div className="teacher-profiles-container">
            <h1 className="page-title">{props.title? props.title : "Resultado de tu búsqueda"}</h1>
            {store.teachers && store.teachers.length > 0 ? (
                <div className="teacher-grid">
                    {store.teachers.map((teacher, index) => (
                        <TeacherCard key={index} teacher={teacher} />
                    ))}
                </div>
            ) : (
                <p>No existen resultados para la búsqueda</p>
            )}
        </div>
    );
};

export default TeacherProfiles;