from aiohttp import web
from cerberus import Validator

import pymongo

from configs.config import CONFIG

# ~~~~~~START REQUEST VALIDATION SCHEMAS~~~~~~~~
request_schema = {
    'project_id': {
        'type': 'string',
        'required': True,
    },
    'changes': {
        'type': 'dict',
        'required': True,
    },
    'assert_changed': {
        'type': 'string',
    }
}
request_validator = Validator(request_schema)
# ~~~~~~END REQUEST VALIDATION SCHEMAS~~~~~~~~

async def update_project(request):
    r_json = await request.json()

    # ~~~~~~START VALIDATION~~~~~~~~
    if not request_validator.validate(r_json):
        return web.json_response({'input_error': request_validator.errors})
    # ~~~~~~END VALIDATION~~~~~~~~

    client = request.app['mongo_client']
    db = client[CONFIG.DATABASE_NAME]

    res = db.projects.update_one(
        {
            'project_id': r_json['project_id']
        },
        {
            '$set': r_json['changes']
        },
        upsert=False
    )
    if res.matched_count == 0:
        return web.json_response({'error': 'No such project!'})
    if res.modified_count == 0 and 'assert_changed' in r_json:
        return web.json_response({'error': 'Project not modified!'})

    return web.json_response({'success': ''})
