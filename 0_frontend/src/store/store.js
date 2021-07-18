import { createStore } from 'vuex'

import screen_width_settings from "../../../3_js_common/utils/screen_width/screen_width_settings";

import file_manager from "./file_manager";
import presentation_editor from "./presentation_editor";

let slideshow_url
if (window.location.hostname === 'slidelab.ru'){
  slideshow_url = 'https://slidelab.ru/slideshow/'
}else{
  slideshow_url = 'http://localhost:8081'
}

export default createStore({
  modules:{
    file_manager, presentation_editor
  },
  state () {
    return {
      slideshow_url:slideshow_url,

      screen_width:0,
      screen_height:0,
      SCREEN_TYPES:screen_width_settings.SCREEN_TYPES,
      screen_type:screen_width_settings.SCREEN_TYPES.BIG,

      sidebar_left_width: 320,
      sidebar_right_width: 320,

      presentation:{
        is_editable:true,

        current_project:null,
        current_slide:null,
        slide_w_px:0,
      },

      components_tree_root:null,
      active_component:null,
      components_tree_root_element:null
    }
  }
})
