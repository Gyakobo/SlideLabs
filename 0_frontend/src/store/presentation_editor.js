import router from "../router/router";
import { backend_request, on_http_error, check_backend_error } from "../../../3_js_common/utils/transport/transport"
import {serialize_ctree, deserialize_ctree} from "../../../3_js_common/utils/components_tree/components_tree_controller_mixin";

export default {
  state:{
  },
  actions: {
    async get_project_by_id(context, data) {
      let presentation =  context.rootState.presentation
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
              router.push({name:'file_manager'})
            } else {
              presentation.current_project = projects[0]
            }
          }
        },
        on_http_error,
      )
    },

    async update_current_project(context) {
      let presentation =  context.rootState.presentation

      await backend_request(
        'update_project',
        {
          project_id: presentation.current_project.project_id,
          changes: presentation.current_project
        },
        check_backend_error,
        on_http_error,
      )
    },

    async get_slide_by_id(context, data) {
      let presentation =  context.rootState.presentation
      let slide_id = data.slide_id

      await backend_request(
        'get_slides',
        {
          'slide_ids':[slide_id]
        },
        (r_json) => {
          if (check_backend_error(r_json)){
            let slides = r_json.slides
            if (slides.length === 0) {
              alert(`No such slide: "${slide_id}"!`)
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

    async update_current_slide(context) {
      let presentation =  context.rootState.presentation
      let ctree_json = serialize_ctree(presentation.current_slide.components_tree)

      await backend_request(
        'update_slide',
        {
          slide_id: presentation.current_slide._id,
          changes: {
            'components_tree': ctree_json,
          }
        },
        check_backend_error,
        on_http_error,
      )
    },

  }
}
