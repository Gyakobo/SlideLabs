import { createStore } from 'vuex'

import screen_width_settings from "../../../3_js_common/utils/screen_size/screen_size_settings";
import {backend_request, check_backend_error, on_http_error} from "../../../3_js_common/utils/transport/transport";
import {deserialize_ctree} from "../../../3_js_common/utils/components_tree/components_tree_controller_mixin";

export default createStore({
  state () {
    return {
      screen_width:0,
      screen_height:0,
      SCREEN_TYPES:screen_width_settings.SCREEN_TYPES,
      screen_type:screen_width_settings.SCREEN_TYPES.BIG,

      is_presentation_editable:false,

      presentation:{
        is_editable:false,

        current_project:null,
        current_slide:null,
        slide_w_px:0,

        slides:null,
      },

    }
  },
  actions:{
    async get_project_by_id(context, data) {
      let presentation = context.state.presentation
      let project_id = data.project_id

      await backend_request(
        'get_projects',
        {
          'project_ids':[project_id]
        },
        (r_json) => {
          if (check_backend_error(r_json)){
            let projects = r_json.projects
            if (projects.length === 0) {
              alert(`No such project: "${project_id}"!`)
            } else {
              presentation.current_project = projects[0]
            }
          }
        },
        on_http_error,
      )
    },

    async get_slides(context) {
      let presentation = context.state.presentation
      let current_project = presentation.current_project
      if (current_project === null){
        alert('Cannot get slides: project is not loaded!')
        return
      }

      await backend_request(
        'get_slides',
        {
          'slide_ids':current_project.slide_ids
        },
        (r_json) => {
          if (check_backend_error(r_json)){
            let slides = r_json.slides
            presentation.slides = slides

            if (slides.length === 0) {
              alert(`Project has no slides!`)
            } else {
              let slide = slides[0]
              slide.components_tree = deserialize_ctree(slide.components_tree)

              presentation.current_slide = slide
            }
          }
        },
        on_http_error,
      )
    },
  }
})
