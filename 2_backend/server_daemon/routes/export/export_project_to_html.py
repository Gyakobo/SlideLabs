from aiohttp import web
from cerberus import Validator

import subprocess
import ujson as json
import pymongo
from bson.objectid import ObjectId

from configs.config import CONFIG

# ~~~~~~START REQUEST VALIDATION SCHEMAS~~~~~~~~
request_schema = {
    'project_id': {
        'type': 'string',
        'schema': {
            'type': 'string',
        }
    },
}
request_validator = Validator(request_schema)
# ~~~~~~END REQUEST VALIDATION SCHEMAS~~~~~~~~

async def export_project_to_html(request):
    r_json = await request.json()

    # ~~~~~~START VALIDATION~~~~~~~~
    if not request_validator.validate(r_json):
        return web.json_response({'input_error': request_validator.errors})
    # ~~~~~~END VALIDATION~~~~~~~~

    client = request.app['mongo_client']
    db = client[CONFIG.DATABASE_NAME]

    project_id = r_json['project_id']
    project = db.projects.find_one({'project_id': project_id})
    if project is None:
        return web.json_response({'error': 'No such project!'})

    cmd = f'{CONFIG.PROJECT_DIR}/RES/webpage2html.py -s http://localhost:8081/slideshow/{project_id}'
    res = subprocess.run(
        cmd,
        shell=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        timeout=5
    )
    html = res.stdout.decode('utf-8')

    del project['_id']
    project_data = f'<div id="_project_data" data-json=\'{json.dumps(project)}\'></div>'

    slide_ids = project['slide_ids']
    slide_ids = [ObjectId(i) for i in slide_ids]
    slides_cursor = db.slides.find({'_id': {'$in': slide_ids}})
    slides_list = list(slides_cursor)
    for slide in slides_list:
        slide['_id'] = str(slide['_id'])
    slides_data = f'<div id="_slides_data" data-json=\'{json.dumps(slides_list)}\'></div>'

    idx = len('<!DOCTYPE html>')
    html = html[:idx] + project_data + slides_data + html[idx:]

    return web.json_response({'html': html})
