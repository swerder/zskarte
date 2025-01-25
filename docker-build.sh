#!/bin/sh
cd packages/app
docker build --build-arg="CONFIG=swerder-debug" -t zskarte-client:$(git rev-parse --short HEAD) -t zskarte-client:latest-local .

