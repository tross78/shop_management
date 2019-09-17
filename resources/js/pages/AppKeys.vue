<template>
  <div>
    <h2 class="mb-5">{{$route.name}}</h2>
     <div class="shadow-sm p-3 bg-white">
    <b-table :items="items" head-variant="light" class="small__13 bg-white" :fields="fields" fixed>
        <template slot="[app_id]" slot-scope="data">
            <p style="word-break:break-all;">{{data.item.app_id}}</p>
        </template>
        <template slot="[app_key]" slot-scope="data">
            <p style="word-break:break-all;">{{data.item.app_id}}</p>
        </template>
    </b-table>
     </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ApiKeys",
  middleware: "auth",
  data: function() {
    return {
      items: null,
      fields: [
        'app_id',
        'app_name',
        'app_key'
      ]
    };
  },
  methods: {
    fetchData: function() {
      let self = this;
      const url = process.env.MIX_APP_STORE_API_URL + "/api/v1/app-keys/";
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
  }
};
</script>