import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

require('./plugins/fontawesome');

createApp(App)
.component('font-awesome-icon', FontAwesomeIcon)
.use(router)
.use(VueSweetalert2)
.mount('#app')
