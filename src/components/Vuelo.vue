<template>
	<div v-if="loaded" class="tabla-vuelos">
		<table class="display" id="datatable">
			<thead>
				<tr>
					<th>ID</th>			
					<th>Piloto</th>		
					<th>Origen</th>
					<th>Destino</th>
					<th>Fecha Salida</th>
					<th>Fecha Llegada</th>
					<th>Hora Salida</th>
					<th>Hora Llegada</th>
					<th>Pasajeros</th>
					<th>Editar</th>
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
					<td>{{nombrePiloto}}</td>
					<td>{{origen}}</td>
					<td>{{destino}}</td>
					<td>{{fechaSalida}}</td>
					<td>{{fechaLlegada}}</td>
					<td>{{horaSalida}}</td>
					<td>{{horaLlegada}}</td>
					<td>{{cantidadPasajeros}}</td>
					<td><button class="btn btn-secondary" @click="showModal = true">Editar</button></td>
				</tr>
			</tbody>
		</table>

		<div class="modal-overlay" v-if="showModal"></div>

		<div class="modal" v-if="showModal">
			<div class="edit_data">
				<div class="container_edit_data">
						<h2>Actualizar Vuelo</h2>
						<form v-on:submit.prevent="actualizarVuelo">
							<input class="form-input" type="text" v-model="nombrePiloto" placeholder="Nombre Piloto" id="nombrePiloto" />
							<input class="form-input" type="text" v-model="origen" placeholder="Origen" id="origen"/>
							<input class="form-input" type="text" v-model="destino" placeholder="Destino" id="destino"/>
							<input class="form-input" type="date" v-model="fechaSalida" placeholder="Fecha Salida" id="fechaSalida"/>
							<input class="form-input" type="date" v-model="fechaLlegada" placeholder="Fecha Salida" id="fechaLlegada"/>
							<input class="form-input" type="time" v-model="horaSalida" placeholder="Hora Salida" id="horaSalida"/>
							<input class="form-input" type="time" v-model="horaLlegada" placeholder="Hora Llegada" id="horaLlegada"/>
							<input class="form-input" type="number" v-model.number="cantidadPasajeros" placeholder="CantidadPasajeros" id="cantidadPasajeros"/>
							<button class="btn btn-secondary" type="submit">Enviar</button>
						</form>
				</div>
			</div>
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

export default {
	name: "Vuelo",

	data: function() {
		return {
		loaded: false,
		showModal:false,
		id_vuelo: "",
		vuelo: {
			nombrePiloto:"",
			origen: "",
			destino: "",
			fechaSalida:"",
			fechaLlegada:"",
			horaSalida:"",
			horaLlegada:"",
			cantidadPasajeros: 0,
			// datosVuelos: [],
			},
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

		},

		cargarDatos: async function() {

			let token = localStorage.getItem("token_access");
			let userId = jwt_decode(token).user_id.toString();

			return axios
				.get(`https://mision-tic-sta-db.herokuapp.com/user/${userId}/`, {
					headers: { Authorization: `Bearer ${token}` },
				})
				.then((result) => {
					
					// this.datosVuelos = JSON.parse(JSON.stringify(result.data));
					// console.table(this.datosVuelos);
					console.log(result.data)
					this.id_vuelo = result.data.vuelo.id_vuelo;
					this.nombrePiloto = result.data.vuelo.nombrePiloto;
					this.origen = result.data.vuelo.origen;
					this.destino = result.data.vuelo.destino;
					this.fechaSalida = result.data.vuelo.fechaSalida;
					this.fechaLlegada = result.data.vuelo.fechaLlegada;
					this.horaSalida = result.data.vuelo.horaSalida;
					this.horaLlegada = result.data.vuelo.horaLlegada
					this.cantidadPasajeros = result.data.vuelo.cantidadPasajeros;
					this.loaded = true;
				})
				.catch(() => {
					this.$emit("logOut");
				});
		},

		actualizarVuelo: async function(){
			
			const token = localStorage.getItem("token_access");
			const userId = jwt_decode(token).user_id.toString();
			this.showModal = false;

			const vuelo = {

				nombrePiloto: document.getElementById('nombrePiloto').value,
				origen : document.getElementById('origen').value,
				destino : document.getElementById('destino').value,
				fechaSalida : document.getElementById('fechaSalida').value,
				fechaLlegada : document.getElementById('fechaLlegada').value,
				horaSalida : document.getElementById('horaSalida').value,
				horaLlegada : document.getElementById('horaLlegada').value,
				cantidadPasajeros : document.getElementById('cantidadPasajeros').value,
			}

			console.log(vuelo)

			return axios
				.put(
					`http://mision-tic-sta-db.herokuapp.com/vuelo/update/${userId}/${this.id_vuelo}/`,
					vuelo,
					{ headers: { Authorization: `Bearer ${token}` },

				})
				.then((result) =>{
					console.log(result)
					this.$swal({
							icon: 'success',
							title: 'Vuelo Actualizado con exito',
						})
					
				}).catch((error)=>{
					console.log(error)
					
				})
			
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
		this.cargarDatos();
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


.modal-overlay{
	position: absolute;
	top:0;
	left:0;
	bottom: 0;
	right: 0;
	z-index: 100;
	background: rgba(0, 0, 0, 0.4);
}

.modal{
	position: fixed;
	top:50%;
	left: 50%;
	transform: translate(-50%,-50%);
	background: #fff;
	padding: 20px;
	border-radius:15px;
	z-index: 101;
}

.edit_data {
	width: 18rem;
    border-radius: 0.4rem;
	margin-top: 1rem;
	margin-bottom: 1rem;
	
}

.container_edit_data {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.container_edit_data h2{
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
	color:#3c2d71;
}

.container_edit_data form {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.container_edit_data form input{
    background-color: rgba(0, 0, 0, 0.397);
	margin-bottom: 1rem;
	width: 100%;
}

.container_edit_data form button{
    margin-bottom: 1rem;
	width: 60%;
}
</style>
