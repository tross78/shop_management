<template>
  <div>
    <b-nav-item-dropdown id="dropdown-1" class="m-md-2">
      <template v-slot:button-content>
        {{storeConfig.storeName}}
        <span v-html="svg('icon-chevron-down', 'ml-1')"></span>
      </template>
      <b-form-input v-model="search" placeholder="Search for store" />
      <b-dropdown-item v-bind:key="-1" @click="setStore(-1, 'All Stores')">All Store</b-dropdown-item>
      <template v-for="(item, index) in filteredItems">
        <b-dropdown-item
          v-bind:key="index"
          @click="setStore(item.htmassist_id, item.store_name)"
        >{{item.store_name}}</b-dropdown-item>
      </template>
    </b-nav-item-dropdown>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "StoreSelector",
  data: function() {
    return {
      items: [],
      search: ""
    };
  },
  computed: {
    filteredItems() {
      return this.items.filter(item => {
        const postcode = item.location_details.postcode.toString();
        const suburb = item.location_details.suburb;
        const store_name = item.store_name;
        return (
          (postcode.indexOf(this.search.toLowerCase()) > -1 ||
            suburb.toLowerCase().indexOf(this.search.toLowerCase()) > -1 ||
            store_name.toLowerCase().indexOf(this.search.toLowerCase()) > -1) &&
          this.search.length > 0
        );
      });
    },
    ...mapGetters({
      storeConfig: "config/storeConfig"
    })
  },
  methods: {
    setStore: function(htmassist_id, store_name) {
      this.$store.dispatch("config/saveStore", {
        storeId: htmassist_id,
        storeName: store_name
      });
      this.$root.$emit("update-store");
    },
    fetchData: function() {
      let self = this;
      const myRequest = new Request(
        process.env.MIX_APP_STORE_API_URL + "/api/v1/venues"
      );

      fetch(myRequest)
        .then(response => {
          return response.json();
        })
        .then(data => {
          self.items = data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  },

  mounted() {
    this.fetchData();
  }
};
</script>