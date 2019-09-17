<template>
  <b-navbar toggleable="md" type="dark" class="pl-0 pr-0 bg-sidebar d-md-block">
    <div class="pl-3 pt-2 mt-1 pb-4 ml-1" href="#">
      <span v-html="svg('rewards_logo_small', 'logo-sidebar')"></span>
    </div>
    <b-navbar-toggle target="nav-collapse" class="mr-4"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <div class="side-nav w-100">
        <template v-for="(item, index) in navitems">
          <b-nav-item
            class="mb-2 d-flex align-items-center"
            :to="item.path ? item.path : ''"
            v-bind:key="index"
          >
            <b-row no-gutters>
              <b-col cols="2">
                <span v-html="svg(item.icon, 'img-fluid')"></span>
              </b-col>

              <b-col cols="10">
                <span>{{item.title}}</span>
              </b-col>
            </b-row>
          </b-nav-item>
          <div v-if="item.children" v-bind:key="item.id" class="nav-item-children">
            <template v-for="(subitem, sub_index) in item.children" class="nav-item-children">
              <b-row no-gutters v-bind:key="sub_index">
                <b-col cols="3"></b-col>
                <b-col cols="9">
                  <div class="pt-3 pb-3">
                  <b-link :to="subitem.path">{{subitem.title}}</b-link>
                  </div>
                </b-col>
              </b-row>
            </template>
          </div>
        </template>
      </div>
    </b-collapse>
  </b-navbar>
</template>

<script>
import store from "~/store";

export default {
  name: "Sidebar",
  data: () => ({
    navitems: []
  }),
  mounted() {
    console.log(store.getters["auth/user"]);
    this.$data.navitems = [
      { path: "/dashboard", title: "Dashboard", icon: "icon-dashboard" },
      { path: "/orders", title: "Orders", icon: "icon-orders" },
      { path: "/products", title: "Products", icon: "icon-products" },
      { path: "/stores", title: "Stores", icon: "icon-stores" },
      {
        path: "/rewards-members",
        title: "Rewards Members",
        icon: "icon-rewards-members"
      },
      {
        path: "/rewards-offers",
        title: "Rewards Offers",
        icon: "icon-rewards-offers"
      },
      { path: "/catalogues", title: "Catalogues", icon: "icon-catalogues" },
      {
        path: "/user-accounts",
        title: "User Accounts",
        icon: "icon-dashboard",
        icon: "icon-users"
      },
      { path: "/reports", title: "Reports", icon: "icon-reports" },
      {
        title: "App Settings",
        icon: "icon-settings",
        children: [
          { path: "/venue-settings", title: "Venue Settings" },
          { path: "/app-keys", title: "App Keys" }
        ]
      }
    ];
  }
};
</script>