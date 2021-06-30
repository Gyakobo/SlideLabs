<template>
  <div
      :id="components_tree_item.id"
      class="sl header"
      :class="{active:components_tree_item.is_active}"
      :style="dr_style"
      @pointerdown="set_active_component(components_tree_item)"
  >
    <h1 class="ui header">{{ text }}</h1>
  </div>
</template>

<script>
import draggable_resizable_component_mixin from "../../utils/drag_resize/draggable_resizable_component_mixin";
import components_tree_controller_mixin from "../../utils/components_tree/components_tree_controller_mixin";

export default {
  mixins:[
    draggable_resizable_component_mixin,
    components_tree_controller_mixin
  ],
  data (){
    return {
      text:'Yet another header'
    }
  },
  props:{
    components_tree_item:{
      type:Object,
      required:true,
    }
  },
  computed:{
    is_active(){
      return this.components_tree_item.is_active
    }
  },
  watch:{
    is_active(new_value){
      if(new_value){
        this.resizer.set_actions(['top', 'bottom', 'left', 'right', 'drag'])
      }else{
        this.resizer.set_actions(['drag'])
      }
    }
  },
  created() {
    this.init_size(100, 100)
  }
}
</script>

<style scoped>
.sl.header{
  width: fit-content;
  height: fit-content;

  position: absolute;
  user-select: none;
}

</style>
