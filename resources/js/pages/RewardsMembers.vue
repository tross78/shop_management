<template>
  <div>
    <h2 class="mb-5">{{$route.name}}</h2>
    <div class="shadow-sm p-3 bg-white">
      <b-table head-variant="light" :items="items" :fields="fields" class="small__13">
        <template slot="[name]" slot-scope="data">
          <p>{{data.item.first_name}} {{data.item.last_name}}</p>
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
  name: "RewardsMembers",
  middleware: "auth",
  data: function() {
    return {
      data: { last_page: 1 },
      items: null,
      fields: [
        "card_id",
        "name",
        "email",
        "date_of_birth",
        "mobile",
        "postcode"
      ]
    };
  },
  watch: {
    "$route.query.page"() {
      this.fetchData();
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

      let api_membersrewards_url = "/api/v1/member-rewards";
      const api_page =
        "?page=" + (this.$route.query.page ? this.$route.query.page : "");
      let api_membersrewards_suffix = '/' + this.storeConfig.storeId;

      if (this.storeConfig.storeId == -1) {
        api_membersrewards_url = "/api/v1/member-rewards";
        api_membersrewards_suffix = "";
      }

      let url =
        process.env.MIX_APP_STORE_API_URL +
        api_membersrewards_url +
        api_membersrewards_suffix +
        api_page;

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