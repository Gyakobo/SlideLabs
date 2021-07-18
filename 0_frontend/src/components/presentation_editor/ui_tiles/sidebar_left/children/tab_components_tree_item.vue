<template>
  <ul class="tree-item" :class="{folder:is_folder, collapsed:is_collapsed}">
    <div class="tree-item-header" :class="{active:components_tree_item.is_active}">
      <i v-if="is_folder" class="angle down icon" @click="toggle_collapse"></i>
      <i v-if="is_folder" class="angle right icon" @click="toggle_collapse"></i>
      <i v-if="is_folder" class="folder outline icon" @click="toggle_collapse"></i>
      <i v-else class="file outline icon"></i>

      <span class="header-text" @click="set_active_component(components_tree_item)">{{header_text}}</span>

    </div>
    <li v-if="is_folder" class="tree-list">
      <keep-alive v-for="child in components_tree_item.children" :key="child.id">
        <component :is="'tab_components_tree_item'" :components_tree_item="child"></component>
      </keep-alive>
    </li>
  </ul>
</template>

<script>
import components_tree_controller_mixin from "../../../../../../../3_js_common/utils/components_tree/components_tree_controller_mixin";

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
    components_tree_item:{
      type:Object,
      required:true,
    }
  },
  computed:{
    header_text(){
      return 'ID:' +  this.components_tree_item.id
    }
  },
  methods:{
    toggle_collapse(){
      this.is_collapsed = !this.is_collapsed
    },
  },
  created() {
    this.is_folder = this.components_tree_item.is_folder
  },
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
.tree-item-header.active {
  background-color: rgba(0,0,0,0.15)
}
.tree-item-header.active:hover {
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
