<template>
  <b-row no-gutters class="p-5">
    <b-col cols="12" md="6" class="m-auto">
      <h2 class="mb-5">{{$t('reset_password')}}</h2>
      <b-form novalidate @submit="send">
        <b-alert :show="status.length > 0" variant="success">{{status}}</b-alert>

        <!-- Email -->
        <b-form-group id="fieldset-1" label="Email" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model.trim="$v.form.email.$model"
            required
            class="form-control"
            type="email"
            name="email"
            :state="!$v.form.email.$invalid"
          />
        </b-form-group>

        <!-- Submit Button -->

        <b-button
          :disabled="submitted"
          type="submit"
          variant="primary"
        >{{ $t('send_password_reset_link') }}</b-button>
      </b-form>
    </b-col>
  </b-row>
</template>

<script>
import Form from "vform";
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

  metaInfo() {
    return { title: this.$t("reset_password") };
  },

  data: () => ({
    status: "",
    submitted: false,
    form: new Form({
      email: ""
    })
  }),
  validations: {
    form: {
      email: { required, email },
      password: {required, minLength: minLength(6)}
    }
  },
  methods: {
    async send(evt) {
      evt.preventDefault();
      this.$data.submitted = true;
      const { data } = await this.form.post("/api/password/email");

      this.status = data.status;
      console.log(this.status);
      this.$data.submitted = false;
      this.form.reset();
    }
  }
};
</script>
