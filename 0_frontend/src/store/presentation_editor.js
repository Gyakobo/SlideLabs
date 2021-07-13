import router from "../router/router";
import { backend_request, on_http_error, check_backend_error } from "../utils/transport/transport"
import ctcm from "../utils/components_tree/components_tree_controller_mixin";

export default {
  state:{
    current_project:null,
    current_slide:null,
  },
  actions: {
    async get_project_by_id(context, data) {
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
              context.state.current_project = projects[0]
            }
          }
        },
        on_http_error,
      )
    },

    async update_current_project(context) {
      await backend_request(
        'update_project',
        {
          project_id: context.state.current_project.project_id,
          changes: context.state.current_project
        },
        check_backend_error,
        on_http_error,
      )
    },

    async get_slide_by_id(context, data) {
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
              context.state.current_slide = slide

              slide.components_tree = ctcm.methods.deserialize_ctree(slide.components_tree)
            }
          }
        },
        on_http_error,
      )
    },

    async update_current_slide(context) {
      await backend_request(
        'update_slide',
        {
          slide_id: context.state.current_slide._id,
          changes: context.state.current_slide
        },
        check_backend_error,
        on_http_error,
      )
    },

  }
}
