<template>
  <div
      :id="components_tree_item.id"
      class="sl container"
      :style="dr_style"
  >
    <keep-alive v-for="child in components_tree_item.children" :key="child">
      <component :is="child.type" :components_tree_item="child"></component>
    </keep-alive>
  </div>
</template>

<script>
import sl_header from "./sl_header";
import draggable_resizable_component_mixin from "../../utils/drag_resize/draggable_resizable_component_mixin";

export default {
  components:{
    sl_header
  },
  mixins: [
      draggable_resizable_component_mixin
  ],
  data(){
    return {
    }
  },
  props:{
    components_tree_item:{
      type:Object,
      required:true,
    },
  },
}
</script>

<style scoped>
.sl.container {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
