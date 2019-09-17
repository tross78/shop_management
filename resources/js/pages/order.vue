<template>
  <div>
    <h2 class="mb-5">{{$route.name}}</h2>
    <router-link :to="{ path: '/orders' }" class="btn btn-primary">Back to orders</router-link>
    <div v-if="form" class="mt-5">
      <b-form-group v-if="form.order_status" id="input-group-1" label="Status:" label-for="input-1">
        <b-form-select  value-field="id" text-field="name" v-if="form.order_status" v-model="form.order_status_id" :options="statuses" :value="form.order_status_id"></b-form-select>
      </b-form-group>
      <b-form-group id="input-group-2" label="Booking name:" label-for="input-2">
        <b-form-input id="input-2" v-model="form.booking_name" type="text" required></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-3" label="Price total:" label-for="input-3">
        <b-form-input id="input-3" v-model="form.price_total" type="text" readonly></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-4" label="Items total:" label-for="input-4">
        <b-form-input id="input-4" v-model="form.items_total" type="text" readonly></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-5" label="Shipping address:" label-for="input-5">
        <b-form-input id="input-5" v-model="form.shipping_address" type="text" required></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-6" label="Billing address:" label-for="input-6">
        <b-form-input id="input-6" v-model="form.billing_address" type="text" required></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-7" label="Comments:" label-for="input-7">
        <b-form-input id="input-7" v-model="form.comments" type="text" required></b-form-input>
      </b-form-group>
    </div>
    <template v-if="form.order_notes && form.order_notes.length > 0">
      <h3 class="mt-5 mb-5">Order notes</h3>
      <b-form-group>
        <b-form-textarea
          v-model="note_text"
          class="mb-2"
          placeholder="Add a note..."
          rows="3"
          max-rows="6"
        ></b-form-textarea>
        <b-button variant="success" v-on:click="addOrderNote()" :disabled="this.$data.note_text.trim().length == 0">ADD NOTE</b-button>
      </b-form-group>
      <hr />
      <b-list-group
        class="mb-5"
        v-for="(order_note, index) in form.order_notes"
        v-bind:key="`order_note-${index}`"
      >
        <b-list-group-item class="d-flex justify-content-between">
          <span>{{order_note.body}}</span>
          <b-button variant="danger" v-on:click="removeOrderNote(index)">DELETE</b-button>
        </b-list-group-item>
      </b-list-group>
    </template>

    <template v-if="form.order_items && form.order_items.length > 0">
      <h3 class="mt-5 mb-5">Order items</h3>
      <b-list-group
        class="mb-5"
        v-for="(order_item, index) in form.order_items"
        v-bind:key="`order_item-${index}`"
      >
        <b-list-group-item class="d-flex justify-content-between">
          <span>{{order_item.product.product_description[0].body}} x {{order_item.quantity}}</span>
          <b-button variant="danger" v-on:click="removeOrderItem(index)">DELETE</b-button>
        </b-list-group-item>
      </b-list-group>
    </template>
    <b-button class="w-100" variant="primary" v-on:click="updateData()">Update</b-button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";
export default {
  middleware: "auth",
  name: "Orderlist",
  data: function() {
    return {
      id: null,
      note_text: '',
      statuses: null,
      form: {}
    };
  },
  methods: {
    fetchStatuses: function() {
      let self = this;
      let url =
        process.env.MIX_APP_STORE_API_URL +
        "/api/v1/order-statuses";
      const myRequest = new Request(url);

      axios
        .get(url)
        .then(response => response.data)
        .then(data => {
          self.statuses = data;
          console.log(data);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    fetchData: function() {
      let self = this;
      let url =
        process.env.MIX_APP_STORE_API_URL +
        "/api/v1/orders/show/" +
        this.$data.id;
      const myRequest = new Request(url);

      axios
        .get(url)
        .then(response => response.data)
        .then(data => {
          self.form = data;
          console.log(data);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    updateData: function() {
      let url =
        process.env.MIX_APP_STORE_API_URL +
        "/api/v1/orders/update/" +
        this.$data.id;
      axios.post(url, this.$data.form).then(function(response) {
        console.log(response);
      });
    },
    removeOrderItem: function(order_index) {
      this.$data.form.order_items.splice(order_index, 1);
      //this.$data.form.price_total = this.$data.form.order_items
      // this.$data.form.items_total = this.$data.form.order_items.length;
    },
    addOrderNote: function() {
      this.$data.form.order_notes.push({'body':this.$data.note_text, 'order_id' : this.$data.id});
      this.$data.note_text = '';
    },
    removeOrderNote: function(order_index) {
      this.$data.form.order_notes.splice(order_index, 1);
    }
  },

  mounted() {
    if (this.$route.params && this.$route.params.id) {
      this.$data.id = this.$route.params.id;
    }
    this.fetchStatuses();
    this.fetchData();
  }
};
</script>