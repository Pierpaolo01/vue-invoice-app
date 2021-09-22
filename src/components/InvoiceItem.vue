<template>
  <router-link
    class="invoice flex"
    :to="{ name: 'Invoice', params: { invoiceId: invoiceItem.invoiceId } }"
  >
    <div class="left flex">
      <span class="tracking-number"> #{{ invoiceItem.invoiceId }}</span>
      <span class="due-date">{{ invoiceItem.paymentDueDate }}</span>
      <span class="person">{{ invoiceItem.clientName }}</span>
    </div>

    <div class="right flex">
      <span class="price">${{ invoiceItem.invoiceTotal }} </span>
      <div class="flex">
        <div
          class="status-button flex"
          :class="{
            paid: invoiceItem.invoicePaid,
            draft: invoiceItem.invocieDraft,
            pending: invoiceItem.invoicePending,
          }"
        >
          <span v-if="invoiceItem.invoicePaid">Paid</span>
          <span v-if="invoiceItem.invoiceDraft">Draft</span>
          <span v-if="invoiceItem.invoicePending">Pending</span>
        </div>
        <div class="icon">
          <img src="@/assets/icon-arrow-right.svg" alt="arrow-right" />
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "inovoiceItem",
  props: ["invoiceItem"],
};
</script>

<style lang="scss" scoped>
.invoice {
  text-decoration: none;
  cursor: pointer;
  gap: 16px;
  margin-bottom: 16px;
  color: #fff;
  border-radius: 20px;
  padding: 28px 32px;
  background-color: #1e2139;
  align-items: center;

  span {
    font-size: 13px;
  }

  .left {
    align-items: center;
    flex-basis: 60%;
    gap: 16px;
    @media screen and (max-width: 600px) {
      flex-direction: column;
    }

    span {
      flex: 1;
    }
    .tracking-number {
      text-transform: uppercase;
    }
  }

  .right {
    gap: 16px;
    flex-basis: 40%;
    align-items: center;
    @media screen and (max-width: 600px) {
      flex-direction: column;
    }

    .price {
      flex: 1;
      font-size: 16px;
      font-weight: 600px;
    }
  }
}
</style>
