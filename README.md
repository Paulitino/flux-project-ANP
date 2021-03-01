# Flux project

This README.md is divided in many parts.
## Table of contents
* [Why this project](#Why-this-project)
* [Lesson learned](#Lessons-learned)
* [Technologies](#Technologies)
* [Setup the project](#Setup-the-project)

## Why this project
This project is inspired from a test I made for a company.
It is about getting articles from flux the user has subscribed to. It will automatically get the articles in an interval of time the user has set.
As a fullstack developper, I like to control and understand all the parts of a project. For this project I decided to use technologies I know but in a more optimised/professionnal way. The purpose is to keep good practices and implement useful technologies in companies to show what I am capable of in a professionnal-like project.

## Lessons learned
During this project, I have learned to use docker on a personnal project, but also testing the code I developed. The SQL statements are optimised like I learned during my internship at SFR B2B.</br>
It has the purpose to assemble many technologies I know in a cleaner way and with good practices.

## Technologies
**Introduction TODO**
For this project I decided to use Angular, HTML, CSS for the front-end part. NodeJS, PostgreSQL for the back-end part. I chose to develop in a docker environment, it allows all the developers to be able to destroy and rebuild easily the whole architecture of the project if a problem occurs. Moreover, since everybody has exactly the same stack, versions of technologies... If anyone has a problem somebody had the same.</br>
The second improvment is the tests. I decided to use Mocha Chai because the community seems active and there are a lot of example. These technologies are good together and are used a lot.

### Docker

###### Explaination of the *docker containter run/exec* flags

Flag | Description
------------ | -------------
--detach , -d | Run container in background and print container ID
--interactive , -i | Keep STDIN open even if not attached
--mount | Attach a filesystem mount to the container
--network | Connect a container to a network
--name | Assign a name to the container
--tty , -t | Allocate a pseudo-TTY

### Angular 2+
It is an open-source web application framework created by google.It uses the TypeScript language to develop applications based on the MVC architecture.

### NodeJS
Is a back-end JavaScript environment. Allows user to write JavaScript tools and commands for server-side scripting.

### Mocha
JavaScript test framework running on NodeJS to test asynchronous simpler and make it funnier.

### Chai
BDD (Behaviour Driven Development) or a TDD (Test Driven Development) for NodeJS

### PostgreSQL
Free open-source relational database management system. The language used is SQL.

## Setup the project

### Requirements

First, you have to download and install **Docker**.
Since the setup of this project is on Docker, your OS doesn't matter. The version of the docker engine is v20.10.2.
So the only requirement is to have docker pre-install.

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
The front-end part is in another repository, so it is better to maintain and the project is divided in logic parts(I might want to try another front-end framework).
