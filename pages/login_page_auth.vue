<template>
  <section>
    <div class="uk-background-muted">
      <div class="uk-container uk-container-xsmall uk-padding">
	  {{ this.form }}

        <form 
          method="post"
          @submit.prevent="login">
          <fieldset class="uk-fieldset">

            <div  
              class="uk-margin">
              <label class="uk-form-label">Email</label>
              <div class="uk-form-controls">
                <input 
                  v-model="form.email"
                  class="uk-input" 
                  type="text"
                  name="email">
              </div>
            </div>
            <div 
              class="uk-margin" >
              <label class="uk-form-label">Lösenord</label>
              <div class="uk-form-controls">
                <input 
                  v-model="form.password"
                  class="uk-input" 
                  type="password"
                  name="password">
              </div>
              <div class="uk-margin uk-margin-remove-top uk-text-center uk-text-small">
                <nuxt-link 
                  :to="localePath('/forgotten-password')" 
                  style="color:#8c8c8c">Glömt ditt lösenord?</nuxt-link></div>
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
      const _this = this
      _this.isSubmitting=true
      await this.$axios.post('/webapi/Login/PostLogin', {
		UserName: _this.form.email,
        Password: _this.form.password
      }).then(function (response) {
		  // console.log(this.form.email, this.form.password)
        _this.isSubmitting=false
          if(response.data.ErrorList !== null) {
            _this.errors = response.data.ErrorList
          }else{
            _this.$store.commit('setCid', response.data.Id)
            _this.$cookies.set('cid', response.data.Id)
            _this.$router.push(this.$root.context.app.localePath('/'))
          }
      })
      .catch(function (error) {
        _this.isSubmitting=false
        console.log(error)
      })
    }
  }
}
</script>
<style lang="scss">

</style>
