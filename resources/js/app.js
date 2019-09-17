import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import VueApexCharts from 'vue-apexcharts'

import store from '~/store'
import router from '~/router'
import i18n from '~/plugins/i18n'
import App from '~/components/App'
import axios from 'axios'
import '~/plugins'
import '~/components'
import Vuelidate from 'vuelidate'

Vue.config.productionTip = false
Vue.prototype.svg = require('./svg')
Vue.use(BootstrapVue)
Vue.use(VueApexCharts)
Vue.use(Vuelidate)

axios.interceptors.request.use(config => {
  // perform a task before the request is sent
  config.headers = {
    ...config.headers,
    'x-app-id': process.env.MIX_APP_ID,
    'x-api-key': process.env.MIX_API_KEY,
    'x-app-user': ''
  }
  return config
}, error => {
  // handle the error
  return Promise.reject(error)
})

/* eslint-disable no-new */
new Vue({
  i18n,
  store,
  router,
  ...App
})
