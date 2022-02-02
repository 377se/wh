<template>
  <section>
    <div class="uk-background-muted">
      <div class="uk-container uk-container-xsmall uk-padding">
        <div class="uk-flex uk-flex-center uk-margin-large-bottom uk-margin-large-top" style="object-fit: contain;"><img src="~/assets/img/logo-green.png"></div>
        <form
          method="post"
          @submit.prevent="login">
          <fieldset class="uk-fieldset">

            <div
              class="uk-margin">
              <label class="uk-form-label" for="user-wh">Email</label>
              <div class="uk-form-controls">
                <input
                  id="user-wh"
                  v-model="form.email"
                  class="uk-input"
                  type="text"
                  name="email">
              </div>
            </div>
            <div
              class="uk-margin" >
              <label class="uk-form-label" for="password-wh">Lösenord</label>
              <div class="uk-form-controls">
                <input
                  id="password-wh"
                  v-model="form.password"
                  class="uk-input"
                  type="password"
                  name="password"
                />
              </div>
              <div class="uk-margin uk-margin-remove-top uk-text-center uk-text-small">
                <nuxt-link :to="localePath('/forgotten-password')" style="color:#8c8c8c">
                  Glömt ditt lösenord?
                </nuxt-link>
              </div>
            </div>

            <div class="uk-margin uk-text-center">
              <ButtonSubmit
                :is-submitting="isSubmitting"
                theme="uk-button-primary"
                :button-text="'Logga in'"
                :is-submit="true"/>
            </div>

          </fieldset>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import ButtonSubmit from '@/components/ButtonSubmit'

export default {
  beforeRouteLeave(to, from, next){
  try{
      this.errors = []
      //Iterate through each object field, key is name of the object field`
      let _this = this
      Object.keys(_this.form).forEach(function(key,index) {
        _this.form[key] = ''
      })
    }catch(err){console.log(err)}
    next()
  },
  components:{
    ButtonSubmit,
  },
  mounted () {
    this.$store.getters['isLoggedIn'] ? this.$router.push('/') : ''

  },
  data() {
    return {
      form:{
        email: '',
        password: ''
      },
      errors: [],
      isSubmitting: false
    }
  },
  methods: {
    async login(event) {
      this.isSubmitting=true
      let _this = this
      try{
        let logmein = await this.$axios.post('/webapi/Login/PostLogin', {
          UserName: this.form.email,
          Password: this.form.password,
          Domain: location.hostname
        })
        this.isSubmitting=false
        if(logmein.data.ErrorList){
          this.errors = response.data.ErrorList
        }else{
          await this.$store.commit('setIsLoggedIn', true)
          location.reload('/')
        }

      }catch(err){
        this.isSubmitting=false
        console.log(err)
      }
    },
  }
}
</script>
<style lang="scss">

</style>
