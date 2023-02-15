FROM node:19-slim

WORKDIR /workspace
RUN apt-get update -y && \
    apt-get -y install libnss3-tools curl wget git && \
    curl -s https://api.github.com/repos/FiloSottile/mkcert/releases/latest | grep browser_download_url | grep linux-amd64 | cut -d '"' -f 4 | wget -qi - \
    && mv mkcert-v*-linux-amd64 mkcert \
    && chmod a+x mkcert \
    && mv mkcert /usr/local/bin/
RUN yarn install
