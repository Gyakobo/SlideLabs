import { createApp } from 'vue'
import App from './App.vue'
import router from './route/router'
import "./assets/css/StyleMP.css"

import DefaultLayout from './layouts/Base.vue'
import RegAuth from './layouts/RegAuth.vue'

const app = createApp(App)
app.use(router)
app.mount('#app')
app.component('default-layout', DefaultLayout)
app.component('auth-layout', RegAuth)

