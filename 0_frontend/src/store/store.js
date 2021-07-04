import { createStore } from 'vuex'

import screen_width_settings from "../utils/screen_width/screen_width_settings";

// var backend_url
// if (window.location.hostname === 'nut-nut.ru'){
//   backend_url = 'https://nut-nut.ru/backend/'
// }else if(window.location.hostname === '192.168.1.52'){
//   backend_url = 'https://192.168.1.52/backend/'
// }else{
//   // backend_url = 'http://192.168.1.52/backend/'
//   backend_url = 'http://localhost:2021/backend/'
// }

export default createStore({
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
