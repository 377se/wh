<template>
  <div 
    v-if="this.$store.getters.alertsState[id].visible"
    :class="alertClass"
    class="alert uk-margin-bottom" 
    >
    <div
      v-for="error in errorlist"
      :key="error.Name"
    >
      {{ error.Value }}
    </div>
    <div>
      {{ message }}
    </div>
    <div class="close-button uk-position-top-right"><i class="mdi mdi-close" @click="closeAlert"></i></div>
  </div>
</template>

<script>

export default {
    props:{
        errorlist: {
            type: Array,
            default: () => [],
            required: false
        },
        message: {
            type: String,
            default: () => '',
            required: false
        },
        alertClass: {
            type: String,
            default: () => 'uk-alert-danger',
            required: false
        },
        id: {
            type: [String, Number],
            default: () => null,
            required: true
        },
    },
    methods: {
        closeAlert () {
            this.$store.commit('setAlertHidden', this.id)
        },
    },
}
</script>
<style lang="scss" scoped>
    .alert {
        position: relative;
        border-radius: 5px;
        margin: 10px 0;
        padding: 10px;
        font-size: 1rem;
        line-height: 1;
    }
    .close-button {
        width: 30px;
        height: 30px;
        line-height: 1.5;
        cursor: pointer;
        opacity: 0.7;
        transition: 500ms;
    }
    .close-button:hover {
        opacity: 1;
    }
</style>