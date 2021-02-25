<template>
  <section>
    <div class="uk-background-muted">
      <div class="uk-container uk-container-xsmall uk-padding">
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
                  name="password"
                />
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
      this.isSubmitting=true
      try{
        let logmein = await this.$axios.post('/webapi/Login/PostLogin', {
          UserName: this.form.email,
          Password: this.form.password,
          Domain: window.location.hostname
        })
        this.isSubmitting=false
        if(logmein.data.ErrorList){
          this.errors = response.data.ErrorList
        }else{
          this.$router.push('/')
        }

      }catch(err){
        this.isSubmitting=false
        console.log(err)
      }
    }
  }
}
</script>
<style lang="scss">

</style>
