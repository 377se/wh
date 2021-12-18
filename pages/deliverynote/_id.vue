<template>
    <div id="sc-page-wrapper">
      <div id="sc-page-content">
        <button v-waves.button.light class="sc-button sc-button-primary uk-margin-medium-right" @click="$router.go(-1)">
            TILLBAKA
        </button>
        <Deliverynotes :orders="$route.params.id.split(',')" :isUnifaunTrue="false" :isPrintPickingList="false" :isDirectPrintout="false" ref="form" />
      </div>
    </div>
</template>

<script>
import Deliverynotes from '~/components/Deliverynotes'

export default {
  components: {
    Deliverynotes,
  },
  mounted () {
    this.getPrintout()
  },
  methods: {
    getPrintout() {
      this.$refs.form.getPrintout()
    },
  },
}
</script>

<style lang="scss" scoped>

</style>
