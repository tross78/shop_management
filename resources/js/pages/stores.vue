<template>
  <div>
    <h2 class="mb-5">{{$route.name}}</h2>
    <div class="shadow-sm p-3 bg-white">
      <b-table head-variant="light" :fields="fields" :items="items" class="small__13">
        <template slot="[contact]" slot-scope="data">
          <table>
            <template v-if="data.item.contact_details">
              <tr>
                <td>Email</td>
                <td>{{data.item.contact_details.email ? data.item.contact_details.email : 'Not supplied'}}</td>
              </tr>
              <tr>
                <td>Phone</td>
                <td>{{data.item.contact_details.phone}}</td>
              </tr>
            </template>
          </table>
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
export default {
  middleware: "auth",
  name: "Stores",
  data: function() {
    return {
      items: null,
      data: { last_page: 1 },
      fields: ["store_name", "promo_zone", "contact"]
    };
  },
  computed: {
    ...mapGetters({
      storeConfig: "config/storeConfig"
    }),
    page_total: function() {
      return this.$data.data ? this.$data.data.last_page : 1;
    }
  },
  watch: {
    "$route.query.page"() {
      this.fetchData();
    }
  },
  methods: {
    linkGen(pageNum) {
      return pageNum === 1 ? "?" : `?page=${pageNum}`;
    },
    fetchData: function() {
      let self = this;
      const api_page =
        "?page=" + (this.$route.query.page ? this.$route.query.page : "");
      let api_venue_url = '/api/v1/venues/related/';
      let api_venue_suffix = this.storeConfig.storeId;
      if (this.storeConfig.storeId == -1) {
        api_venue_url = '/api/v1/venues/pagination';
        api_venue_suffix = '';
      }
      let url =
        process.env.MIX_APP_STORE_API_URL +
        api_venue_url +
        api_venue_suffix +
        api_page;
      
      const myRequest = new Request(url);

      axios
        .get(url)
        .then(response => response.data)
        .then(data => {
          self.data = data;
          self.items = data['data'];
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