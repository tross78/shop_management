<template>
  <div>
    <h2 class="mb-5">{{$route.name}}</h2>
    <div class="shadow-sm p-3 bg-white">
      <b-table head-variant="light" :items="items" :fields="fields" class="small__13" fixed>
        <template slot="[price]" slot-scope="data">
          <p>${{data.item.price_dollars}}.{{data.item.price_cents}} / {{data.item.pack_size}}</p>
        </template>
        <template slot="[product_image]" slot-scope="data">
          <div class="text-center">
            <img class="img-fluid mh-100px" :src="data.item.product_image" alt />
          </div>
        </template>
        <template slot="[duration]" slot-scope="data">
          <p class="mb-1">{{data.item.start_date | formatDate}}</p>
          <p class="mb-1 text-center">to</p>
          <p>{{data.item.end_date | formatDate}}</p>
        </template>
      </b-table>
        <b-pagination-nav
        :link-gen="linkGen"
        :number-of-pages="page_total"
        first-text="First"
        prev-text="Prev"
        next-text="Next"
        last-text="Last"
        align="fill"
        use-router
      ></b-pagination-nav>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";
import moment from "moment";

export default {
  name: "RewardsOffers",
  middleware: "auth",
  data: function() {
    return {
      items: null,
      data: { last_page: 1 },
      fields: [
        "promo_zone",
        "product_description",
        "price",
        "save_value",
        "product_image",
        "category",
        "duration"
      ]
    };
  },
  watch: {
    "$route.query.page"() {
      this.fetchData();
    }
  },
  filters: {
    formatDate: function(value) {
      if (value) {
        const timeStamp = new Date(value * 1000);
        return moment(timeStamp).format('DD-MM-YYYY');
      }
    }
  },
  computed: {
    ...mapGetters({
      storeConfig: "config/storeConfig"
    }),
    page_total: function() {
      return this.$data.data ? this.$data.data.last_page : 1;
    }
  },
  methods: {
    linkGen(pageNum) {
      return pageNum === 1 ? "?" : `?page=${pageNum}`;
    },
    fetchData: function() {
         let self = this;

      let api_membersrewards_url = "/api/v1/rewards";
      const api_page =
        "?page=" + (this.$route.query.page ? this.$route.query.page : "");
      let api_membersrewards_suffix = '/' + this.storeConfig.storeId;

      if (this.storeConfig.storeId == -1) {
        api_membersrewards_suffix = "";
      }

      let url =
        process.env.MIX_APP_STORE_API_URL +
        api_membersrewards_url +
        api_membersrewards_suffix +
        api_page;

        console.log(url);

      const myRequest = new Request(url);

      axios
        .get(url)
        .then(response => response.data)
        .then(data => {
           self.data = data;
          self.items = data["data"];
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