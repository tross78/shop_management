<template>
  <b-navbar toggleable="lg" type="light" class="shadow-sm navbar__mh70 navbar-text-small bg-white">
    <b-navbar-nav class="col-6">
      <b-nav-item class="w-100 has-search">
        <span v-html="svg('icon-search', 'form-control-feedback')"></span>
        <input
          type="text"
          class="d-none d-lg-block form-control-plaintext"
          placeholder="Search for specific orders or customers"
        />
        <input type="text" class="d-block d-lg-none form-control-plaintext" placeholder="Search" />
      </b-nav-item>
    </b-navbar-nav>
    <b-navbar-nav class="ml-auto mr-4">
      <b-nav-item right class="mr-3 navbar-item__border-right">
        <store-nav />
      </b-nav-item>
      <b-nav-item right class="mr-4">
        <template v-if="user">
          <b-nav-item-dropdown id="dropdown-2" class="m-md-2">
            <template v-slot:button-content>
              <span>{{user.name}}</span>
              <span v-html="svg('icon-chevron-down', 'ml-1')"></span>
              <div class="user-profile float-right">
                <img :src="avatar_url" class="rounded-circle user-profile__avatar img-fluid" alt=""/>
              </div>
            </template>

            <b-dropdown-item v-on:click="logout">
              <span class="dropdown-item">Logout</span>
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </template>
      </b-nav-item>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
import { mapGetters } from "vuex";
import StoreNav from "~/components/StoreNav";

export default {
  data: () => ({
    appName: window.config.appName
  }),
  components: {
    StoreNav
  },
  computed: {
    ...mapGetters({
    user: "auth/user"
    }),
    avatar_url: function() {
      return '/storage/users/default.png';
    }
  },
  methods: {
    async logout() {
      // Log out the user.
      await this.$store.dispatch("auth/logout");

      // Redirect to login.
      this.$router.push({ name: "login" });
    }
  }
};
</script>