import { createApp } from 'vue'
import { createPinia } from 'pinia'
import {MotionPlugin} from '@vueuse/motion'

import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App).use(MotionPlugin)

app.use(createPinia())
app.use(router)

app.mount('#app')
