import { createRouter, createWebHistory } from "vue-router";
import App from './App.vue';

import LogIn from './components/LogIn.vue'
import SignUp from './components/SignUp.vue'
import Home from './components/Home.vue'
import Vuelo from './components/Vuelo.vue'
//import Usuario from '.components/Usuario.vue'


const routes = [{
        path: '/',
        name: 'root',
        component: App
    },
    {
        path: '/user/logIn',
        name: "logIn",
        component: LogIn
    },
    {
        path: '/user/signUp',
        name: "signUp",
        component: SignUp
    },
    {
        path: '/user/home',
        name: "home",
        component: Home
    },
    {
        path: '/user/vuelo',
        name: "vuelo",
        component: Vuelo
    },
    {
        path: '/user/usuario',
        name: "usuario",
        component: Usuario,
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;