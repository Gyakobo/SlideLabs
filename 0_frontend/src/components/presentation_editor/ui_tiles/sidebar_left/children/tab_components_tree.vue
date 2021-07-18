<template>
  <div class="tree-wrapper">
    <tab_components_tree_item :components_tree_item="components_tree_root_item"></tab_components_tree_item>
  </div>
</template>

<script>
import components_tree_controller_mixin from "../../../../../../../3_js_common/utils/components_tree/components_tree_controller_mixin";
import tab_components_tree_item from "./tab_components_tree_item";

export default {
  components:{
    tab_components_tree_item
  },
  mixins:[
      components_tree_controller_mixin
  ],
  data (){
    return {
    }
  },
  computed:{
    components_tree_root_item(){
      return this.$store.state.presentation.current_slide.components_tree
    }
  },
}
</script>

<style scoped>
.tree-wrapper{
  width: 100%;
  height: 100%;
  padding: 10px;

  background: #eee;
  color: #333;

  overflow-y: auto;
  overflow-x: hidden;
}

.tree-wrapper ul, li {
  list-style-type: none;
  margin:0;
}

</style>
