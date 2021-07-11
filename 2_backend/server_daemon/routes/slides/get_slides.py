from aiohttp import web
from cerberus import Validator

import pymongo
from bson.objectid import ObjectId

from configs.config import CONFIG

# ~~~~~~START REQUEST VALIDATION SCHEMAS~~~~~~~~
request_schema = {
    'slide_ids': {
        'type': 'list',
        'required': True,
        'schema': {
            'type': 'string',
        }
    },
}
request_validator = Validator(request_schema)
# ~~~~~~END REQUEST VALIDATION SCHEMAS~~~~~~~~

async def get_slides(request):
    r_json = await request.json()

    # ~~~~~~START VALIDATION~~~~~~~~
    if not request_validator.validate(r_json):
        return web.json_response({'input_error': request_validator.errors})
    # ~~~~~~END VALIDATION~~~~~~~~

    client = request.app['mongo_client']
    db = client[CONFIG.DATABASE_NAME]

    slide_ids = r_json['slide_ids']
    slide_ids = [ObjectId(i) for i in slide_ids]
    slides_cursor = db.slides.find({'_id': {'$in': slide_ids}})
    slides_list = list(slides_cursor)
    for slide in slides_list:
        slide['_id'] = str(slide['_id'])

    return web.json_response({'slides': slides_list})
