import { backend_request, on_http_error, check_backend_error } from "../utils/transport/transport"

export default {
  state:{
    active_project:null,
    projects:[],
  },
  mutations:{
    set_active_project(state, data){
      state.active_project = data
    }
  },
  actions:{
    async create_project(context, data) {
      await backend_request(
        'create_project',
        {
          project_id: data.project_id,
          title: data.title,
        },
        check_backend_error,
        on_http_error,
      )
    },

    async get_projects(context) {
      await backend_request(
        'get_projects',
        {},
        (r_json) => {
          if (check_backend_error(r_json)){
            context.state.projects = r_json.projects
          }
        },
        on_http_error,
      )
    },

    async update_active_project(context, data) {
      let data_json = {
        changes: context.state.active_project
      }
      if (data !== undefined && Object.prototype.hasOwnProperty.call(data, 'last_project_id')){
        data_json['project_id'] = data.last_project_id
        data_json['assert_changed'] = ''
      } else {
        data_json['project_id'] = context.state.active_project.project_id
      }

      await backend_request(
        'update_project',
        data_json,
        check_backend_error,
        on_http_error,
      )
    },

    async delete_active_project(context) {
      await backend_request(
        'delete_project',
        {
          project_id: context.state.active_project.project_id,
        },
        check_backend_error,
        on_http_error,
      )
      context.state.active_project = null
      await context.dispatch('get_projects')
    },

  }
}
