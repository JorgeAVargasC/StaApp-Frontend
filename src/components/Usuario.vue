<template>
	<div v-if="loaded" class="tabla-vuelos">
		<div class="tags">
			<b>ID</b>
			<b>Nombre</b>
			<b>Username</b>
			<b>Email</b>
		</div>

		<div class="values">
			<p>{{ id }}</p>
			<p>{{ name }}</p>
			<p>{{ username }}</p>
			<p>{{ email }}</p>
		</div>

		<!-- <h1>Información del vuelo creado</h1>
        <h2>Nombre: <span>{{name}}</span></h2>
        <h2>Cantidad Pasajeros: <span>{{cantidadPasajeros}} Pasajeros </span></h2>
        <h2>Correo electrónico: <span>{{email}}</span></h2> -->
	</div>
</template>

<script>
import jwt_decode from "jwt-decode";
import axios from "axios";
import $ from "jquery";

export default {
	name: "Usuario",

	data: function() {
		return {
			id: "",
			name: "",
			username: "",
			email: "",
			loaded: false,
			// datosVuelos: [],
		};
	},

	methods: {
		getData: async function() {
			if (
				localStorage.getItem("token_access") === null ||
				localStorage.getItem("token_refresh") === null
			) {
				this.$emit("logOut");
				return;
			}

			await this.verifyToken();

			let token = localStorage.getItem("token_access");
			let userId = jwt_decode(token).user_id.toString();

			axios
				.get(`https://mision-tic-sta-db.herokuapp.com/user/${userId}/`, {
					headers: { Authorization: `Bearer ${token}` },
				})
				.then((result) => {
					// this.datosVuelos = JSON.parse(JSON.stringify(result.data));
					// console.table(this.datosVuelos);
					console.log(result.data);
					this.id = result.data.id;
					this.name = result.data.name;
					this.username = result.data.username;
					this.email = result.data.email;
					this.loaded = true;
				})
				.catch(() => {
					this.$emit("logOut");
				});
		},

		verifyToken: function() {
			return axios
				.post(
					"https://mision-tic-sta-db.herokuapp.com/refresh/",
					{ refresh: localStorage.getItem("token_refresh") },
					{ headers: {} }
				)
				.then((result) => {
					localStorage.setItem("token_access", result.data.access);
				})
				.catch(() => {
					this.$emit("logOut");
				});
		},
	},

	created: async function() {
		this.getData();
	},
};
</script>

<style>
.tabla-vuelos {
	margin-top: 2rem;
	margin-bottom: 2rem;
	width: auto;
	height: 10rem;	
	display: flex;
	flex-direction: row;
	align-items: center;
	border-radius: 0.4rem;
}

.tags{
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	border-radius: 0.4rem 0rem 0rem 0.4rem;
	background-color: var(--primary);
	height: 100%;
	padding: 1rem;
}

.values{
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	color: #808080;
	border-radius: 0rem 0.4rem 0.4rem 0rem;
	background-color: white;
	padding: 1rem;
	height: 100%;
}
</style>
