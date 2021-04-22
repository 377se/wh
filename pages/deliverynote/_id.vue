<template>
    <Deliverynotes :orders="this.$route.params.id" :isUnifaunTrue="false" />
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
