#!/bin/sh
set -e  # Exit on any error

# Create destination directories if they don’t exist
mkdir -p /db-init/migrations /db-init/init-scripts /kong-config /vector-config /pooler-config /functions-data

# Copy files to mounted volumes
cp /source/db/realtime.sql /db-init/migrations/99-realtime.sql
cp /source/db/webhooks.sql /db-init/init-scripts/98-webhooks.sql
cp /source/db/roles.sql /db-init/init-scripts/99-roles.sql
cp /source/db/jwt.sql /db-init/init-scripts/99-jwt.sql
cp /source/db/_supabase.sql /db-init/migrations/97-_supabase.sql
cp /source/db/logs.sql /db-init/migrations/99-logs.sql
cp /source/db/pooler.sql /db-init/migrations/99-pooler.sql
cp /source/api/kong.yml /kong-config/temp.yml
cp -r /source/logs/* /vector-config/
cp -r /source/pooler/* /pooler-config/
cp -r /source/functions/* /functions-data/
