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
			// Use getActions to call a function within a function
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
					const data = await resp.json();
					setStore({ message: data.message });
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error);
				}
			},

			changeColor: (index, color) => {
				// get the store
				const store = getStore();

				// we have to loop the entire demo array to look for the respective index
				// and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				// reset the global store
				setStore({ demo: demo });
			},

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
						// Actualizar el estado del store
						setStore({ user: data.user, token: data.access_token });
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

			getTeachers: async (searchQuery) => {
				try {
					/* Eliminar tildes y caracteres diacríticos

					normalize("NFD"): Esto separa los caracteres base de sus marcas diacríticas. 
					Por ejemplo, á se convierte en a + ´

					replace(/[\u0300-\u036f]/g, ""): Elimina los caracteres diacríticos que resultaron de la descomposición,
					 dejando únicamente los caracteres base. 

					Guardamos el resultado en una nueva variable. (normalizedQuery) ¿Es lo más óptimo?

					*/

					const normalizedQuery = searchQuery.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
			
					const response = await fetch(process.env.BACKEND_URL + "api/teachers_subjects?search=" + normalizedQuery);
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

			getTeacherById: async (id) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "api/teacher/"+id);
					if (response.ok) {
						const data = await response.json();
						console.log (data)
						setStore({ teacher: data });
						return true;
					} else {
						console.error("Error fetching teacher:", response.statusText);
						return false
					}
				} catch (error) {
					console.error("Error while fetching teacher:", error);
					return false
				}
			},	

			
		}
	};
};

export default getState;