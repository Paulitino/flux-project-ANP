# Flux project

This project is inspired from a test I made for a company.
It is about getting articles from flux the user has subscribed to. It will automatically get the articles in an interval of time the user has set.


## Technologies
Angular
NodeJS
PostgreSQL

###### Explaination of the *docker containter run/exec* flags

Flag | Description
------------ | -------------
--detach , -d | Run container in background and print container ID
--interactive , -i | Keep STDIN open even if not attached
--mount | Attach a filesystem mount to the container
--network | Connect a container to a network
--name | Assign a name to the container
--tty , -t | Allocate a pseudo-TTY

## Setup the project
First, you have to download and install **Docker**.

This commands creates a volume
```
docker volume create volume-flux-project-anp
```
Creates a network
```
docker network create network-flux-project-anp
```

Creates and start two containers (one for the front-end, another for the back-end)<br>
**Backend**<br>
Downloads the official PostgreSQL image
```
docker pull postgres:13-alpine
```
Builds the container
```
docker container run --name fluxBack -d -p 5432:5432 --network network-flux-project-anp --mount type=bind,source=C:\Users\paulf\Work\flux-project\flux-project-api,target=/app --mount type=volume,source=volume-flux-project-anp,dst=/var/lib/postgres/data -e POSTGRES_PASSWORD=root postgres:13-alpine
```
Builds the DB in the container
```
docker container exec -u postgres fluxBack sh -l -c "psql -c 'CREATE DATABASE \""flux\"" WITH OWNER postgres;'"
```
Creates the tables in the DB
```
docker container exec -u postgres fluxBack sh -l -c "psql flux -f /app/builder/database.sql"
```
Launches the container
```
docker container exec -it fluxBack sh
```

**API and Server**<br>
Downloads the official nodeJS image
```
docker pull node:14.8.0-alpine3.11
```
Creates the container connects it to the network, gives it a connection to the volume and redirects its port 80 (container) to the port 3000 (host) of the host 
```
docker container run --name fluxAPI -d -t -p 3000:1040 --network network-flux-project-anp --mount type=bind,source=C:\Users\paulf\Work\flux-project\flux-project-api,target=/app node:14.8.0-alpine3.11
```
> You have to redirect the port of the container to a port of the host and asign a local IP adress because for the host the container isn't localhost
Launches the container
```
docker container exec -it fluxAPI sh
```

Installs all the modules
```
npm install
```

> To connect the webservices API to the DB postgreSQL you have to instanciate a client with many credentials. The "host" is the name of the container to "attack" where the postgres DB is. In our case it is "fluxBack"

**Frontend**<br>
TODO
