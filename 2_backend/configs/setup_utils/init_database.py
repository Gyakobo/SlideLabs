#!/bin/sh
"exec" "`dirname $0`/../../venv/bin/python" "$0" "$@"

import os
import sys
# gets path of project directory
path = os.path.dirname(os.path.abspath(__file__))
sys.path.append(os.path.join(path, '../..'))

import pymongo

from configs.config import CONFIG

client = pymongo.MongoClient(CONFIG.MONGODB_HOST, CONFIG.MONGODB_PORT)
db = client[CONFIG.DATABASE_NAME]

db.projects.delete_many( { } )
db.projects.create_index([('project_id', pymongo.ASCENDING)], unique=True)

print(sorted(list(db.projects.index_information())))