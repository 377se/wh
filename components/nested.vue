<template>
  <draggable tag="ul" :SubItemList="SubItemList" @end="$store.commit('setListUpdated')">
    <li class="dragArea" v-for="el in SubItemList" :key="el.SortOrder">
      <div @click.prevent="$store.commit('setCategoryId', el.CategoryId)">{{ el.Name }}</div>
      <nested-draggable :SubItemList="el.SubItemList"/>
    </li>
  </draggable>
</template>
<script>
import draggable from 'vuedraggable'
export default {
  props: {
    SubItemList: {
      required: true,
      type: Array
    },
  },
  components: {
    draggable
  },
  name: "nested-draggable",
}
</script>
<style scoped>
.dragArea {
  font-size: 13px;
  cursor: pointer;
  line-height: 1.3;
  min-height: 43px;
  list-style: disc;
  outline: 1px dashed;
}
.mainTree {
  padding-left: 0;
}
</style>