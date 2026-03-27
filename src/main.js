import { createApp } from 'vue'
import { clickOutside } from './directives/customDirectives';
import router from './router/router.js'
import App from './App.vue'

const app = createApp(App)

app.directive('click-outside', clickOutside);
app.use(router)

app.mount('#app')