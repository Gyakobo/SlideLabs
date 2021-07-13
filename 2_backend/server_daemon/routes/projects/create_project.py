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
    'title': {
        'type': 'string',
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

    project = {
        'slide_ids': [],
        'settings': {
            'aspect_ratio_wh': 16/9
        }
    }
    project.update(r_json)

    project_id = r_json['project_id']

    try:
        res = db.projects.insert_one(project)
    except pymongo.errors.DuplicateKeyError:
        return web.json_response({
            'error': f'project_id "{project_id}" already exists!'
        })

    # ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    res = db.slides.insert_one({
        'components_tree': None,
    })
    slide_id = str(res.inserted_id)

    db.projects.update_one(
        {'project_id': project_id},
        {
            '$set': {'slide_ids': [slide_id]}
        }
    )

    return web.json_response({'success': ''})
