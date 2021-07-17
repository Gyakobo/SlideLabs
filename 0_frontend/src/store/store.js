import { createStore } from 'vuex'

import screen_width_settings from "../utils/screen_width/screen_width_settings";

import file_manager from "./file_manager";
import presentation_editor from "./presentation_editor";

export default createStore({
  modules:{
    file_manager, presentation_editor
  },
  state () {
    return {
      screen_width:0,
      screen_height:0,
      SCREEN_TYPES:screen_width_settings.SCREEN_TYPES,
      screen_type:screen_width_settings.SCREEN_TYPES.BIG,

      sidebar_left_width: 320,
      sidebar_right_width: 320,

      components_tree_root:null,
      active_component:null,
      components_tree_root_element:null
    }
  }
})
