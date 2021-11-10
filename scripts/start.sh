#!/bin/sh

cd /var/studybites/ || exit 1;
cp -r /var/letsencrypt/ front/letsencrypt/ || exit 1;
docker compose -f docker-compose.prod.yml up --build -d -V;
