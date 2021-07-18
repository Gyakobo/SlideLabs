<template>
  <div
      class="slide-wrapper"
  >
    <div
        class="background"
    ></div>
    <div
        class="slide-sheet"
        :style="{
          width:slide_size.width + 'px',
          height:slide_size.height + 'px'
        }"
    >
      <sl_container
          v-if="is_slide_loaded"
          :components_tree_item="components_tree_root_item"
          :is_drag_resizer_enabled="false"
      ></sl_container>
    </div>
  </div>
</template>

<script>
import sl_container from "../../../3_js_common/sl_components/sl_container";
import components_tree_controller_mixin from "../../../3_js_common/utils/components_tree/components_tree_controller_mixin";

export default {
  components:{
    sl_container
  },
  mixins:[
    components_tree_controller_mixin
  ],
  data (){
    return {
      is_slide_loaded:false,
    }
  },
  computed:{
    presentation(){
      return this.$store.state.presentation
    },
    components_tree_root_item(){
      return this.presentation.current_slide.components_tree
    },
    project_settings(){
      let current_project = this.presentation.current_project
      if (current_project === null){
        return {
          aspect_ratio_wh: 16/9
        }
      }
      return current_project.settings
    },
    slide_size(){
      let screen_w = this.$store.state.screen_width
      let screen_h = this.$store.state.screen_height
      let aspect_ratio_wh = this.project_settings.aspect_ratio_wh

      let size
      if (screen_w > screen_h * aspect_ratio_wh){
        size = {
          width: screen_h * aspect_ratio_wh,
          height: screen_h,
        }
      }else{
        size = {
          width: screen_w,
          height: screen_w / aspect_ratio_wh,
        }
      }
      return size
    },
  },
  watch:{
    slide_size(new_value){
      this.presentation.slide_w_px = new_value.width
    },
  },
  async created() {
    let project_id = window.location.pathname.split('/')[2]

    await this.$store.dispatch('get_project_by_id', {project_id:project_id})
    await this.$store.dispatch('get_slides')
    this.is_slide_loaded = true
  },
}
</script>

<style scoped>
.slide-wrapper{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.background{
  width: 100%;
  height: 100%;
}

.slide-sheet{
  position: absolute;
  overflow: hidden;

  box-shadow: 0 0 10px rgba(0,0,0,0.5);
}

.reset-zoom-button i{
  color: #333;
}


</style>
