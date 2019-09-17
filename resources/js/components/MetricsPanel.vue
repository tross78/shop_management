<template>
  <b-row class="mb-4">
    <b-col cols="12" md="4">
      <total-views />
    </b-col>
    <b-col cols="12" md="4">
    <products-sold />
    </b-col>
    <b-col cols="12" md="4">
        <total-earnings />
    </b-col>
  </b-row>
</template>

<script>
import TotalViews from "~/components/TotalViews";
import TotalEarnings from "~/components/TotalEarnings";
import ProductsSold from "~/components/ProductsSold";
export default {
  name: "MetricsPanel",
  components: {
    TotalViews,
    TotalEarnings,
    ProductsSold
  }
};
</script>