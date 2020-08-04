#!/usr/bin/env bash

if [[ -z "$1" ]]; then
    echo "Usage: $0 USERNAME"
    exit 2
fi
username="$1"

cd "$(dirname "$0")"
touch htpasswd.txt
htpasswd htpasswd.txt "$username"