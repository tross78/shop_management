<template>
  <b-row no-gutters class="p-5">
    <b-col cols="12" md="6" lg="3" class="m-auto">
      <h2>{{$t('reset_password')}}</h2>
        <form @submit="reset" @keydown="form.onKeydown($event)">
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
            readonly
          />
        </b-form-group>

          <!-- Password -->
        <b-form-group id="fieldset-2" label="Password" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model.trim="$v.form.password.$model"
            required
            class="form-control"
            type="password"
            name="password"
            :state="!$v.form.password.$invalid"
          />
        </b-form-group>


          <!-- Password Confirmation -->         
        <b-form-group id="fieldset-3" label="Confirm Password" label-for="input-3">
          <b-form-input
            id="input-3"
            v-model.trim="$v.form.password_confirmation.$model"
            required
            class="form-control"
            type="password"
            name="password"
            :state="!$v.form.password_confirmation.$invalid"
          />
        </b-form-group>


          <!-- Submit Button -->
              <b-button type="submit" variant="primary">
                {{ $t('reset_password') }}
              </b-button>
        </form>
    </b-col>
  </b-row>
</template>

<script>
import Form from 'vform'
import { required, sameAs, email, url, numeric, minLength, sameAsPassword} from "vuelidate/lib/validators"
export default {
  middleware: 'guest',

  metaInfo () {
    return { title: this.$t('reset_password') }
  },

  data: () => ({
    status: '',
    form: new Form({
      token: '',
      email: '',
      password: '',
      password_confirmation: ''
    })
  }),
  validations: {
    form: {
      email: { required },
      password: {required, minLength: minLength(6)},
      password_confirmation: {sameAsPassword: sameAs('password')}
    }
  },
  created () {
    this.form.email = this.$route.query.email
    this.form.token = this.$route.params.token
  },

  methods: {
    async reset (evt) {
      evt.preventDefault();
      const { data } = await this.form.post('/api/password/reset')

      this.status = data.status

      this.form.reset()
    }
  }
}
</script>
