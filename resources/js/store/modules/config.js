import Cookies from 'js-cookie'
import * as types from '../mutation-types'

// state
export const state = {
  storeConfig: Cookies.getJSON('store_config') ? Cookies.getJSON('store_config') : { storeId: -1, storeName: 'Default Store' }
}

// getters
export const getters = {
  storeConfig: state => state.storeConfig
}

// mutations
export const mutations = {
  [types.SAVE_STORE] (state, payload) {
    state.storeConfig = payload
    Cookies.set('store_config', payload, { expires: 365 })
  }
}

// actions
export const actions = {
  saveStore ({ commit }, payload) {
    commit(types.SAVE_STORE, payload)
  }
}
