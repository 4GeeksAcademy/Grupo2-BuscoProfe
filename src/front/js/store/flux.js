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
			token: null // Guardar el token JWT
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
			}
		}
	};
};

export default getState;