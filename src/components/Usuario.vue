<template>
  <div v-if="loaded" class="information">
    <h1>Información de su cuenta</h1>
    <h2>
      Nombre: <span>{{ name }}</span>
    </h2>
    <h2>
      Usuario: <span>{{ username }} </span>
    </h2>
    <h2>
      Correo electrónico: <span>{{ email }}</span>
    </h2>
  </div>
</template>

<script>
import jwt_decode from "jwt-decode";
import axios from "axios";

export default {
  name: "Usuario",

  data: function () {
    return {
      name: "",
      email: "",
      username: "",
      loaded: false,
    };
  },

  methods: {
    getData: async function () {
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
          this.name = result.data.name;
          this.loaded = true;
        })
        .catch(() => {
          this.$emit("logOut");
        });
    },

    verifyToken: function () {
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

  created: async function () {
    this.getData();
  },
};
</script>

<style></style>