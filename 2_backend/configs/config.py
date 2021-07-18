import os
import json

from configs.base_config import BaseConfig

import logging
logger = logging.getLogger('Config')
logger.setLevel(logging.DEBUG)

IS_PROD_SERVER = os.path.realpath(__file__).startswith('/home/ubuntu')

# Path helper
location = lambda x: os.path.join(
    os.path.dirname(os.path.realpath(__file__)), x)

class Config(BaseConfig):
    PROJECT_DIR = location('..')

    # ~~~~~~~~~~START WEB SERVER~~~~~~~~~~~~~~~~~~~~~
    WEB_SERVER_ADRESS = '127.0.0.1'
    WEB_SERVER_PORT = 2021

    TOKEN_LIFETIME_SECONDS = 3600 * 24 * 7
    TMP_TOKEN_LIFETIME_SECONDS = 3600
    TMP_USER_DELETE_SLEEP_SECONDS = 60 * 2

    IS_USE_CORS = not IS_PROD_SERVER
    # ~~~~~~~~~~END WEB SERVER~~~~~~~~~~~~~~~~~~~~~

    MONGODB_HOST = 'localhost'
    MONGODB_PORT = 27017
    MONGODB_MAX_POOL_SIZE = 200
    DATABASE_NAME = 'slidelab'

    # ~~~~~~~~~~~~~~~~~~~~~START LOGGING~~~~~~~~~~~~~~~~~~~~~
    LOGS_PATH = PROJECT_DIR + '/z_logs/'
    ONE_LOG_MAX_BYTES = 1024 * 1024 * 32  # 32mb
    LOG_BACKUP_COUNT = 3  # so total 96 mb
    # ~~~~~~~~~~~~~~~~~~~~~END LOGGING~~~~~~~~~~~~~~~~~~~~~

CONFIG = Config()

if __name__ == "__main__":
    from datetime import datetime
    with open(os.path.join(CONFIG.PROJECT_DIR, 'config_export%s.json') % str(datetime.now()), 'w') as outf:
        json.dump(CONFIG.variables(), outf)