import { backend_request } from "../utils/transport/transport"

function on_http_error(){
  alert('No connection with server!')
}

function check_backend_error(r_json){
  if (Object.prototype.hasOwnProperty.call(r_json, 'error')){
    alert(r_json['error'])
  }
}

export default {
  state:{
    projects:[],
  },
  actions:{
    async get_projects(context) {
      await backend_request(
        'get_projects',
        {},
        (r_json) => {
          context.state.projects = r_json.projects
        },
        on_http_error,
      )
    },

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

  }
}
