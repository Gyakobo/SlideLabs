#!/bin/bash

SERVICE_NAME="slidelab.service"

# ~~~~~~~~~Remove api_server.service~~~~~~~~~~
systemctl stop ${SERVICE_NAME}
systemctl disable ${SERVICE_NAME}
rm /etc/systemd/system/${SERVICE_NAME}

# ~~~~~~~~~Reload daemon~~~~~~~~~~
systemctl daemon-reload

echo "Uninstall ${SERVICE_NAME} finished"