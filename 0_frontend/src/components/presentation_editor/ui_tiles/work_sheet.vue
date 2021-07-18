<template>
  <div
      id="zoomable_canvas"
      class="zoomable-canvas"
  >
    <div
        class="background"
        @click="set_active_component(null)"
    ></div>
    <div
        class="work-sheet"
        :style="{
          width: slide_width + 'px',
          height: slide_height + 'px',
          left: slide_left + 'px',
          top: slide_top + 'px',
        }"
    >
      <sl_container
          :components_tree_item="components_tree_root_item"
          :is_drag_resizer_enabled="false"
      ></sl_container>
    </div>
    <div class="buttons-row">
      <div
          class="ui icon button"
          title="Show slides"
          @pointerup.left="open_slideshow(false)"
          @pointerup.middle="open_slideshow(true)"
      >
        <i class="play icon"></i>
      </div>

      <div class="flex-spacer"></div>

      <div
          class="ui icon button"
          title="Reset zoom"
          @click="reset_zoom"
      >
        <i class="expand icon"></i>
      </div>
    </div>
  </div>
</template>

<script>
import sl_container from "../../../../../3_js_common/sl_components/sl_container";
import components_tree_controller_mixin from "../../../../../3_js_common/utils/components_tree/components_tree_controller_mixin";

export default {
  components:{
    sl_container
  },
  mixins:[
    components_tree_controller_mixin
  ],
  data (){
    return {
      zoomable_canvas_element: null,
      slide_zoom: 0,
      slide_x: 0,
      slide_y: 0,
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
    canvas_width(){
      let state = this.$store.state
      return state.screen_width - state.sidebar_left_width - state.sidebar_right_width
    },
    slide_width(){
      return this.canvas_width * this.slide_zoom
    },
    slide_height(){
      return this.slide_width / this.project_settings.aspect_ratio_wh
    },
    slide_left(){
      return this.canvas_width * this.slide_x
    },
    slide_top(){
      return this.canvas_width * this.slide_y
    },
  },
  watch:{
    slide_width(new_value){
      this.presentation.slide_w_px = new_value
    },
  },
  methods:{
    open_slideshow(is_new_tab){
      let project_id = this.presentation.current_project.project_id
      let url = this.$store.state.slideshow_url + '/slideshow/' + project_id

      console.log(is_new_tab)

      if(is_new_tab){
        window.open(url,'_blank')
      }else{
        window.open(url, '_self')
      }
    },
    zoom_in_out(event){
      let is_scroll_up = event.deltaY < 0
      let zoom_speed = 1.1
      let zoom_value = is_scroll_up ? zoom_speed : 1/zoom_speed

      let rect = this.zoomable_canvas_element.getBoundingClientRect()
      let x = event.clientX - rect.left
      let y = event.clientY - rect.top

      this.slide_zoom *= zoom_value
      let slide_left = x - (x - this.slide_left) * zoom_value
      let slide_top = y - (y - this.slide_top) * zoom_value

      this.slide_x = slide_left / this.canvas_width
      this.slide_y = slide_top / this.canvas_width
    },
    reset_zoom(){
      this.slide_zoom = 0.95
      this.slide_x = 0.025

      let rect = this.zoomable_canvas_element.getBoundingClientRect()
      let slide_top = rect.height / 2 - this.slide_height / 2
      this.slide_y = slide_top / this.canvas_width
    },
    add_listener(){
      this.zoomable_canvas_element.addEventListener('wheel', this.zoom_in_out)
    },
    remove_listener(){
      this.zoomable_canvas_element.removeEventListener('wheel', this.zoom_in_out)
    }
  },
  mounted() {
    this.zoomable_canvas_element = document.getElementById('zoomable_canvas')

    this.reset_zoom()
    this.add_listener()

    this.$store.state.components_tree_root_element = this.zoomable_canvas_element
  },
  beforeUnmount() {
    this.remove_listener()
  }
}
</script>

<style scoped>
.zoomable-canvas{
  position: relative;
  overflow: hidden;

  height: 100%;
  flex-grow: 1;
}

.buttons-row{
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;

  position: absolute;
  left: 0;
  top: 0;
  width: 100%;

  padding: 5px;

  background: rgba(0,0,0,0.05);
}

.flex-spacer{
  flex-grow: 1;
}

.buttons-row .ui.button{
  margin: 5px;
}
.buttons-row .ui.button i{
  color: #333;
}

.work-sheet{
  position: absolute;

  box-shadow: 0 0 10px rgba(0,0,0,0.5);
}

.background{
  width: 100%;
  height: 100%;
}

</style>
