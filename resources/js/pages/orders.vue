<template>
  <div>
    <h3 class="mb-4 pb-1">{{$route.name}}</h3>
    <metrics-panel/>
    <div class="shadow-sm p-3 bg-white">
      <b-table :items="items" head-variant="light" class="small__13 bg-white" :fields="fields">
        <template slot="[order_id]" slot-scope="data">
          <strong>#{{data.item.id}} - {{data.item.member.first_name}} {{data.item.member.last_name}}</strong>
        </template>
        <template slot="[price_total]" slot-scope="data">
          <p>${{data.item.price_total}}</p>
        </template>
        <template slot="[edit]" slot-scope="data">
          <router-link :to="'/order/' + data.item.id"><span v-html="svg('icon-pencil', 'mr-1 mb-1')"></span>EDIT</router-link>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import MetricsPanel from "~/components/MetricsPanel";
import axios from "axios";

export default {
  middleware: "auth",
  name: "Orderlist",
  components: {
    MetricsPanel
  },
  data: function() {
    return {
      items: null,
      fields: {
        order_id: {
          label: "Order ID",
          sortable: true
        },
        "venue.store_name": {
          label: "Location",
          sortable: true
        },
        price_total: {
          label: "Total",
          sortable: true
        },
        "order_status.name": {
          label: "Status",
          sortable: true
        },
        edit: {
          label: "Order Options"
        }
      }
    };
  },
  computed: mapGetters({
    storeConfig: "config/storeConfig"
  }),
  methods: {
    fetchData: function() {
      let self = this;
      let api_orders_url = '/api/v1/orders/store/';
      let api_order_suffix = this.storeConfig.storeId;
      if (this.storeConfig.storeId == -1) {
        api_orders_url = '/api/v1/orders/index';
        api_order_suffix = '';
      }
      let url =
        process.env.MIX_APP_STORE_API_URL +
        api_orders_url +
        api_order_suffix;

      const myRequest = new Request(url);

      axios
        .get(url)
        .then(response => response.data)
        .then(data => {
          self.items = data;
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },

  mounted() {
    this.fetchData();
    this.$root.$on("update-store", () => {
      this.fetchData();
    });
  }
};
</script>