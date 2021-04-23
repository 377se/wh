<template>
    <div id="sc-page-wrapper">
      <div id="sc-page-content">
        <button v-waves.button.light class="sc-button sc-button-primary uk-margin-medium-right" @click="$router.go(-1)">
            TILLBAKA
        </button>
        <Deliverynotes :orders="this.$route.params.id.split(',')" :isUnifaunTrue="false" />
      </div>
    </div>
</template>

<script>
import Deliverynotes from '~/components/Deliverynotes'

export default {
  components: {
    Deliverynotes,
  },
}
</script>

<style lang="scss" scoped>

</style>
