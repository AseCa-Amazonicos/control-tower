# Service


## commands

dev: will run the typescript code using nodemon, without compiling to js

it counts with several commands provided by gts, such as:
lint: for linting
fix: for formatting
clean: to empty build field



if you are interested in going deeper for this commands read the gts documentation:
[gts-doc](https://github.com/google/gts)

test: will run jest for test

## pre-commit
you should set the pre-commit to run npm test

## start service
1. make a .env file by coping and pasting the .env-template in the .env
2. run `docker-compose up -d`
3. run `prisma migrate dev`
4. `npm start`
