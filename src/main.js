import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import App from './App.vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import router from './router'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)

// From https://vue-particles.netlify.app/
import VueParticles from 'vue-particles'

// From https://vuejsexamples.com/simple-alert-for-vue-js/
import VueSimpleAlert from "vue-simple-alert";

Vue.use(VueSimpleAlert);

// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

// Just in case - boostrap vue tags
import { FormTagsPlugin } from 'bootstrap-vue'
Vue.use(FormTagsPlugin)

Vue.config.productionTip = false

Vue.use(VueParticles)


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
