#!/usr/bin/env bash
sudo docker build -t alexa-feed-json-generator .
sudo docker run -p 6565:6565 alexa-feed-json-generator
