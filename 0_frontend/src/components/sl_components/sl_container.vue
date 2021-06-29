<template>
  <div :id="components_tree_item.id" class="sl container">
    <keep-alive v-for="child in components_tree_item.children" :key="child">
      <component :is="child.type" :components_tree_item="child"></component>
    </keep-alive>
  </div>
</template>

<script>
import sl_header from "./sl_header";

export default {
  components:{
    sl_header
  },
  data(){
    return {
      container_flag:'',
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
