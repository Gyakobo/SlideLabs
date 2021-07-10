/* eslint-disable */

let backend_url
if (window.location.hostname === 'slidelab.ru'){
  backend_url = 'https://slidelab.ru/backend/'
}else{
  backend_url = 'http://localhost:2021/backend/'
}



export async function backend_request(rel_url, data_json, on_success_f, on_error_f){
  let data_string = JSON.stringify(data_json);
  let url = backend_url + rel_url

  await $.post(url, data_string).done(on_success_f).fail(on_error_f)
}
