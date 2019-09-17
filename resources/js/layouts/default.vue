<template>
  <b-container fluid class="p-0">
    <template v-if="authenticated">
      <b-row no-gutters>
        <b-col cols="12" md="3" lg="2" class="col-md-100vh bg-sidebar">
          <sidebar class="sidebar-container" />
        </b-col>
        <b-col cols="12" md="9" lg="10" class="pl-1">
          <Navbar />
          <div class="pl-3 pr-3 pt-4 pl-md-5 pr-md-5 pt-md-2 m-lg-4 bg-light">
            <child />
          </div>
        </b-col>
      </b-row>
    </template>
    <template v-else>
      <b-row class="mb-5" no-gutters :style="getBackground"></b-row>
          <child />
    </template>
  </b-container>
</template>

<script>
import Navbar from "~/components/Navbar";
import Sidebar from "~/components/Sidebar";
import { mapGetters } from "vuex";

export default {
  name: "MainLayout",
  computed: {
    ...mapGetters({
      authenticated: "auth/check"
    }),
    getBackground() {
      return (
        "background: url(" +
        require("../../images/login_bg.jpg") +
        "); background-size: cover; height: 100px;"
      );
    }
  },
  components: {
    Navbar,
    Sidebar
  }
};
</script>
