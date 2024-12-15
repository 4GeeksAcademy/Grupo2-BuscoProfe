import React, { useContext, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Context } from "../store/appContext";

const ProtectedRoute = ({ children, rolesAllowed, publicRoutes = [] }) => {
  const { store, actions } = useContext(Context);
  const location = useLocation();
  
  // Estado que controla si el token está siendo validado
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const validateAccess = async () => {
      if (!store.isTokenValidated) {
        console.log("Llamamos el validate token desde protectedRoute");
        await actions.validateToken();
      }
      setIsLoading(false);  // Cuando termine la validación, ocultamos el spinner
    };

    validateAccess();
  }, [actions, store.isTokenValidated]);

  // Si la validación está en curso, mostramos el spinner
  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // Salvaguardas: nos aseguramos de que `role` sea un array válido
  const userId = store.user_id;
  const userRole = store.role || []; // Aseguramos que `store.role` sea un array vacío si es `null` o `undefined`

  // Redirección desde rutas públicas a dashboards
  if (userId && publicRoutes.includes(location.pathname)) {
    if (userRole.includes("teacher")) {
      return <Navigate to="/teacherDashboard" replace />;
    }
    if (userRole.includes("student")) {
      return <Navigate to="/studentDashboard" replace />;
    }
  }

  // Redirección desde rutas protegidas al login
  if (!userId && !publicRoutes.includes(location.pathname)) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Validación de roles permitidos
  if (rolesAllowed && !rolesAllowed.some((role) => userRole.includes(role))) {
    return <Navigate to="/" replace />;
  }

  // Renderizamos la ruta si todas las validaciones se cumplen
  return children;
};

export default ProtectedRoute;
