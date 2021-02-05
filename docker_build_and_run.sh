#!/usr/bin/env bash
sudo docker build -t alexa-feed-json-generator .
sudo docker stop alexa-feed-json-generator

mkdir files_in_container
mkdir files_in_container/main
mkdir files_in_container/pre
sudo docker run -d -p 6565:6565 --restart always \
--name alexa-feed-json-generator \
--mount type=bind,source="$(pwd)"/files_in_container,target=/app/files \
alexa-feed-json-generator
