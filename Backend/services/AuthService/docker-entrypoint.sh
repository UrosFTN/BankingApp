#!/bin/sh
set -e

echo "Waiting for database to be ready..."
until PGPASSWORD=$DB_PASSWORD psql -h "$DB_HOST" -U "$DB_USER" -d "$DB_NAME" -c '\q'; do
  echo "Database is unavailable - sleeping"
  sleep 1
done

echo "Database is ready!"
echo "Running migrations..."
npm run migrate:up

echo "Starting Auth Service..."
exec npm run dev