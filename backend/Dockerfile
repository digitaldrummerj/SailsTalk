FROM digitaldrummerj/sails

WORKDIR /home/app

COPY package.json /home/app
RUN npm install;rm package.json

EXPOSE 1337
VOLUME ["/home/app/node_modules"]

# CMD ["sails", "lift"]
