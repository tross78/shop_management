<template>
  <div>
     <h3 class="mb-4 pb-1">{{$route.name}}</h3>
    <metrics-panel />
    <div class="p-4 chart__container bg-white shadow-sm">
      <p class="lead">Statistics</p>
      <apexchart
        class="chart__apexchart"
        height="380px"
        width="100%"
        type="line"
        :options="options"
        :series="series"
      ></apexchart>
    </div>
  </div>
</template>
<style scoped>
</style>
<script>
import VueApexCharts from "vue-apexcharts";
import MetricsPanel from "~/components/MetricsPanel";
import axios from "axios";
export default {
  name: "dashboard",
  middleware: "auth",
  components: {
    apexchart: VueApexCharts,
    MetricsPanel
  },
  methods: {
    fetchData: function() {
      let self = this;
      const url = process.env.MIX_APP_STORE_API_URL + "/api/v1/sales";
      const myRequest = new Request(url);
      axios
        .get(url)
        .then(response => response.data)
        .then(data => {
          self.items = data;
          this.processData();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    processData: function() {
      const series_data = [];
      let series_sales_total = 0;
      let self = this;
      self.items.forEach(function(element) {
        const transaction_date = new Date(element.transaction_date);
        const formatted_date =
          transaction_date.getDate() +
          "-" +
          (transaction_date.getMonth() + 1) +
          "-" +
          transaction_date.getFullYear();

        series_sales_total = 0;
        console.log(element);
        element.sale_items.forEach(function(element2) {
          series_sales_total += element2.total_inc;
        });
        console.log(series_sales_total);
        series_data.push({
          x: formatted_date,
          y: series_sales_total
        });
      });
      self.series[0].data = series_data;
    }
  },
  data: function() {
    return {
      items: null,
      options: {
        stroke: {
          curve: 'smooth'
        },
        chart: {
          id: "vuechart-example"
        },
        xaxis: {
          categories: []
        },
         legend: {
          horizontalAlign: "left",
          offsetX: 40
        }
      },
      series: [
        {
          name: "Products Sold",
          data: []
        },
        {
          name: "Total Views",
          data: []
        }
      ]
    };
  },
  mounted() {
    this.fetchData();
  }
};
</script>