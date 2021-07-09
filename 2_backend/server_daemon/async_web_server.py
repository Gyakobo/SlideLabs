#!/bin/sh
"exec" "`dirname $0`/../venv/bin/python" "$0" "$@"

import os
import sys
# gets path of project directory
path = os.path.dirname(os.path.abspath(__file__))
sys.path.append(os.path.join(path, '..'))

from threading import Thread
import asyncio
from aiohttp import web
import aiohttp_cors

from pymongo import MongoClient

# ~~~~~~~~~~~~~start routes import~~~~~~~~~~~~~~~~~
from server_daemon.routes.get_html_file_by_url import get_html_file_by_url

from server_daemon.routes.projects.create_project import create_project
from server_daemon.routes.projects.get_projects import get_projects
# ~~~~~~~~~~~~~end routes import~~~~~~~~~~~~~~~~~

from configs.config import CONFIG

class ServerDaemon:
    def __init__(self):
        self.mongo_client = MongoClient(CONFIG.MONGODB_HOST, CONFIG.MONGODB_PORT, maxPoolSize=CONFIG.MONGODB_MAX_POOL_SIZE)

        # ~~~~~~~~~~~
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)

        app = web.Application(client_max_size=int(1e8))

        # ~~~~~~~~~~~~~~START SETTING ROUTES~~~~~~~~~~~~~~~~~
        routes_post = {
            '/backend/get_html_file_by_url/': get_html_file_by_url,
            '/backend/create_project/': create_project,
            '/backend/get_projects/': get_projects,
        }
        if CONFIG.IS_USE_CORS:
            cors = aiohttp_cors.setup(app, defaults={
                "*": aiohttp_cors.ResourceOptions(
                    allow_credentials=True,
                    expose_headers="*",
                    allow_headers="*",
                )
            })

            for path, handler in routes_post.items():
                resource = cors.add(app.router.add_resource(path))
                cors.add(resource.add_route("POST", handler))
        else:
            routes_post = [
                web.post(k, v) for k,v in routes_post.items()
            ]

            app.add_routes(routes_post)
        # ~~~~~~~~~~~~~~END SETTING ROUTES~~~~~~~~~~~~~~~~~

        self.app = app
        # ~~~~~~~~~~~

        self.runner = web.AppRunner(app, access_log=None)

        Thread(target=self._loop, daemon=False).start()

    def _loop(self):
        self.app['mongo_client'] = self.mongo_client

        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        loop.run_until_complete(self.runner.setup())

        site = web.TCPSite(self.runner, host=CONFIG.WEB_SERVER_ADRESS, port=CONFIG.WEB_SERVER_PORT)
        loop.run_until_complete(site.start())

        loop.run_forever()


if __name__ == '__main__':
    # ~~~~~~~~~~~~~~~~~~~~~START LOGGING~~~~~~~~~~~~~~~~~~~~~
    log_path = CONFIG.LOGS_PATH + 'main.log'

    os.makedirs(os.path.dirname(log_path), exist_ok=True)

    import logging
    from logging.handlers import RotatingFileHandler

    formatter = logging.Formatter('%(asctime)s - %(threadName)s - %(name)s - %(levelname)s - %(message)s')

    fh = RotatingFileHandler(log_path, maxBytes=CONFIG.ONE_LOG_MAX_BYTES,
                             backupCount=CONFIG.LOG_BACKUP_COUNT)
    fh.setFormatter(formatter)

    ch = logging.StreamHandler(sys.stderr)
    ch.setFormatter(formatter)

    logging.basicConfig(level=logging.INFO, handlers=[ch, fh])
    logging.critical('START ASYNC WEB SERVER')

    # catch exceptions
    from traceback import format_tb

    sys.excepthook = lambda exctype, value, tb: logging.critical(
        'EXCEPTION:\nType:%s\nValue:%s\nTraceback:%s\n'
        % (
            exctype, value, format_tb(tb)
        )
    )
    # ~~~~~~~~~~~~~~~~~~~~~END LOGGING~~~~~~~~~~~~~~~~~~~~~

    server = ServerDaemon()