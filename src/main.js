import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

require('./plugins/fontawesome');

createApp(App)
.component('font-awesome-icon', FontAwesomeIcon)
.use(router)
.mount('#app')
