<template>
  <div>
    <h2 class="mb-5">{{$route.name}}</h2>
    <div class="shadow-sm p-3 bg-white">
      <b-modal id="modal-prevent-closing" ref="modal" title="Confirm Delete" @ok="handleOk">
        <p>Delete Catalogue?</p>
      </b-modal>
      <b-table :items="items" :fields="fields" head-variant="light" fixed>
        <template slot="[date]" slot-scope="data">
          <p>{{data.item.start_date | formatDate}}</p>
        </template>
        <template slot="[catalogue]" slot-scope="data">
          <a :href="data.item.catalogue_url">
            <img :src="data.item.catalogue_cover_url" alt="catalogue cover" height="100px" />
          </a>
        </template>
        <template slot="[actions]" slot-scope="data">
          <b-button
            variant="danger"
            v-b-modal.modal-prevent-closing
            v-on:click="selectItem(data.item.catalogue_id)"
          >DELETE</b-button>
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
  middleware: "auth",
  name: "Catalogues",
  data: function() {
    return {
      data: { last_page: 1 },
      selected_item_id: -1,
      items: null,
      fields: ["date", "store_name", "catalogue", "actions"]
    };
  },
  filters: {
    formatDate: function(value) {
      if (value) {
        const timeStamp = new Date(value * 1000);
        return moment(timeStamp).format("DD-MM-YYYY");
      }
    }
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
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.removeItem(this.$data.selected_item_id);
    },

    selectItem: function(item_id) {
      this.$data.selected_item_id = item_id;
    },
    removeItem: function(item_id) {
      let self = this;
      let url =
        process.env.MIX_APP_STORE_API_URL +
        "/api/v1/catalogues/remove/" +
        item_id;
      axios.post(url, this.$data.form).then(function(response) {
        self.fetchData();
      });
          // Hide the modal manually
        this.$nextTick(() => {
          this.$refs.modal.hide()
        })
    },
    fetchData: function() {
      let self = this;
      const api_page =
        "?page=" + (this.$route.query.page ? this.$route.query.page : "");
      let api_catalogues_url = "/api/v1/catalogues";
      let api_catalogues_suffix = "/" + this.storeConfig.storeId;
      if (this.storeConfig.storeId == -1) {
        api_catalogues_suffix = "";
      }
      let url =
        process.env.MIX_APP_STORE_API_URL +
        api_catalogues_url +
        api_catalogues_suffix +
        api_page;

      console.log(url);

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