#!/usr/bin/env bash
export CURRENT_TAG=$(git tag | tail -1 | head -n1)
echo '###' $CURRENT_TAG
PREV_TAG=$(git tag | tail -2 | head -n1)
echo '###' $PREV_TAG
export CURRENT_TAG_AUTHOR=$(git show "$CURRENT_TAG" --pretty="format:%an" --no-patch -1)
export CURRENT_TAG_DATE=$(git show "$CURRENT_TAG" --pretty="format:%ar" --no-patch -1)
CHANGELOG=$(git log "$PREV_TAG" --pretty=format:"%h - %s (%an, %ar)\n" | tr -s "\n" " ")

export QUEUE_NAME="TMP"
export UNIQUE_VALUE="test"

export REQUEST_BODY='{
  "queue": "'$QUEUE_NAME'",
  "summary": "'"$CURRENT_TAG"'| Author: '"$CURRENT_TAG_AUTHOR"' | released '"$CURRENT_TAG_DATE"'",
  "description": "'"$CHANGELOG"'",
  "unique": "'"$UNIQUE_VALUE"'_'"$CURRENT_TAG"'"
}'

#----------------------------------------
# создаем тикет в Яндекс-трекере
#----------------------------------------

bash ./.github/workflows/scripts/add_task_in_tracker.sh

if [ $? != 0 ]; then
  exit $?
fi

#----------------------------------------
# Тесты
#----------------------------------------
bash ./.github/workflows/scripts/tests.sh

if [ $? != 0 ]; then
  exit $?
fi

#----------------------------------------
# Артефакт
#----------------------------------------
bash ./.github/workflows/scripts/artifact.sh

if [ $? != 0 ]; then
  exit $?
fi
