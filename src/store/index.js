import { createStore } from 'vuex'

export default createStore({
  state: {
    invoiceModal: null,
    dialogActive: null,
  },
  mutations: {
    TOGGLE_INVOICE(state){
      state.invoiceModal = !state.invoiceModal;
    },
    TOGGLE_DIALOG(state){
      state.dialogActive = ! state.dialogActive;
    },
  },
  actions: {
  },
  modules: {
  }
})
