<template>
  <div>
    <pre>{{ valueString }}</pre>
  </div>
</template>
<script>
const props = {
  name: "raw-displayer",
  value: {
    required: true
  }
};
export default {
  props,
  computed: {
    valueString() {
      return JSON.stringify(this.value, null, 2);
    }
  }
};
</script>
<style scoped>
pre {
  text-align: start;
}
</style>