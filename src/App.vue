<template>
	<div id="app" class="app">
		<div class="header">
			<h1>STA Misión TIC</h1>
			<nav>
				<button class="btn btn-secondary" v-if="is_auth" v-on:click="loadHome">Inicio</button>
				<button class="btn btn-secondary" v-if="is_auth" v-on:click="loadVuelo">Vuelo</button>
				<button class="btn btn-secondary" v-if="is_auth" v-on:click="logOut">
					Cerrar Sesión
				</button>
				<button class="btn btn-secondary" v-if="!is_auth" v-on:click="loadLogIn">
					Iniciar Sesión
				</button>
				<button class="btn btn-secondary" v-if="!is_auth" v-on:click="loadSignUp">
					Registrarse
				</button>
			</nav>
		</div>

		<div class="main-component">
			<router-view
				v-on:completedLogIn="completedLogIn"
				v-on:completedSignUp="completedSignUp"
				v-on:logOut="logOut"
			>
			</router-view>
		</div>

		<div class="footer">
			<h2>Misión TIC 2022</h2>
			<p>Todos los derechos reservados &copy; STA</p>
		</div>
	</div>
</template>

<script>
export default {
	name: "App",

	data: function() {
		return {
			is_auth: false,
		};
	},

	components: {},

	methods: {
		verifyAuth: function() {
			this.is_auth = localStorage.getItem("isAuth") || false;

			if (this.is_auth == false) this.$router.push({ name: "logIn" });
			else this.$router.push({ name: "home" });
		},

		loadLogIn: function() {
			this.$router.push({ name: "logIn" });
		},

		loadSignUp: function() {
			this.$router.push({ name: "signUp" });
		},

		completedLogIn: function(data) {
			localStorage.setItem("isAuth", true);
			localStorage.setItem("username", data.username);
			localStorage.setItem("token_access", data.token_access);
			localStorage.setItem("token_refresh", data.token_refresh);
			alert("Autenticación Exitosa");
			this.verifyAuth();
		},

		completedSignUp: function(data) {
			alert("Registro Exitoso");
			this.completedLogIn(data);
		},

		loadHome: function() {
			this.$router.push({ name: "home" });
		},

		loadVuelo: function() {
			this.$router.push({ name: "vuelo" });
		},

		logOut: function() {
			localStorage.clear();
			alert("Sesión Cerrada");
			this.verifyAuth();
		},
	},

	created: function() {
		this.verifyAuth();
	},
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700&display=swap");

:root {
	--primary: #3c2d71;
	--secondary: #4c3991;
	--gray-1: #d8d8d8;
	--gray-2: #adadad;
	--primary-font: "Roboto", sans-serif;
}

*,
*:before,
*:after {
	margin: 0;
	padding: 0;
	box-sizing: inherit;
}

body {
	background-color: var(--gray-1);
	font-family: var(--primary-font);
	color: #ffffff;
}

.app {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	height: 100%;
	min-height: 100vh;
	background-image: url("./assets/avion.jpg");
	background-position-y: center;
	background-position-x: 35%;
	background-size: cover;
	background-repeat: no-repeat;
}

/* Herramientas Reutilizables */

.btn {
	text-decoration: none;
	text-align: center;
	padding: 0.8rem;
	border-radius: 0.4rem;
	text-transform: capitalize;
	border: none;
	transition-duration: 0.3s;
}

.btn:hover{
	cursor: pointer;
	filter: brightness(1.1);
	transition-duration: 0.3s;
}

.btn-primary {
	color: white;
	background-color: var(--primary);
}

.btn-secondary {
	color: white;
	background-color: var(--secondary);
}

.form-input {
	border: none;
	background-color: white;
	border-radius: 0.4rem;
	padding: 0.8rem;
	color: var(--secondary);
	outline: none;
	transition-duration: 0.25s;
}

.form-input::placeholder {
	color: var(--gray-2);
}

/* App */

.header {
	width: 100%;
	background-color: var(--primary);
	display: flex;
	flex-direction: column;
	align-items: center;
}

.header h1 {
	margin-top: 1rem;
	margin-bottom: 1rem;
}

.header nav {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.header nav button {
	margin-bottom: 1rem;
}

.footer {
	display: flex;
	justify-content: space-between;
	flex-direction: column;
	background-color: var(--primary);
	align-items: center;
	width: 100%;
}

.footer h2 {
	margin-top: 1rem;
	margin-bottom: 1rem;
}

.footer p {
	margin-bottom: 1rem;
	font-weight: 100;
}

/* Vista Laptops y Tablets */
@media (min-width: 1024px) {
	.header {
		flex-direction: row;
		justify-content: space-between;
	}

	.header h1{
		margin-left: 1rem;
	}

	.header nav{
		flex-direction: row;
	}

	.header nav button{
		margin: 0;
		margin-right: 1rem;
	}

	.footer{
		flex-direction: row;
	}

	.footer h2{
		margin-left: 1rem;
	}

	.footer p{
		margin: 0;
		margin-right: 1rem;
	}
}
</style>
