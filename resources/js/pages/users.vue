<template>
  <div>
    <h2 class="mb-5">{{$route.name}}</h2>
    <div class="shadow-sm p-3 bg-white">
    <b-table head-variant="light" :items="items" :fields="fields" class="small__13">
        <template slot="[avatar]" slot-scope="data">
          <div class="text-center">
            <img class="img-fluid mh-100px" :src="'/storage/'+ data.item.avatar" alt />
          </div>
        </template>
    </b-table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  middleware: "auth",
  name: "Users",
  data: function() {
    return {
      items: null,
      fields: {
        'role.name' : {
          label: 'Role'
        },
        'avatar' : {
          label: 'Avatar'
        },
        'name' : {
          label: 'Name'
        },
        'email' : {
          label: 'Email'
        },
        'created_at' : {
          label: 'Created At'
        }
      }
    };
  },
  methods: {
    fetchData: function() {
      let self = this;
      const url = "/api/users";

      axios
        .get(url)
        .then(response => response.data)
        .then(data => {
          self.items = data;
          console.log(data)
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