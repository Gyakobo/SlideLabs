<template>
  <div class="slide_components_tree">
    <div>
      <button class="ui red button" @click="add_h1">Add h1</button>
    </div>
  </div>
</template>

<script>
import components_tree_controller_mixin from "../../../../../utils/components_tree/components_tree_controller_mixin";

export default {
  mixins:[
      components_tree_controller_mixin
  ],
  data (){
    return {
      components_tree_root_item:null,
    }
  },
  methods:{
    add_h1(){
      let root = this.components_tree_root_item
      root.add_child('sl_header')
    }
  },
  created() {
    this.components_tree_root_item = this.get_ctree_root()

    this.add_h1()
    this.add_h1()
    this.add_h1()
  },
}
</script>

<style scoped>
.slide_components_tree{
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;

  background: #eee;
  color: var(--blue-dark);

  font-size: 20px;
}

</style>
