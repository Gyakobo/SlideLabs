<template>
  <div class="work-sheet-wrapper">
    <div class="work-sheet" :style="{width:width + 'px', height:height + 'px'}">
      <sl_container ref="root_container" id="root_container">
      </sl_container>
    </div>
  </div>
</template>

<script>
import sl_container from "../sl_components/sl_container";
import drag_resizer from "../../utils/drag_resize/drag_resizer";
import components_tree_controller_mixin from "../../store/components_tree_controller_mixin";

export default {
  components:{
    sl_container
  },
  mixins:[
    components_tree_controller_mixin
  ],
  data (){
    return {
      aspect_ratio_wh: 16/9,
      resizer: null
    }
  },
  computed:{
    width(){
      let state = this.$store.state
      return state.screen_width - state.sidebar_left_width - state.sidebar_right_width - 30.5
    },
    height(){
      return this.width / this.aspect_ratio_wh
    }
  },
  mounted() {
    this.set_ctree_root(this.$refs.root_container)

    let resizer = new drag_resizer.DragResizer()
    resizer.set_actions()
    resizer.add_listeners()
    this.resizer = resizer
  },
  beforeUnmount() {
    this.resizer.remove_listeners()
  }
}
</script>

<style scoped>
.work-sheet-wrapper{
  display: flex;
  flex-direction: row;
  align-items: center;

  height: 100%;
  width: fit-content;
}

.work-sheet{
  margin: 15px;
  box-shadow: 0 0 10px rgba(0,0,0,0.5);
}

</style>
