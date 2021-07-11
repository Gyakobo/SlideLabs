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
}
request_validator = Validator(request_schema)
# ~~~~~~END REQUEST VALIDATION SCHEMAS~~~~~~~~

async def create_slide(request): # todo make atomic transaction
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

    res = db.slides.insert_one({
        'components_tree': None,
    })
    slide_id = str(res.inserted_id)

    slide_ids = project['slide_ids']
    slide_ids.append(slide_id)
    db.projects.update_one(
        project_selector,
        {
            '$set': {'slide_ids': slide_ids}
        }
    )

    return web.json_response({
        'success': '',
        'slide_id': slide_id,
    })
