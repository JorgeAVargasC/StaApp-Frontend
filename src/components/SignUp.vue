<template>
	<div class="signUp_user">
		<div class="container_signUp_user">
			<h2>Registrarse</h2>

			<form v-on:submit.prevent="processSignUp">
				<input class="form-input" type="text" v-model="user.username" placeholder="Username" />
				<input class="form-input" type="password" v-model="user.password" placeholder="Password" />
				<input class="form-input" type="text" v-model="user.name" placeholder="Name" />
				<input class="form-input" type="email" v-model="user.email" placeholder="Email" />
				<input class="form-input" type="number" v-model="user.vuelo.cantidadPasajeros" placeholder="Cantidad de Pasajeros" />
				<button class="btn btn-secondary" type="submit">Registrarse</button>
			</form>
		</div>
	</div>
</template>

<script>
import axios from "axios";

export default {
	name: "SignUp",

	data: function() {
		return {
			user: {
				username: "",
				password: "",
				name: "",
				email: "",
				vuelo: {
					nombrePiloto: "Jhon Doe",
					origen: "Colombia",
					destino: "New York",
					fechaSalida: "2021-12-04",
					fechaLlegada: "2021-12-05",
					horaSalida: "14:00:00",
					horaLlegada: "15:00:00",
					cantidadPasajeros: 0,
				},
			},
		};
	},

	methods: {
		processSignUp: function() {
			axios
				.post("https://mision-tic-sta-db.herokuapp.com/user/", this.user, { headers: {} })
				.then((result) => {
					let dataSignUp = {
						username: this.user.username,
						token_access: result.data.access,
						token_refresh: result.data.refresh,
					};

					this.$emit("completedSignUp", dataSignUp);
				})
				.catch((error) => {
					console.log(error);
					alert("ERROR: Fallo en el registro.");
				});
		},
	},
};
</script>

<style>

.signUp_user {
    background-color: rgba(0, 0, 0, 0.397);
    border-radius: 0.4rem;
    width: 18rem;
}

.container_signUp_user {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.container_signUp_user .icon-plane{
    margin-top: 1rem;
    width: 5.5rem;
    height: auto;
}

.container_signUp_user h2{
    margin-top: 1rem;
    margin-bottom: 1rem;
}

.container_signUp_user form {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.container_signUp_user form input{
    margin-bottom: 1rem;
	width: 100%;
}

.container_signUp_user form button{
    margin-bottom: 1rem;
	width: 60%;
}

</style>
