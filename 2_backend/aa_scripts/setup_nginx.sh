#!/bin/bash

cp nginx.conf /etc/nginx

cd ..

PROJECT_DIR="$(pwd)"
NUT_NUT_CONF="nut_nut.conf"
SSL_CERT="${PROJECT_DIR}/RES/certificates/nut_nut_certchain.txt"
SSL_CERT_KEY="${PROJECT_DIR}/RES/certificates/nut_nut_key.txt"
ROOT_DIR="/home/ubuntu/nut_nut_frontend"

echo "
server {
    listen 80;
    server_name 192.168.1.52;

    location /backend/ {
      proxy_pass http://127.0.0.1:2021;
    }
}

server {
    listen 80;
    server_name nut-nut.ru;
    return 301 https://\$host\$request_uri;
}

server {
	listen 443;

	server_name nut-nut.ru;

  ssl on;
	ssl_certificate     ${SSL_CERT};
  ssl_certificate_key ${SSL_CERT_KEY};

  index index.html;
  root ${ROOT_DIR};

	location / {
#		try_files \$uri \$uri/ =404;
		try_files \$uri \$uri/ /index.html; # solution for history mode
	}

	location /backend/ {
    proxy_pass http://127.0.0.1:2021;
  }

  location /robots.txt {
		alias ${ROOT_DIR}/static/robots.txt;
	}

	# deny access to Apache's .htaccess files
    location ~ /\.ht {
    	deny all;
    }
}

" > /etc/nginx/sites-enabled/${NUT_NUT_CONF}

### ln -s /etc/nginx/sites-available/${MIXBUN_CONF}   /etc/nginx/sites-enabled/

nginx -s reload
