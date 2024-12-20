#!/bin/bash

set -e

echo "Running: ${0} as : $(whoami) in: $(pwd)"

mkdir -p ~/.ssh
chmod 0700 ~/.ssh

ssh-keyscan -p "${INPUT_PORT}" -H "${INPUT_HOST}" >> ~/.ssh/known_hosts

echo -e "\u001b[36mAdding SSH Key to SSH Agent"
echo "${INPUT_SSH_KEY}" > ~/.ssh/id_rsa
chmod 0600 ~/.ssh/id_rsa
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_rsa

ssh -p "${INPUT_PORT}" "${INPUT_USER}@${INPUT_HOST}" "docker info" > /dev/null


docker context create remote --docker "host=ssh://${INPUT_USER}@${INPUT_HOST}:${INPUT_PORT}"
docker context ls
docker context use remote

echo -e "\u001b[36mDeploying Stack: \u001b[37;1m${INPUT_NAME}"
docker stack deploy -c "${INPUT_FILE}" "${INPUT_NAME}"
