#!/usr/bin/env bash
echo $(curl -o /dev/null -s -w "%{http_code}\n" "$HOST"'/v2/boards/' \
  --header 'Authorization: OAuth '"$YA_TOKEN" \
  --header 'X-Org-ID: '"$CLIENT_ID" \
)
echo YA_TOKEN=$YA_TOKEN
echo CLIENT_ID=$CLIENT_ID
