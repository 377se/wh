<template>
  <draggable tag="ul" :list="SubItemList" @end="$store.commit('setListUpdated')" group="sub">
    <li class="dragArea" v-for="el in SubItemList" :key="el.Name">
      <div @click.prevent="$store.commit('setCategoryId', el.CategoryId)">{{ el.Name }}</div>
      <nested-draggable v-if="el.SubItemList" :SubItemList="el.SubItemList"/>
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
  min-height: 23px;
  list-style: none;
}
.mainTree {
  padding-left: 0;
}
</style>