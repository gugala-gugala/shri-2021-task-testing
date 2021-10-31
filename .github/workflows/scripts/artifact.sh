#!/usr/bin/env bash

docker build -t shri-2021-task-testing:"$CURRENT_TAG" .

if [ $? != 0 ]; then
  exit $?
fi

ADD_ARTIFACT_TASK_RESPONSE=$(
  curl -o /dev/null -s -w "%{http_code}\n" --location --request POST "$HOST"'/v2/issues/' \
  --header 'Authorization: OAuth '"$YA_TOKEN" \
  --header 'X-Org-ID: '"$CLIENT_ID" \
  --header 'Content-Type: application/json' \
  --data '{
    "queue": "'"$QUEUE_NAME"'",
    "summary": "Docker image hw-infrastructure:'"$CURRENT_TAG"' | Author: '"$CURRENT_TAG_AUTHOR"' | built '"$CURRENT_TAG_DATE"')"
  }'
  )

FIRST_NUM_OF_RESPONSE=$(echo "$ADD_ARTIFACT_TASK_RESPONSE" | cut -c 1)

[ "$FIRST_NUM_OF_RESPONSE" = "2" ]
