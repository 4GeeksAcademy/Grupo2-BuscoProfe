const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			user: null, // Guardar el usuario autenticado
			token: null, // Guardar el token JWT
			subjects: [], // Guardar las materias obtenidas desde el backend
			teacher: {}
		},
		actions: {
			// Ejemplo de una función de cambio de color en el demo
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			// Función para registrar un nuevo usuario
			registerUser: async (formData) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "api/register", {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify(formData)
					});

					const data = await response.json();
					if (response.ok) {
						console.log("User registered successfully", data);
						return data;
					} else {
						console.error("Error registering user:", data.message);
						return { error: data.message };
					}
				} catch (error) {
					console.error("Error while registering user:", error);
					return { error: "An error occurred while registering the user." };
				}
			},

			// Función de login
			login: async (formData) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "api/login", {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify(formData)
					});

					const data = await response.json();

					if (response.ok) {
						console.log("User logged in successfully", data);

						// Guardar el token en localStorage
						localStorage.setItem("IdToken", data.access_token);

						return data;
					} else {
						console.error("Error logging in user:", data.message);
						return { error: data.message };
					}
				} catch (error) {
					console.error("Error while logging in user:", error);
					return { error: "An error occurred while logging in the user." };
				}
			},

			// Función para obtener las materias
			getSubjects: async () => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "api/subjects");
					if (response.ok) {
						const data = await response.json();
						setStore({ subjects: data });
						return data;
					} else {
						console.error("Error fetching subjects:", response.statusText);
					}
				} catch (error) {
					console.error("Error while fetching subjects:", error);
				}
			},

			// Función para obtener los profesores
			getTeachers: async (searchQuery) => {
				try {
					const normalizedQuery = searchQuery.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
					const response = await fetch(process.env.BACKEND_URL + "api/teachers_subjects?search=" + searchQuery);
					if (response.ok) {
						const data = await response.json();
						console.log(data);
						setStore({ teachers: data });
						return true;
					} else {
						console.error("Error fetching teachers:", response.statusText);
						return false;
					}
				} catch (error) {
					console.error("Error while fetching teachers:", error);
					return false;
				}
			},

			// Función para obtener el profesor por ID
			getTeacherById: async (id) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "api/teacher/" + id);
					if (response.ok) {
						const data = await response.json();
						console.log(data);
						setStore({ teacher: data });
						return true;
					} else {
						console.error("Error fetching teacher:", response.statusText);
						return false;
					}
				} catch (error) {
					console.error("Error while fetching teacher:", error);
					return false;
				}
			},


// Función para obtener el profesor por ID
			getTeacherById: async (id) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "api/teacher/" + id);
					if (response.ok) {
						const data = await response.json();
						console.log(data);
						setStore({ teacher: data });
						return true;
					} else {
						console.error("Error fetching teacher:", response.statusText);
						return false;
					}
				} catch (error) {
					console.error("Error while fetching teacher:", error);
					return false;
				}
			},


			// Función para obtener el profesor por ID
			getTeacherId: async (user_id) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "api/" + user_id + "/teacher");
					if (response.ok) {
						const data = await response.json();
						return data;
					} else {
						console.error("Error fetching teacher:", response.statusText);
						return false;
					}
				} catch (error) {
					console.error("Error while fetching teacher:", error);
					return false;
				}
			},


			// Función para actualizar el precio de un profesor
			updateTeacherPrice: async (teacherId, newPrice) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "api/update_price", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							teacher_id: teacherId,
							price: parseFloat(newPrice),
						}),
					});

					if (response.ok) {
						const data = await response.json();
						console.log("Precio actualizado:", data);
						return true;
					} else {
						const errorData = await response.json();
						console.error("Error al actualizar el precio:", errorData.message);
						return false;
					}
				} catch (error) {
					console.error("Error en updateTeacherPrice:", error);
					return false;
				}
			},

			// Función para validar el token JWT
			validateToken: async () => {
				try {
					const token = localStorage.getItem("IdToken");
					if (!token) return false;

					const response = await fetch(process.env.BACKEND_URL + "api/verify_token", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
					});

					if (response.ok) {
						const data = await response.json();

						// Destokenizamos la información (user_id y roles) y la retornamos
						return {
							user_id: data.user_id,
							roles: data.role,
						};
					} else {
						return false;
					}
				} catch (error) {
					console.error("Error validating token:", error);
					return false;
				}
			}
		}
	};
};

export default getState;
