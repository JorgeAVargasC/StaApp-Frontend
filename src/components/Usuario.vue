<template>
	<div v-if="loaded" class="information">
		<table class="display" id="datatable">
			<h1>Información de su cuenta</h1>
			<h2>Nombre: <span>{{name}}</span></h2>
			<h2>Usuario: <span>{{username}} </span></h2>
			<h2>Correo electrónico: <span>{{email}}</span></h2>
			</div>
</template>

<script>
import jwt_decode from "jwt-decode";
import "jquery/dist/jquery.min.js";
import "datatables.net";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import axios from "axios";
import $ from "jquery";

export default {
	name: "Usuario",

	data: function() {
		return {
			name: "",
			email: "",
			username: "",
			loaded: false,
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
					$("#datatable").DataTable({
						"paging": true,
						pageLength: 10,
						lengthChange: false,
						searching: true,
						ordering: true,
						info: true,
						autoWidth: false,
						responsive: true,
						Language: {
							paginate: {
								next: "Siguiente",
								previous: "Anterior",
								last: "Ultimo",
								first: "Primero",
							},
							info: "Mostrando _START_a_END_de_TOTAL_ resultados",
							emptyTable: "No hay registros",
							infoEmpty: "0 registros",
							search: "Buscar: ",
						},
					});
					this.datosUsuarios = result.data;
					console.log(this.datosUsuarios);
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

<style></style>