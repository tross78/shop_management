<template>
  <b-container fluid class="p-0">
    <b-row>
      <b-col cols="12" md="6" order="2" order-md="1" :style="getBackground" class="col-100vh d-none d-md-block"></b-col>
      <b-col cols="12" md="6" order="1" order-md="2">
        <child />
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
export default {
  name: "LoginLayout",
  computed: {
    getBackground() {
      return (
        "background: url(" +
        require("../../images/login_bg.jpg") +
        "); background-size: cover;"
      );
    }
  }
};
</script>