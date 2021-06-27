<template>
  <div class="tree-wrapper">
    <div v-if="is_tree_root_loaded">
      <tab_components_tree_item :real_component="tree_root"></tab_components_tree_item>
    </div>
  </div>
</template>

<script>
import components_tree_controller_mixin from "../../../../store/components_tree_controller_mixin";
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
      is_tree_root_loaded:false,
      tree_root:null
    }
  },
  mounted() {
    setTimeout(() => {
      this.tree_root = this.get_ctree_root()
      this.is_tree_root_loaded = true
    }, 100)
  }
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
