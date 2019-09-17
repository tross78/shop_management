 <template>
  <b-card class="mb-3 shadow-sm">
    <b-row class="mb-4">
      <b-col cols="12">
        <b-card-text class="text-muted">Products Sold</b-card-text>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="6">
        <b-card-text>
          <h4 class="text-dark">2453</h4>
          <h6 class="small text-metric-positive">
            <strong>&uarr;13.8</strong>
          </h6>
        </b-card-text>
      </b-col>
      <b-col cols="6">
        <b-card-text>
          <apexchart width="100%" height="40" type="bar" :options="options" :series="series"></apexchart>
        </b-card-text>
      </b-col>
    </b-row>
  </b-card>
</template>
<script>
import VueApexCharts from "vue-apexcharts";
import MetricsPanel from "~/components/MetricsPanel";
import axios from "axios";
export default {
  name: "totalviews",
  middleware: "auth",
  components: {
    apexchart: VueApexCharts
  },
  data: function() {
    return {
      items: null,
      options: {
        chart: {
          id: "vuechart-example",
          sparkline: {
            enabled: true
          },
          toolbar: {
            show: false
          }
        },
        colors: ["#A3A0FB"],
        fill: {
          type: "gradient",
          shadeIntensity: 1,
          gradient: {
            type: "vertical",
            shadeIntensity: 0,
            opacityFrom: 1,
            opacityTo: 0.8,
            stops: [0, 70, 100]
          }
        },
        dataLabels: {
          enabled: false
        },
        grid: {
          show: false,
          padding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }
        },
        xaxis: {
          labels: {
            show: false
          },
          axisTicks: {
            show: false
          },
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
        },
        yaxis: {
          labels: {
            show: false
          },
          axisTicks: {
            show: false
          }
        }
      },
      series: [
        {
          name: "series-1",
          data: [30, 40, 45, 50, 49, 60, 70, 91]
        }
      ]
    };
  }
};
</script>