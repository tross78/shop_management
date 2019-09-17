<template>
  <div>
    <h2 class="mb-5">{{$route.name}}</h2>
    <div class="shadow-sm p-3 bg-white">
    <b-table :items="items" head-variant="light" :fields="fields">
      <template slot="[image]" slot-scope="data">
        <img :src="'data:image/gif;base64,' + data.item.default_image" alt />
      </template>
      <template slot="[description]" slot-scope="data">
        <h5>Standard</h5>
        <p>{{data.item.product_description[0].body}}</p>
        <h5>Short</h5>
        <p>{{data.item.product_description[1].body}}</p>
        <h5>Long</h5>
        <p>{{data.item.product_description[2].body}}</p>
        <h5>Notes</h5>
        <p>{{data.item.product_description[3].body}}</p>
      </template>
    </b-table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";
export default {
  name: "productlist",
  middleware: "auth",
  data: function() {
    return {
      items: null,
      fields: {
        id: {
          label: "Id",
        },
        product_guid: {
          label: "Guid",
        },
        inventory_code: {
          label: "Inventory code",
        },
        image: {
          label: "Image",
        },
        description: {
          label: "Description",
        }
      }
    };
  },
  computed: mapGetters({
    storeConfig: "config/storeConfig"
  }),
  watch: {
    /*eslint-disable no-unused-vars*/
    $route(to, from) {
      this.fetchData();
    }
  },
  methods: {
    fetchData: function() {
      let self = this;
      let url =
        process.env.MIX_APP_STORE_API_URL +
        "/api/v1/products/";

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