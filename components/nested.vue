<template>
  <draggable class="dragArea" tag="ul" :list="SubItemList" @change="sortMenu" group="sub">
    <li v-for="el in SubItemList" :key="el.Name">
      <div>{{ el.Name }}</div>
      <nested-draggable v-if="el.SubItemList" :SubItemList="el.SubItemList" :shopId="parseInt(shopId)"/>
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
    shopId: {
      required: true,
      type: Number
    },
  },
  components: {
    draggable
  },
  name: "nested-draggable",
  methods: {
    async sortMenu() {
			let _this = this
      _this.showPageOverlaySpinner()
			await this.$axios.$post('/webapi/Menu/PostSortMenu?shopId=' + _this.shopId, _this.SubItemList)
			.then(function (menu) {
          // _this.SubItemList = menu
          _this.hidePageOverlaySpinner()
			})
			.catch(function (error) {
          console.log(error)
          _this.hidePageOverlaySpinner()
			})
		},
    hidePageOverlaySpinner () {
        this.$store.commit('toggleProgressOverlay', false);
        this.$store.commit('togglePageOverlay', false)
    },
    showPageOverlaySpinner () {
        this.$store.commit('toggleProgressOverlay', true);
        this.$store.commit('togglePageOverlay', true)
    },
  },
}
</script>
<style scoped>
.dragArea {
  font-size: 13px;
  cursor: pointer;
  line-height: 1.3;
  min-height: 23px;
  /* outline: 1px dashed; */
  list-style: none;
  /* padding: 0 */
}
</style>