#!/bin/bash

RABBITMQ_USER="guest"
RABBITMQ_PASS="guest"
RABBITMQ_HOST="localhost"
RABBITMQ_PORT="15672"

EXCHANGE="server-said"           # Default exchange

DELAY=1

echo "Sending random messages to exchange $EXCHANGE every $DELAY seconds..."

while true; do
  RANDOM_ID=$((RANDOM % 10))
  TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

  # Create raw JSON message string
  RAW_MESSAGE="{\"receiverId\":$RANDOM_ID,\"eventTime\":\"$TIMESTAMP\",\"content\":\"Random message $RANDOM_ID\"}"

  # Escape quotes for JSON string embedding (replace " with \")
  ESCAPED_MESSAGE=$(printf '%s' "$RAW_MESSAGE" | sed 's/"/\\"/g')

  # Compose final JSON body
  JSON_BODY=$(cat <<EOF
{
  "properties": {},
  "routing_key": "",
  "payload": "$ESCAPED_MESSAGE",
  "payload_encoding": "string"
}
EOF
)

  # POST to RabbitMQ HTTP API
  HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" \
    -u "$RABBITMQ_USER:$RABBITMQ_PASS" \
    -H "Content-Type: application/json" \
    -X POST "http://$RABBITMQ_HOST:$RABBITMQ_PORT/api/exchanges/%2F/$EXCHANGE/publish" \
    -d "$JSON_BODY")

  if [ "$HTTP_CODE" -eq 200 ]; then
    echo "✔ Sent: $RAW_MESSAGE"
  else
    echo "✖ Failed with HTTP code $HTTP_CODE"
  fi

  sleep $DELAY
done
