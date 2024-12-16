const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			user_id: null, // Guardar el usuario autenticado
			token: null, // Guardar el token JWT
			role: null,
			subjects: [], // Guardar las materias obtenidas desde el backend
			teacher_id: null,
			student_id: null,
			teacher: {},
			teachers: []
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
						// console.log("User logged in successfully", data);

						// Guardar el token en localStorage
						localStorage.setItem("IdToken", data.access_token);
						setStore({user:data.user})

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

			logout: () => {
                localStorage.removeItem("IdToken");
                setStore({ user_id: null, token: null, role: null, subjects: [], teacher_id:null, student_id:null, isTokenValidated: false });
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

			addReview: async (reviewData) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "api/review", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							teacher_id: reviewData.teacher_id,
							rating: reviewData.rating,
							comments: reviewData.comments,
							student_id: reviewData.student_id,
						}),
					});
			
					if (response.ok) {
						const data = await response.json();
						console.log("Comentario registrado:", data);
						return true;
					} else {
						const errorData = await response.json();
						console.error("Error al registrar el comentario:", errorData.message);
						return false;
					}
				} catch (error) {
					console.error("Error en addReview:", error);
					return false;
				}
			},

			getTeacherReviews : async (teacherId) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + `api/teacher/${teacherId}/reviews`, {
						method: "GET",
						headers: {
							"Content-Type": "application/json",
						},
					});
			
					if (response.ok) {
						const data = await response.json();
			
						return data
					} else {
						const errorData = await response.json();
						console.error("Error al obtener las reseñas:", errorData.message);
						return 0;  // Retornar 0 si hay error
					}
				} catch (error) {
					console.error("Error en getTeacherReviews:", error);
					return 0;  // Retornar 0 si hay un error inesperado
				}
			},
			
			validateToken: async () => {

				
				const store = getStore();
				// console.log("En validate token el store es:", JSON.stringify(store, null, 2));
				const actions = getActions();
			
				// Si ya se validó el token, retorna el usuario almacenado
				if (store.isTokenValidated && store.user_id) {
					// console.log("[VALIDATE TOKEN] Token ya validado.");
					return store.user_id;
				}

				try {
					const token = localStorage.getItem("IdToken");

					// console.log("[VALIDATE TOKEN] Obtenemos el token:"+token);

					if (!token) {
						// console.log("[VALIDATE TOKEN] - No existe el token, se deja la validación.");
						return null;
					}
			
					// console.log("[VALIDATE TOKEN] entiendo que el token no era null obtengo la respuesta");

					const response = await fetch(process.env.BACKEND_URL + "api/verify_token", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
					});
			

					// console.log("[VALIDATE TOKEN] Estado de la respuesta:", response.status);

					if (response.ok) {

						// console.log("[VALIDATE TOKEN] Respuesta okey entonces agrego a data la respuesta.");

						const data = await response.json();

						console.log("[Validate Token] La data es:", JSON.stringify(data, null, 2));

						if (data.roles.includes("teacher")) {

							// console.log("Entre al if del data role");
							
							setStore({ user_id: data.user_id, role : data.roles, teacher_id: data.teacher_id, isTokenValidated: true }); // Almacena usuario y marca el token como validado

						}else{
							setStore({ user_id: data.user_id, role : data.roles, student_id: data.student_id, isTokenValidated: true }); // Almacena usuario y marca el token como validado

						}

						console.log("[Validate Token] El nuevo store es:", JSON.stringify(store, null, 2));

						return data.user; // Devuelve el usuario si el token es válido
					} else {
						console.log("[VALIDATE TOKEN] El token no era valido deslogueamos");

						actions.logout(); // Cierra sesión si el token no es válido
						return null;
					}
				} catch (error) {
					console.error("Error validating token:", error);
					actions.logout(); // Cierra sesión en caso de error
					return null;
				}
			},

		// Función para actualizar la descripcion de un profesor
		updateTeacherDescription: async (teacherId, newDescription) => {
			try {
				const response = await fetch(process.env.BACKEND_URL + "api/update_description", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						teacher_id: teacherId,
						description: newDescription,
					}),
				});

				if (response.ok) {
					const data = await response.json();
					// console.log("Precio actualizado:", data);
					return true;
				} else {
					const errorData = await response.json();
					console.error("Error al actualizar el precio:", errorData.message);
					return false;
				}
			} catch (error) {
				console.error("Error en updateTeacherDescription:", error);
				return false;
			}
		},	

		getTeacherPerfil: async () => {
			let token = localStorage.getItem("IdToken")
		
			try {
				const response = await fetch(process.env.BACKEND_URL + "api/teacher_id", {
					method: "GET",
					headers: {"Content-Type": "application/json",
						"Authorization": "Bearer "+ token
					}
				});
				if (response.ok) {
					const data = await response.json();
					console.log (data)
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

		}
	};
};

export default getState;
