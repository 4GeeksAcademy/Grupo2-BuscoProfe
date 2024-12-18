import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";
import ProtectedRoute from "./component/protectedRoute"; // Importa el componente de rutas protegidas

import { Home } from "./pages/home";
import Main from "./pages/main.js";
import Login from "./pages/login";
import SignIn from "./pages/signin";
import SearchClass from "./pages/searchclass.js";
import SelectClass from "./pages/selectclass";
import TeacherView from "./pages/teacherview.js";
import StudentDashboard from "./pages/StudentDashboard.js";
import TeacherDashboard from "./pages/TeacherDashboard.js";
import StudentSchedule from "./pages/studentSchedule.js";
import ClassDetails from "./pages/classDetails.js"; 
import Classdetailsteacher from "./pages/classdetailsteacher.js";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { ToastContainer } from "react-toastify";
import injectContext from "./store/appContext";

const Layout = () => {
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL === "") return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        {/* Rutas públicas */}
                        <Route
                            path="/"
                            element={
                                <ProtectedRoute publicRoutes={["/", "/login", "/signin"]}>
                                    <Home />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/login"
                            element={
                                <ProtectedRoute publicRoutes={["/", "/login", "/signin"]}>
                                    <Login />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/signin"
                            element={
                                <ProtectedRoute publicRoutes={["/", "/login", "/signin"]}>
                                    <SignIn />
                                </ProtectedRoute>
                            }
                        />
    
                        {/* Rutas protegidas */}
                        <Route
                            path="/teacherview/:id"
                            element={
                                <ProtectedRoute rolesAllowed={["teacher", "student"]}>
                                    <TeacherView />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/studentDashboard"
                            element={
                                <ProtectedRoute rolesAllowed={["student"]}>
                                    <StudentDashboard />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/teacherDashboard"
                            element={
                                <ProtectedRoute rolesAllowed={["teacher"]}>
                                    <TeacherDashboard />
                                </ProtectedRoute>
                            }
                        />

                        <Route path="/classDetails"
                               element={
                               <ProtectedRoute rolesAllowd={["teacher", "student"]}>
                                <ClassDetails />
                               </ProtectedRoute>
                            }
                        />
    
                        {/* Ruta por defecto */}
                        <Route element={<h1>Not found!</h1>} path="*" />
                        <Route element={<SearchClass />} path="/searchclass" />
                        <Route element={<SelectClass />} path="/selectclass" />
                        <Route element={<StudentSchedule />} path="/studentSchedule" />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
    
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );    
};

export default injectContext(Layout);
