<template>
  <div class="dialog flex">
    <div class="dialog-content">
      <p>Are you sure you want to EXIT? Your changes will not be saved</p>
      <div class="actions flex">
        <button @click="closeDialog" class="purple">Return</button>
        <button @click="closeInvoice" class="red">EXIT</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  name: "dialog",
  methods: {
    ...mapMutations(["TOGGLE_DIALOG", "TOGGLE_INVOICE", "TOGGLE_EDIT_INVOICE"]),

    closeDialog() {
      this.TOGGLE_DIALOG();
    },
    //closesModal
    closeInvoice(){
        this.TOGGLE_DIALOG();
        this.TOGGLE_INVOICE();
        if(this.editInvoice){
          this.TOGGLE_EDIT_INVOICE();
        }
    },
  },
  computed:{
    ...mapState(["editInvoice"]),
  },
};
</script>

<style lang="scss" scoped>
.dialog {
  z-index: 100;
  position: fixed;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
 
  .dialog-content { 
    border-radius: 20px;
    padding: 48px 32px;
    max-width: 450px;
    background-color: #252945;
    color: #fff;

    p {
      text-align: center;
    }
    .actions {
      margin-top: 24px;
      button {
        flex: 1;
      }
    }
  }
}
</style>