FROM node:8

# Create app directory
WORKDIR /

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN yarn install --ignore-scripts
RUN yarn run build:docs

# Bundle app source
COPY . .

EXPOSE 8080
CMD [ "yarn", "start:server" ]
