
FROM node:16

FROM mcr.microsoft.com/playwright:v1.16.3-focal

WORKDIR /temp/salmon/PLAYWRIGHTTS/
ENV PATH /app/node_modules/.bin:$PATH

COPY ./Config /temp/salmon/PLAYWRIGHTTS/Config
COPY ./features /temp/salmon/PLAYWRIGHTTS/features
COPY ./stepDefination /temp/salmon/PLAYWRIGHTTS/stepDefination
COPY ./cucumber.js /temp/salmon/PLAYWRIGHTTS/cucumber.js
COPY ./package.json /temp/salmon/PLAYWRIGHTTS/package.json
COPY ./tsconfig.json /temp/salmon/PLAYWRIGHTTS/tsconfig.json
COPY ./Service /temp/salmon/PLAYWRIGHTTS/Service
COPY ./start_server.sh /temp/salmon/PLAYWRIGHTTS/start_server.sh
#COPY .src-js /temp/salmon/PLAYWRIGHTTS/.src-js
RUN mkdir -p /temp/salmon/PLAYWRIGHTTS/Report

RUN apt-get update && apt-get -y install libnss3 libatk-bridge2.0-0 libdrm-dev libxkbcommon-dev libgbm-dev libasound-dev libatspi2.0-0 libxshmfence-dev

RUN npm install
RUN npx playwright install chrome

RUN chmod 777 -R /temp/salmon/PLAYWRIGHTTS \
&& chmod -R 777 node_modules \
&& echo "--------"

ENTRYPOINT ["/temp/salmon/PLAYWRIGHTTS/start_server.sh"]
