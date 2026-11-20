import './boot.js'
import '@fontsource-variable/inter'
import '@fontsource-variable/inter-tight'
import './styles/base.css'
import { createApp } from 'vue'
import HomeApp from './HomeApp.vue'

createApp(HomeApp).mount('#app')
