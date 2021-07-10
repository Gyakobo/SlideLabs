import { createStore } from 'vuex'

import screen_width_settings from "../utils/screen_width/screen_width_settings";

import file_manager from "./file_manager";

export default createStore({
  modules:{
    file_manager
  },
  state () {
    return {
      // backend_url: backend_url,

      screen_width:0,
      SCREEN_TYPES:screen_width_settings.SCREEN_TYPES,
      screen_type:screen_width_settings.SCREEN_TYPES.BIG,

      sidebar_left_width: 320,
      sidebar_right_width: 320,

      project_settings:{
        aspect_ratio_wh:16/9,
      },

      components_tree_root:null,
      active_component:null,
      components_tree_root_element:null
    }
  }
})
