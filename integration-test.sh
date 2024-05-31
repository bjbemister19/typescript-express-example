#!/bin/bash

# Create file called .integration-test-env and define the following variables
# export POSTMAN_API_KEY='your-api-key'
# export POSTMAN_COLLECTION='your-collection'

ENV_FILE=".integration-test-env"

if ! command -v postman &> /dev/null; then
  echo "Error: Postman is not installed."
  exit 1
fi

if [ ! -f "$ENV_FILE" ]; then
  echo "Error: $ENV_FILE does not exist."
  exit 1
fi

source "$ENV_FILE"

if [ -z "$POSTMAN_API_KEY" ] || [ -z "$POSTMAN_COLLECTION" ]; then
  echo "Error: Environment variables POSTMAN_API_KEY and/or POSTMAN_COLLECTION are not set."
  exit 1
fi

postman login --with-api-key "$POSTMAN_API_KEY"
postman collection run "$POSTMAN_COLLECTION"