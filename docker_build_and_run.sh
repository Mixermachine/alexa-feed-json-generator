#!/usr/bin/env bash
sudo docker build -t alexa-feed-json-generator .
sudo docker run -d -p 6565:6565 --restart always alexa-feed-json-generator
