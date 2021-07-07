<template>
  <div id="components_tree_root_element" class="work-sheet-wrapper">
    <div class="work-sheet" :style="{width:width + 'px', height:height + 'px'}">
      <sl_container
          :components_tree_item="components_tree_root_item"
          :is_drag_resizer_enabled="false"
      ></sl_container>
    </div>
  </div>
</template>

<script>
import sl_container from "../sl_components/sl_container";
import components_tree_controller_mixin from "../../../utils/components_tree/components_tree_controller_mixin";

export default {
  components:{
    sl_container
  },
  mixins:[
    components_tree_controller_mixin
  ],
  data (){
    return {
      project_settings: this.$store.state.project_settings,
      components_tree_root_item:null,
    }
  },
  computed:{
    width(){
      let state = this.$store.state
      return state.screen_width - state.sidebar_left_width - state.sidebar_right_width - 30.5
    },
    height(){
      return this.width / this.project_settings.aspect_ratio_wh
    }
  },
  created() {
    this.components_tree_root_item = this.get_ctree_root()
  },
  mounted() {
    this.$store.state.components_tree_root_element = document.getElementById('components_tree_root_element')
  }
}
</script>

<style scoped>
.work-sheet-wrapper{
  display: flex;
  flex-direction: row;
  align-items: center;
  overflow: hidden;

  height: 100%;
  width: fit-content;
}

.work-sheet{
  margin: 15px;
  box-shadow: 0 0 10px rgba(0,0,0,0.5);
}

</style>
