import { createStore } from 'vuex'

import screen_width_settings from "../screen_width_utils/screen_width_settings";

import slide_components_tree from "./slide_components_tree";

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
  modules:{
    slide_components_tree
  },
  state () {
    return {
      // backend_url: backend_url,

      screen_width:0,
      SCREEN_TYPES:screen_width_settings.SCREEN_TYPES,
      screen_type:screen_width_settings.SCREEN_TYPES.BIG,

      sidebar_left_width: 300,
      sidebar_right_width: 300,
      root_container:null,
    }
  }
})
