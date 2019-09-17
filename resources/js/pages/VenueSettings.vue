<template>
  <div>
    <h2 class="mb-5">{{$route.name}}</h2>
    <div v-if="form" class="mt-5">
      <b-form-group id="input-group-1" label="Venue commission percentage:" label-for="input-1">
        <b-form-input id="input-1" v-model="form.commission" type="text" required></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-2" label="Venue order alert email:" label-for="input-2">
        <b-form-input id="input-2" v-model="form.alert_email" type="text" required></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-3" label="Venue order alert mobile:" label-for="input-3">
        <b-form-input id="input-3" v-model="form.alert_mobile" type="text" required></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-4" label="SwiftPOS APIKey url:" label-for="input-4">
        <b-form-input id="input-4" v-model="form.swiftpos_apikey_url" type="text" required></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-5" label="SwiftPOS base url:" label-for="input-5">
        <b-form-input id="input-5" v-model="form.swiftpos_base_url" type="text" required></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-6" label="SwiftPOS location id:" label-for="input-6">
        <b-form-input id="input-6" v-model="form.swiftpos_location_id" type="text" required></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-7" label="SwiftPOS user:" label-for="input-7">
        <b-form-input id="input-7" v-model="form.swiftpos_user_id" type="text" required></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-8" label="SwiftPOS password:" label-for="input-8">
        <b-form-input id="input-8" v-model="form.swiftpos_password" type="text" required></b-form-input>
      </b-form-group>
      <b-button class="w-100" variant="primary" v-on:click="updateData()">Update</b-button>
    </div>
    <div v-else>
      <b-alert variant="danger" show>Select a store first to change credentials.</b-alert>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import axios from "axios";
export default {
  middleware: "auth",
  name: "VenueSettings",
  data: function() {
    return {
      form: null
    };
  },
  computed: {
    ...mapGetters({
      storeConfig: "config/storeConfig"
    })
  },
  methods: {
    updateData: function() {
      let url =
        process.env.MIX_APP_STORE_API_URL +
        "/api/v1/venue-settings/update/" +
        this.storeConfig.storeId;
      axios.post(url, this.$data.form).then(function(response) {
        console.log(response);
      });
    },
    fetchData: function() {
      let self = this;
      self.form = null;
      let api_venuecred_url = "/api/v1/venue-settings/show";
      const api_page =
        "?page=" + (this.$route.query.page ? this.$route.query.page : "");
      let api_venuecred_suffix = "/" + this.storeConfig.storeId;

      if (this.storeConfig.storeId > -1) {
        let url =
          process.env.MIX_APP_STORE_API_URL +
          api_venuecred_url +
          api_venuecred_suffix +
          api_page;

        const myRequest = new Request(url);

        axios
          .get(url)
          .then(response => response.data)
          .then(data => {
            self.form = data;
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    }
  },
  mounted() {
    this.$root.$on("update-store", () => {
      this.fetchData();
    });
    this.fetchData();
  }
};
</script>