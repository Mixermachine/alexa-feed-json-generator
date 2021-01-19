#!/usr/bin/env bash
sudo docker build -t alexa-feed-json-generator .
sudo docker run -p 9999:9999 alexa-feed-json-generator
