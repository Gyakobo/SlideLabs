<template>
  <div class="slide_components_tree">
    <div>
      <button class="ui red button" @click="add_h1">Add h1</button>
    </div>
  </div>
</template>

<script>
import components_tree_controller_mixin from "../../../../../../../3_js_common/utils/components_tree/components_tree_controller_mixin";

export default {
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
  methods:{
    add_h1(){
      let root = this.components_tree_root_item
      root.add_child('sl_header')
    }
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
