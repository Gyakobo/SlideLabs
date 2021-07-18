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
          width:slide_width + 'px',
          height:slide_height + 'px'
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
    slide_width(){
      console.log('slide_width',  this.$store.state.screen_width)
      return this.$store.state.screen_width
    },
    slide_height(){
      return this.slide_width / this.project_settings.aspect_ratio_wh
    },
  },
  watch:{
    slide_width(new_value){
      this.presentation.slide_w_px = new_value
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
