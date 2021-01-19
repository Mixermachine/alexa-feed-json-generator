#!/usr/bin/env bash
sudo docker build -t alexa-feed-json-generator .
sudo docker stop alexa-feed-json-generator
sudo docker run -d -p 6565:6565 --restart always \
--name alexa-feed-json-generator \
--mount type=bind,source="$(pwd)"/files,target=/app/files \
alexa-feed-json-generator
