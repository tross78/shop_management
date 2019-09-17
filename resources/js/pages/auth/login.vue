<template>
  <div class="login-container">
    <span v-html="svg('rewards_logo_large', 'img-fluid login-logo m-auto d-block')"></span>
    <p class="text-muted pt-5 pb-5 text-center">Welcome back! Please login to your account</p>
    <b-form class="form-login" @submit="login" @keydown="form.onKeydown($event)">
      <b-alert :show="login_error.length > 0" variant="danger">{{login_error}}</b-alert>

      <!-- Email -->
      <b-row class="mb-4">
        <b-col cols="12">
          <b-form-input
            v-model.trim="$v.form.email.$model"
            required
            class="form-control"
            type="email"
            name="email"
            :state="!$v.form.email.$invalid"
          />
        </b-col>
      </b-row>

      <!-- Password -->
      <b-row>
        <b-col cols="12">
          <b-form-input
            v-model.trim="$v.form.password.$model"
            required
            class="form-control"
            type="password"
            name="password"
            :state="!$v.form.password.$invalid"
          />
        </b-col>
      </b-row>

      <!-- Remember Me -->

      <b-row class="mt-4 mb-5">
        <div class="col-md-6">
          <b-form-checkbox v-model="remember" name="remember" class="small pl-4">{{ $t('remember_me') }}</b-form-checkbox>
        </div>
        <div class="col-md-6 text-right">
          <router-link
            :to="{ name: 'password.request' }"
            class="small ml-auto my-auto"
          >{{ $t('forgot_password') }}</router-link>
        </div>
      </b-row>

      <b-row>
        <b-col cols="12">
          <!-- Submit Button -->
          <b-button type="submit" variant="primary" class="w-100">{{ $t('login') }}</b-button>
          <div class="row mt-2 mb-2">
            <div class="col">
              <hr />
            </div>
            <div class="col-auto">OR</div>
            <div class="col">
              <hr />
            </div>
          </div>
          <!-- GitHub Login Button -->
          <login-with-azure-ad />
        </b-col>
      </b-row>
    </b-form>
  </div>
</template>

<script>
import Form from "vform";
import axios from "axios";
import LoginWithAzureAd from "~/components/LoginWithAzureAD";
import {
  required,
  sameAs,
  email,
  url,
  numeric,
  minLength
} from "vuelidate/lib/validators";

export default {
  middleware: "guest",
  layout: "login",
  components: {
    LoginWithAzureAd
  },

  metaInfo() {
    return { title: this.$t("login") };
  },

  data: () => ({
    form: new Form({
      email: "",
      password: ""
    }),
    remember: false,
    login_error: ""
  }),
  validations: {
    form: {
      email: { required, email },
      password: { required, minLength: minLength(6) }
    }
  },
  methods: {
    async login(evt) {
      evt.preventDefault();
      // Submit the form.
      await axios
        .post("/api/login", this.$data.form)
        .then(response => {
          console.log(response);
          this.processLogin(response.data);
        })
        .catch(error => {
          console.log(error.response);
          this.login_error = error.response.data.errors.email[0];
        });
    },
    async processLogin(data) {
      // Save the token.
      this.$store.dispatch("auth/saveToken", {
        token: data.token,
        remember: this.$data.remember
      });
      console.log(this.$data.remember);
      // Fetch the user.
      await this.$store.dispatch("auth/fetchUser");

      // Redirect home.
      this.$router.push({ name: "home" });
    }
  }
};
</script>
