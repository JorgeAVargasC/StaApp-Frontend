<template>

	<div class="logIn_user">
		<div class="container_logIn_user">
            <font-awesome-icon class="icon-plane" icon='plane'/>
			<h2>Iniciar sesión</h2>
			<form v-on:submit.prevent="processLogInUser">
				<input class="form-input" type="text" v-model="user.username" placeholder="Username" />
				<input class="form-input" type="password" v-model="user.password" placeholder="Password" />
				<button class="btn btn-secondary" type="submit">Iniciar Sesion</button>
			</form>
		</div>
	</div>
</template>

<script>
import axios from "axios";

export default {
	name: "LogIn",

	data: function() {
		return {
			user: {
				username: "",
				password: "",
			},
		};
	},

	methods: {
		processLogInUser: function() {
			axios
				.post("https://mision-tic-sta-db.herokuapp.com/login/", this.user, { headers: {} })
				.then((result) => {
					let dataLogIn = {
						username: this.user.username,
						token_access: result.data.access,
						token_refresh: result.data.refresh,
					};

					this.$emit("completedLogIn", dataLogIn);
				})
				.catch((error) => {
					if (error.response.status == "401")
						alert("ERROR 401: Credenciales Incorrectas.");
				});
		},
	},
};
</script>

<style>
.logIn_user {
    background-color: rgba(0, 0, 0, 0.397);
	width: 18rem;
    border-radius: 0.4rem;
	margin-top: 2rem;
	margin-bottom: 2rem;
	
}

.container_logIn_user {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.container_logIn_user .icon-plane{
    margin-top: 1rem;
    width: 5.5rem;
    height: auto;
}

.container_logIn_user h2{
    margin-top: 1rem;
    margin-bottom: 1rem;
}

.container_logIn_user form {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.container_logIn_user form input{
    margin-bottom: 1rem;
	width: 100%;
}

.container_logIn_user form button{
    margin-bottom: 1rem;
	width: 60%;
}

</style>
