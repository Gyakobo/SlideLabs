from aiohttp import web
from cerberus import Validator

import pymongo

from configs.config import CONFIG

# ~~~~~~START REQUEST VALIDATION SCHEMAS~~~~~~~~
request_schema = {
    'project_ids': {
        'type': 'list',
        'schema': {
            'type': 'string',
        }
    },
}
request_validator = Validator(request_schema)
# ~~~~~~END REQUEST VALIDATION SCHEMAS~~~~~~~~

async def get_projects(request):
    r_json = await request.json()

    # ~~~~~~START VALIDATION~~~~~~~~
    if not request_validator.validate(r_json):
        return web.json_response({'input_error': request_validator.errors})
    # ~~~~~~END VALIDATION~~~~~~~~

    client = request.app['mongo_client']
    db = client[CONFIG.DATABASE_NAME]

    if 'project_ids' in r_json:
        project_ids = r_json['project_ids']
        projects_cursor = db.projects.find({'project_id': {'$in': project_ids}})
        projects_list = list(projects_cursor)
    else:
        projects_list = list(db.projects.find())
    for project in projects_list:
        del project['_id']

    return web.json_response({'projects': projects_list})
