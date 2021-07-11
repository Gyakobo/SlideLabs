from aiohttp import web
from cerberus import Validator

import pymongo
from bson.objectid import ObjectId

from configs.config import CONFIG

# ~~~~~~START REQUEST VALIDATION SCHEMAS~~~~~~~~
request_schema = {
    'slide_id': {
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

async def update_slide(request):
    r_json = await request.json()

    # ~~~~~~START VALIDATION~~~~~~~~
    if not request_validator.validate(r_json):
        return web.json_response({'input_error': request_validator.errors})
    # ~~~~~~END VALIDATION~~~~~~~~

    client = request.app['mongo_client']
    db = client[CONFIG.DATABASE_NAME]

    slide_id = ObjectId(r_json['slide_id'])
    res = db.slides.update_one(
        {
            '_id': slide_id
        },
        {
            '$set': r_json['changes']
        },
        upsert=False
    )
    if res.matched_count == 0:
        return web.json_response({'error': 'No such slide!'})
    if res.modified_count == 0 and 'assert_changed' in r_json:
        return web.json_response({'error': 'Slide not modified!'})

    return web.json_response({'success': ''})
