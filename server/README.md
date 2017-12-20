#### Running the Node backend app (folder ```/server```):
Install Node. It comes with npm installed so you should have a version of npm.
However, npm gets updated more frequently than Node does, so you'll want to make sure it's the
latest version.
For this:
- Run npm install npm@latest -g

- Run npm install nodemon -g and npm install mongodb -g

- Run npm install

Run
>node bin/www

Your server is up on http://localhost:3000/

REST API Documentation
https://documenter.getpostman.com/view/743420/restapi-pad/7EHcCCL


Nodejs app
----------
docker build -t load-balanced-app .

docker run -e "MESSAGE=First instance" -p 8081:8080 -d load-balanced-app

docker run -e "MESSAGE=Second instance" -p 8082:8080 -d load-balanced-app

docker-compose -f docker-compose.yml up

Nginx
-----
docker-compose -f docker-compose-proxy.yml up -d --build
