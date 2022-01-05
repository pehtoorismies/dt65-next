#!/bin/sh

dead_code=$(npx ts-prune |grep -v src/pages |grep -v .stories.tsx)

len=${#dead_code}

if [ "$len" -gt 1 ]
then
  echo "Dead code found in:"
  echo "$dead_code"
  exit 1
else
  echo "No dead code found."
  exit 0
fi


