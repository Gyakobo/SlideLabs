from aiohttp import web
from cerberus import Validator

import pymongo

from configs.config import CONFIG

# ~~~~~~START REQUEST VALIDATION SCHEMAS~~~~~~~~
request_schema = {
    'project_id':{
        'type':'string',
        'required': True,
    },
    'title':{
        'type':'string',
        'required': True,
    },
}
request_validator = Validator(request_schema)
# ~~~~~~END REQUEST VALIDATION SCHEMAS~~~~~~~~

async def create_project(request):
    r_json = await request.json()

    # ~~~~~~START VALIDATION~~~~~~~~
    if not request_validator.validate(r_json):
        return web.json_response({'input_error': request_validator.errors})
    # ~~~~~~END VALIDATION~~~~~~~~

    client = request.app['mongo_client']
    db = client[CONFIG.DATABASE_NAME]
    projects = db.projects

    try:
        res = projects.insert_one(r_json)
    except pymongo.errors.DuplicateKeyError:
        return web.json_response({
            'error': f'project_id "{r_json["project_id"]}" already exists!'
        })

    return web.json_response({'success':''})