<template>
  <div
      :id="components_tree_item.id"
      class="sl container"
      :style="root_element_dr_style"
      @pointerdown="set_active_component(components_tree_item, $event)"
  >
    <component
        v-for="child in components_tree_item.children"
        :key="child.id"
        :is="child.type"
        :components_tree_item="child"
    ></component>
  </div>
</template>

<script>
import sl_header from "./sl_header/sl_header";
import draggable_resizable_component_mixin from "../utils/drag_resize/draggable_resizable_component_mixin";
import components_tree_controller_mixin from "../utils/components_tree/components_tree_controller_mixin";

export default {
  components:{
    sl_header
  },
  mixins: [
    draggable_resizable_component_mixin,
    components_tree_controller_mixin
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
