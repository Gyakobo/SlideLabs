<template>
  <ul class="tree-item" :class="{folder:is_folder, collapsed:is_collapsed}">
    <div class="tree-item-header" @click="toggle_collapse">
      <i v-if="is_folder" class="angle down icon"></i>
      <i v-if="is_folder" class="angle right icon"></i>
      <i v-if="is_folder" class="folder outline icon"></i>
      <i v-else class="file outline icon"></i>

      <span class="header-text">{{header_text}}</span>

    </div>
    <li v-if="is_folder" class="tree-list">
      <keep-alive v-for="child in children" :key="child.id">
        <component :is="'tab_components_tree_item'" :real_component="child.component_ref"></component>
      </keep-alive>
    </li>
  </ul>
</template>

<script>
import components_tree_controller_mixin from "../../../../store/components_tree_controller_mixin";

var tab_components_tree_item = {
  mixins:[
      components_tree_controller_mixin
  ],
  data (){
    return {
      children:null,
      is_folder:false,
      is_collapsed:false,
    }
  },
  props:{
    real_component:{
      type:Object,
      required:true,
    }
  },
  computed:{
    header_text(){
      return 'ID:' +  this.real_component.id
    }
  },
  methods:{
    toggle_collapse(){
      this.is_collapsed = !this.is_collapsed
    },
  },
  mounted() {
    let is_real_container = this.is_container(this.real_component)
    this.is_folder = is_real_container
    if (is_real_container){
      this.children = this.real_component.get_children()
    }
  }
}
tab_components_tree_item.components = {
  tab_components_tree_item
}
export default tab_components_tree_item
</script>

<style scoped>
.tree-item {
  display:flex;
  flex-direction:column;
  padding-left: 35px;
}
.tree-item.folder {
  padding-left: 15px;
}

.tree-item-header {
  display:flex;
  flex-direction:row;
  justify-content:left;
  color: #333;
  cursor: pointer;
}
.tree-item-header:hover {
  background-color: rgba(0,0,0,0.1)
}
.tree-item-header.highlight {
  background-color: rgba(0,0,0,0.15)
}
.tree-item-header.highlight:hover {
  background-color: rgba(0,0,0,0.2)
}

.tree-list{
  border-left: 1px solid #999;
}

.tree-item.collapsed .tree-list {
  display: none;
}
.tree-item.collapsed .angle.down.icon {
  display: none;
}
.tree-item .angle.right.icon {
  display: none;
}
.tree-item.collapsed .angle.right.icon {
  display: block;
}

</style>
