<template>
  <div
    @click="checkClick"
    ref="invoiceWrap"
    class="invoice-wrap flex flex-coloumn"
  >
    <form @submit.prevent="submitForm" class="">
      <div class="invoice-content">
        <loading-circle v-if="isLoading" />
        <h1 v-if="!editInvoice">New Invoice</h1>
        <h1 v-else>Edit Invoice</h1>

        <!-- Bill from section -->
        <div class="bill-from flex flex-column">
          <h4>Bill From</h4>
          <div class="input flex flex-column">
            <label for="billerStreetAddress">Street Address</label>
            <input
              required
              type="text"
              id="billerStreetAddress"
              v-model="billerStreetAddress"
            />
          </div>
          <div class="location-details flex">
            <div class="input flex flex-column">
              <label for="billerCity">City</label>
              <input
                required
                type="text"
                id="billerCity"
                v-model="billerCity"
              />
            </div>
            <div class="input flex flex-column">
              <label for="billerZipCode">Zip Code</label>
              <input
                required
                type="text"
                id="billerZipCode"
                v-model="billerZipCode"
              />
            </div>
            <div class="input flex flex-column">
              <label for="billerCountry">Country</label>
              <input
                required
                type="text"
                id="billerCountry"
                v-model="billerCountry"
              />
            </div>
          </div>
        </div>

        <!-- Bill from section -->
        <div class="bill-to flex flex-column">
          <h4>Bill to</h4>
          <div class="input flex flex-column">
            <label for="clientName">Client's Name</label>
            <input required type="text" id="clientName" v-model="clientName" />
          </div>
          <div class="input flex flex-column">
            <label for="clientEmail">Client's Email</label>
            <input
              required
              type="text"
              id="clientEmail"
              v-model="clientEmail"
            />
          </div>
          <div class="input flex flex-column">
            <label for="clientStreetAddress">Client's Street Address</label>
            <input
              required
              type="text"
              id="clientStreetAddress"
              v-model="clientStreetAddress"
            />
          </div>

          <div class="location-details flex">
            <div class="input flex flex-column">
              <label for="clientCity">City</label>
              <input
                required
                type="text"
                id="clientCity"
                v-model="clientCity"
              />
            </div>
            <div class="input flex flex-column">
              <label for="clientZipCode">Zip Code</label>
              <input
                required
                type="text"
                id="clientZipCode"
                v-model="clientZipCode"
              />
            </div>
            <div class="input flex flex-column">
              <label for="clientCountry">Country</label>
              <input
                required
                type="text"
                id="clientCountry"
                v-model="clientCountry"
              />
            </div>
          </div>
        </div>

        <!-- Invoice Work Details -->
        <div class="invoice-work flex flex-column">
          <div class="payment flex">
            <div class="input flex flex-column">
              <label for="invoiceDate">Invoice Date</label>
              <input
                disabled
                type="text"
                id="invoiceDate"
                v-model="invoiceDate"
              />
            </div>

            <div class="input flex flex-column">
              <label for="paymentDueDate">Payment Due Date</label>
              <input
                disabled
                type="text"
                id="paymentDueDate"
                v-model="paymentDueDate"
              />
            </div>
          </div>

          <div class="input flex flex-column">
            <label for="paymentTerms">Payment Terms</label>
            <select
              required
              type="text"
              id="paymentTerms"
              v-model="paymentTerms"
            >
              <option value="30">30 Days</option>
              <option value="60">60 Days</option>
            </select>
          </div>

          <div class="input flex flex-column">
            <label for="productDescription">Product Description</label>
            <input
              required
              type="text"
              id="productDescription"
              v-model="productDescription"
            />
          </div>

          <div class="work-items">
            <h3>Item List</h3>
            <table class="item-list">
              <tr class="table-heading flex">
                <th class="item-name">Item Name</th>
                <th class="qty">Quantity</th>
                <th class="price">Price</th>
                <th class="total">Total</th>
              </tr>

              <tr
                class="table-items flex"
                v-for="(item, index) in invoiceItemList"
                :key="index"
              >
                <td class="item-name">
                  <input type="text" v-model="item.itemName" />
                </td>
                <td class="qty"><input type="text" v-model="item.qty" /></td>
                <td class="price">
                  <input type="text" v-model="item.price" />
                </td>
                <td class="total flex">
                  ${{ (item.total = item.qty * item.price) }}
                </td>
                <img
                  @click="deleteInvoiceItem(item.id)"
                  src="@/assets/icon-delete.svg"
                  alt="delete-item"
                />
              </tr>
            </table>
            <div @click="addNewInvoiceItem" class="flex button">
              <img src="@/assets/icon-plus.svg" alt="add-item" />
              Add New Item
            </div>
          </div>
        </div>

        <!-- Save/Exit -->
        <div class="save flex">
          <div class="left">
            <button @click="closeInvoice" type="button" class="red">
              Cancel
            </button>
          </div>
          <div class="right flex">
            <button
              v-if="!editInvoice"
              type="submit"
              @click="saveDraft"
              class="dark-purple"
            >
              Save Draft
            </button>
            <button
              v-if="!editInvoice"
              type="submit"
              @click="publishInvoice"
              class="purple"
            >
              Create Invoice
            </button>
            <button
              v-if="editInvoice"
              type="submit"
              class="purple"
            >
              Update Invoice
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import DB from "../firebase/firebaseInnit.js";
import { mapActions, mapMutations, mapState } from "vuex";
import { uid } from "uid";
import LoadingCircle from "./LoadingCircle";

export default {
  name: "InvoiceModal",
  components: {
    LoadingCircle,
  },
  data() {
    return {
      dateOptions: { year: "numeric", month: "short", day: "numeric" },
      docId: null,
      isLoading: null,
      billerStreetAddress: null,
      billerCity: null,
      billerZipCode: null,
      billerCountry: null,
      clientName: null,
      clientEmail: null,
      clientStreetAddress: null,
      clientCity: null,
      clientZipCode: null,
      clientCountry: null,
      invoiceDateUnix: null,
      invoiceDate: null,
      paymentTerms: null,
      paymentDueDateUnix: null,
      paymentDueDate: null,
      productDescription: null,
      invoicePending: null,
      invoiceDraft: null,
      invoiceItemList: [],
      invoiceTotal: 0,
    };
  },
  methods: {
    ...mapMutations(["TOGGLE_INVOICE", "TOGGLE_DIALOG", "TOGGLE_EDIT_INVOICE"]),
    ...mapActions(["GET_INVOICES", "UPDATE_INVOICE", ]),
    closeInvoice() {
      this.TOGGLE_INVOICE();
      if (this.editInvoice) {
        this.TOGGLE_EDIT_INVOICE();
      }
    },
    checkClick(e) {
      if (e.target === this.$refs.invoiceWrap) {
        this.TOGGLE_DIALOG();
      }
    },
    addNewInvoiceItem() {
      this.invoiceItemList.push({
        id: uid(),
        itemName: "",
        qty: 0,
        price: 0,
      });
    },
    deleteInvoiceItem(id) {
      console.log(id);
      this.invoiceItemList = this.invoiceItemList.filter(
        (item) => item.id !== id
      );
    },
    publishInvoice() {
      this.invoicePending = true;
    },
    calcInvoiceTotal() {
      this.invoiceTotal = 0;
      this.invoiceItemList.forEach((item) => {
        this.invoiceTotal += item.total;
      });
    },
    saveDraft() {
      this.invoiceDraft = true;
    },
    async uploadInvoice() {
      if (this.invoiceItemList.length <= 0) {
        alert("fill out the invoiced items");
        return;
      }

      this.isLoading = true;
      this.calcInvoiceTotal();

      const database = DB.collection("invoices").doc();

      // this.invoiceDraft = true;

      await database.set({
        invoiceId: uid(6),
        billerStreetAddress: this.billerStreetAddress,
        billerCity: this.billerCity,
        billerZipCode: this.billerZipCode,
        billerCountry: this.billerCountry,
        clientName: this.clientName,
        clientEmail: this.clientEmail,
        clientStreetAddress: this.clientStreetAddress,
        clientCity: this.clientCity,
        clientZipCode: this.clientZipCode,
        clientCountry: this.clientCountry,
        invoiceDate: this.invoiceDate,
        invoiceDateUnix: this.invoiceDateUnix,
        paymentTerms: this.paymentTerms,
        paymentDueDate: this.paymentDueDate,
        paymentDueDateUnix: this.paymentDueDateUnix,
        productDescription: this.productDescription,
        invoiceItemList: this.invoiceItemList,
        invoiceTotal: this.invoiceTotal,
        invoicePending: this.invoicePending,
        invoiceDraft: this.invoiceDraft,
        invoicePaid: null,
      });
      this.isLoading = false;
      this.closeInvoice();
      this.GET_INVOICES();
    },
    // async uploadDraftInvoice(){

    // },
    async updateInvoice() {
      if (this.invoiceItemList.length <= 0) {
        alert("fill out the invoiced items");
        return;
      }

      this.isLoading = true;
      this.calcInvoiceTotal();

      const database = DB.collection("invoices").doc(this.docId);

      await database.update({
        billerStreetAddress: this.billerStreetAddress,
        billerCity: this.billerCity,
        billerZipCode: this.billerZipCode,
        billerCountry: this.billerCountry,
        clientName: this.clientName,
        clientEmail: this.clientEmail,
        clientStreetAddress: this.clientStreetAddress,
        clientCity: this.clientCity,
        clientZipCode: this.clientZipCode,
        clientCountry: this.clientCountry,
        paymentTerms: this.paymentTerms,
        paymentDueDate: this.paymentDueDate,
        paymentDueDateUnix: this.paymentDueDateUnix,
        productDescription: this.productDescription,
        invoiceItemList: this.invoiceItemList,
        invoiceTotal: this.invoiceTotal,
      });
      this.isLoading = false;
      const data = {
        docId: this.docId,
        routeId: this.$route.params.invoiceId,
      }
      
      this.UPDATE_INVOICE(data);
    },
    submitForm() {
      if (this.editInvoice) {
        this.updateInvoice();
        return;
      }
      this.uploadInvoice();
    },
  },
  computed: {
    ...mapState(["editInvoice", "currentInvoiceArray"]),
  },
  watch: {
    paymentTerms() {
      const futureDate = new Date();
      this.paymentDueDateUnix = futureDate.setDate(
        futureDate.getDate() + parseInt(this.paymentTerms)
      );
      this.paymentDueDate = new Date(
        this.paymentDueDateUnix
      ).toLocaleDateString("en-us", this.dateOptions);
    },
  },
  created() {
    //set current date on invoice
    if (!this.editInvoice) {
      this.invoiceDate = new Date().toLocaleDateString(
        "en-us",
        this.dateOptions,
      );
    }

    if (this.editInvoice) {
      const currentInvoice = this.currentInvoiceArray[0];
      this.docId = currentInvoice.docId;
      this.billerStreetAddress = currentInvoice.billerStreetAddress;
      this.billerCity = currentInvoice.billerCity;
      this.billerZipCode = currentInvoice.billerZipCode;
      this.billerCountry = currentInvoice.billerCountry;
      this.clientName = currentInvoice.clientName;
      this.clientEmail = currentInvoice.clientEmail;
      this.clientStreetAddress = currentInvoice.clientStreetAddress;
      this.clientCity = currentInvoice.clientCity;
      this.clientZipCode = currentInvoice.clientZipCode;
      this.clientCountry = currentInvoice.clientCountry;
      this.invoiceDateUnix = currentInvoice.invoiceDateUnix;
      this.invoiceDate = currentInvoice.invoiceDate;
      this.paymentTerms = currentInvoice.paymentTerms;
      this.paymentDueDateUnix = currentInvoice.paymentDueDateUnix;
      this.paymentDueDate = currentInvoice.paymentDueDate;
      this.productDescription = currentInvoice.productDescription;
      this.invoicePending = currentInvoice.invoicePending;
      this.invoiceDraft = currentInvoice.invoiceDraft;
      this.invoiceItemList = currentInvoice.invoiceItemList;
      this.invoiceTotal = currentInvoice.invoiceTotal;
    }
  },
};
</script>

<style lang="scss" scoped>
.invoice-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  @media (min-width: 900px) {
    left: 90px;
  }
  .invoice-content {
    position: relative;
    padding: 56px;
    max-width: 700px;
    width: 100%;
    color: #fff;
    background-color: #141625;
    background-attachment: fixed;
    box-shadow: 10px 4px 6px -1px rgba(0, 0, 0, 0.2),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);

    @media (max-width: 900px) {
      margin-top: 50px;
    }
    h1 {
      margin-bottom: 48px;
      color: #fff;
    }
    h3 {
      margin-bottom: 16px;
      font-size: 18px;
      color: #777f98;
    }
    h4 {
      color: #7c5dfa;
      font-size: 12px;
      margin-bottom: 24px;
    }
    // Bill To / Bill From
    .bill-to,
    .bill-from {
      margin-bottom: 48px;
      .location-details {
        gap: 16px;
        div {
          flex: 1;
        }
      }
    }
    // Invoice Work
    .invoice-work {
      .payment {
        gap: 24px;
        div {
          flex: 1;
        }
      }
      .work-items {
        .item-list {
          width: 100%;
          // Item Table Styling
          .table-heading,
          .table-items {
            gap: 16px;
            font-size: 12px;
            .item-name {
              flex-basis: 50%;
            }
            .qty {
              flex-basis: 10%;
            }
            .price {
              flex-basis: 20%;
            }
            .total {
              flex-basis: 20%;
              align-self: center;
            }
          }
          .table-heading {
            margin-bottom: 16px;
            th {
              text-align: left;
            }
          }
          .table-items {
            position: relative;
            margin-bottom: 24px;
            img {
              position: absolute;
              top: 15px;
              right: 0;
              width: 12px;
              height: 16px;
            }
          }
        }
        .button {
          color: #fff;
          background-color: #252945;
          align-items: center;
          justify-content: center;
          width: 100%;
          img {
            margin-right: 4px;
          }
        }
      }
    }
    .save {
      margin-top: 60px;
      div {
        flex: 1;
      }
      .right {
        justify-content: flex-end;
      }
    }
  }
  .input {
    margin-bottom: 24px;
  }
  label {
    font-size: 12px;
    margin-bottom: 6px;
  }
  input,
  select {
    width: 100%;
    background-color: #1e2139;
    color: #fff;
    border-radius: 4px;
    padding: 12px 4px;
    border: none;
    &:focus {
      outline: none;
    }
  }
}
</style>