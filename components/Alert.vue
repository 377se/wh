<template>
  <div 
    :class="alertClass" 
    uk-alert>
    <div
      v-for="er in errorlist"
      :key="er.Name"
    >
      {{ er.Value }}
    </div>

    <div>
      {{ message }}
    </div>

  </div>
</template>

<script>
export default {
  props:{
    errorlist:{
      type: Array,
      default: () => [],
      required: true
    },
    message:{
      type: String,
      default: () => '',
      required: true
    },
    alertClass:{
      type: String,
      default: () => 'uk-alert-danger',
      required: false
    }
  }
}
</script>

<style>
</style>