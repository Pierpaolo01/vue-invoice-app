<template>
  <!-- Header -->
  <div class="home container">
    <header class="header flex">
      <div class="left flex flex-column">
        <h1>invoices</h1>
        <span v-if="isMobile"> {{ invoiceData.length }} Invoices </span>
        <span v-else>There are {{ invoiceData.length }} invoices here</span>
      </div>
      <div class="right flex">
        <div @click="toggleFilterMenu" class="filter flex">
          <span>
            <p v-if="isMobile">Filter</p>
            <p v-else>Filter by status</p>
            <span v-if="isFilteredInvoice"
              >: {{ isFilteredInvoice }}
            </span></span
          >
          <img src="../assets/icon-arrow-down.svg" alt="arrow-down" />
          <ul v-show="filterMenu" class="filter-menu">
            <li @click="filteredInvoice">Draft</li>
            <li @click="filteredInvoice">Pending</li>
            <li @click="filteredInvoice">Paid</li>
            <li @click="filteredInvoice">All</li>
          </ul>
        </div>
        <div @click="newInvoice" class="button flex">
          <div class="inner-button flex">
            <img src="../assets/icon-plus.svg" alt="new-invoice" />
          </div>
          <span v-if="isMobile">New</span>
          <span v-else>New Invoice</span>
        </div>
      </div>
    </header>
    <div v-if="invoiceData.length > 0">
      <InvoiceItem
        v-for="(invoice, index) in filteredData"
        :invoiceItem="invoice"
        :key="index"
      />
    </div>
    <div v-else class="empty flex flex-column">
      <img src="@/assets/illustration-empty.svg" alt="empty" />
      <h3>There is nothing here</h3>
      <p>
        Create a new invoice by clicking the 'New Invoice' button and get
        started
      </p>
    </div>
  </div>
  <!-- Invoices -->
</template>

<script>
import { mapMutations, mapState } from "vuex";
import InvoiceItem from "../components/InvoiceItem";

export default {
  name: "Home",
  components: {
    InvoiceItem,
  },
  data() {
    return {
      filterMenu: false,
      isFilteredInvoice: null,
      isMobile: null,
    };
  },
  methods: {
    ...mapMutations(["TOGGLE_INVOICE"]),

    newInvoice() {
      this.TOGGLE_INVOICE();
    },

    toggleFilterMenu() {
      this.filterMenu = !this.filterMenu;
    },
    filteredInvoice(event) {
      if (event.target.innerText === "all") {
        this.isFilteredInvoice = null;
        return;
      }
      this.isFilteredInvoice = event.target.innerText;
    },
    checkScreen() {
      if (window.innerWidth <= 600) {
        this.isMobile = true;

        return;
      }
      console.log(this.isMobile);
      this.isMobile = false;
    },
  },
  computed: {
    ...mapState(["invoiceData"]),
    filteredData() {
      return this.invoiceData.filter((invoice) => {
        if (this.isFilteredInvoice === "Draft") {
          return invoice.invoiceDraft === true;
        } else if (this.isFilteredInvoice === "Pending") {
          return invoice.invoicePending === true;
        } else if (this.isFilteredInvoice === "Paid") {
          return invoice.invoicePaid === true;
        }
        return invoice;
      });
    },
  },
  created() {
    this.checkScreen();
    window.addEventListener("resize", this.checkScreen);
  },
};
</script>

<style lang="scss" scoped>
.home {
  color: #fff;

  .header {
    margin-bottom: 65px;

    .left,
    .right {
      flex: 1;
    }

    .right {
      justify-content: flex-end;
      align-items: center;

      .button,
      .filter {
        align-items: center;

        span {
          font-size: 12px;
        }
      }

      .filter {
        cursor: pointer;
        position: relative;
        margin-right: 40px;
        @media screen and (max-width: 600px){
          margin-right: 10px;
        }

        img {
          margin-left: 12px;
          width: 9px;
          height: 5px;
        }

        .filter-menu {
          width: 120px;
          position: absolute;
          top: 25px;
          list-style: none;
          background-color: #1e2139;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 2px 4px -1px rgba(0, 0, 0, 0.06);

          li {
            cursor: pointer;
            font-size: 12px;
            padding: 10px 20px;

            &:hover {
              color: #1e2139;
              background-color: #fff;
            }
          }
        }
      }

      .button {
        padding: 8px 10px;
        background-color: #7c5dfa;
        border-radius: 40px;

        .inner-button {
          margin-right: 8px;
          border-radius: 50%;
          padding: 8px;
          align-items: center;
          justify-content: center;
          background-color: #fff;
          img {
            width: 10px;
            height: 10px;
          }
        }
      }
    }
  }

  .empty {
    margin-top: 160px;
    align-items: center;

    img {
      width: 214px;
      height: 200px;
    }

    h3 {
      font-size: 20px;
      margin-top: 40px;
    }

    p {
      text-align: center;
      max-width: 224px;
      font-weight: 300;
      margin-top: 16px;
    }
  }
}
</style>
