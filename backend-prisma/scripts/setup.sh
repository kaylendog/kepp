#!/usr/bin/env bash
set -euxo pipefail
# start docker
docker-compose up -d
# run prisma migrations
npx prisma migrate dev
npx prisma introspect
npx prisma generate
