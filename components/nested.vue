<template>
    <draggable  
        class="dragArea" 
        ghost-class="ghost"
        tag="ul" 
        :list="SubItemList" 
        @end="$store.commit('setListUpdated')" 
        :group="{ name: 'g1' }
    ">
    <li v-for="el in SubItemList" :key="el.name">
      <p @click="$store.commit('setCategoryId', el.CategoryId)">{{ el.Name }}</p>
      <nested-draggable :SubItemList="el.SubItemList" />
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
    }
  },
  components: {
    draggable
  },
  name: "nested-draggable"
};
</script>
<style lang="scss" scoped>
    .dragArea {
        font-size: 14px;
        height: auto;
        list-style-type: none;
        padding: 0;
        & p {
            margin: 0;
            cursor: pointer;
        }
        & ol, ul {
            padding: 0 0 0 15px;
        }
    }
    .ghost {
        opacity: 0.7;
        background: #0097a5;
    }
</style>
