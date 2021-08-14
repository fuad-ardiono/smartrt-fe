import 'core-js/stable'
import Vue from 'vue'
import App from './App'
import router from './router'
import CoreuiVue from '@coreui/vue'
import { iconsSet as icons } from './assets/icons/icons.js'
import store from './store'

import 'noty/lib/themes/mint.css'
import 'noty/lib/noty.css'

import {ServerTable, ClientTable} from 'vue-tables-2';

Vue.config.performance = true
Vue.use(CoreuiVue)
Vue.prototype.$log = console.log.bind(console)

// eslint-disable-next-line
Vue.use(ClientTable);
// eslint-disable-next-line
Vue.use(ServerTable);

new Vue({
  el: '#app',
  router,
  store,
  icons,
  template: '<App/>',
  components: {
    App
  }
})
