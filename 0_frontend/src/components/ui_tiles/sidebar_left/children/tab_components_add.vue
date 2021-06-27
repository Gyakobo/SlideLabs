<template>
  <div class="slide_components_tree">
    <div>
      <button class="ui red button" @click="add_h1">Add h1</button>
    </div>
  </div>
</template>

<script>
import components_tree_controller_mixin from "../../../../store/components_tree_controller_mixin";

export default {
  mixins:[
      components_tree_controller_mixin
  ],
  data (){
    return {
    }
  },
  methods:{
    add_h1(){
      let root = this.get_ctree_root()
      if (root === null){
        return
      }
      root.add_child('sl_header')
    }
  },
  mounted() {
    setTimeout(() => {
      this.add_h1()
      this.add_h1()
      this.add_h1()
    }, 100)
  }
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
