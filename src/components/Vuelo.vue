<template>
	<div v-if="loaded" class="tabla-vuelos">
		<table class="display" id="datatable">
			<thead>
				<tr>
					<th>Id</th>
					<th>Pasajeros</th>
					<th>Origen</th>
					<th>Destino</th>
					<th>Pasajeros</th>
				</tr>
			</thead>
			<tbody>
				<!-- <tr v-for="dato in datosVuelos" :key="dato.id">
					<td>{{ dato.id_vuelo }}</td>
					<td>{{ dato.cantidadPasajeros }}</td>
					<td>{{ dato.origen }}</td>
					<td>{{ dato.destino }}</td>
				</tr> -->
				<tr>
					<td>{{id_vuelo}}</td>
					<td>{{origen}}</td>
					<td>{{destino}}</td>
					<td>{{cantidadPasajeros}}</td>
				</tr>
			</tbody>
		</table>
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
	name: "Vuelo",

	data: function() {
		return {
			id_vuelo: "",
			origen: "",
			destino: "",
			cantidadPasajeros: 0,
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
					console.log(result.data)
					this.id_vuelo = result.data.vuelo.id_vuelo;
					this.origen = result.data.vuelo.origen;
					this.destino = result.data.vuelo.destino;
					this.cantidadPasajeros = result.data.vuelo.cantidadPasajeros;
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
	width: 20rem;
}

table{
	border-spacing: 1;
	border-collapse: collapse;
	background: white;
	border-radius: 0.4rem;
	overflow: hidden;
	width: 100%;
	margin: 0 auto;
}

table thead tr{
	background-color: var(--primary);
	height: 3rem;
}

table tbody tr{
	color: #808080;
	height: 3rem;
}

table tbody tr:nth-of-type(even){
	background-color: var(--gray-1);
	
}

table tr th, table tr td{
	width: 25%;
	text-align: center;
}

table tr th{
	padding-left: 1rem;
}

table tr td{
	padding-left: 1rem;
}

table tr th:last-of-type{
	padding-right: 1rem;
}

table tr td:last-of-type{
	padding-right: 1rem;
}




</style>
