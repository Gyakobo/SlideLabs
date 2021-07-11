from aiohttp import web
from cerberus import Validator

import pymongo
from bson.objectid import ObjectId

from configs.config import CONFIG

# ~~~~~~START REQUEST VALIDATION SCHEMAS~~~~~~~~
request_schema = {
    'project_id': {
        'type': 'string',
        'required': True,
    },
    'slide_id': {
        'type': 'string',
        'required': True,
    },
}
request_validator = Validator(request_schema)
# ~~~~~~END REQUEST VALIDATION SCHEMAS~~~~~~~~

async def delete_slide(request):
    r_json = await request.json()

    # ~~~~~~START VALIDATION~~~~~~~~
    if not request_validator.validate(r_json):
        return web.json_response({'input_error': request_validator.errors})
    # ~~~~~~END VALIDATION~~~~~~~~

    client = request.app['mongo_client']
    db = client[CONFIG.DATABASE_NAME]

    project_selector = {'project_id': r_json['project_id']}
    project = db.projects.find_one(project_selector)
    if project is None:
        return web.json_response({'error': 'No such project!'})

    slide_id = r_json['slide_id']
    slide_ids = project['slide_ids']
    if slide_id not in slide_ids:
        return web.json_response({'error': 'No such slide in project!'})

    slide_ids.remove(slide_id)
    db.projects.update_one(
        project_selector,
        {
            '$set': {'slide_ids': slide_ids}
        }
    )

    res = db.slides.delete_one({'_id': ObjectId(slide_id)})
    if res.deleted_count == 0:
        return web.json_response({'error': 'No such slide in collection!'})

    return web.json_response({'success': ''})
