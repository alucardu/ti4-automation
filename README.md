# Ti4Automation

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.1.5.

## Stack

This project is using Apollo Client & Apollo server to run its GraphQL server on NodeJS. Prisma is used as an ORM to handle the database and Angular is used as the front-end framework.

## Angular

Source for icons: https://fonts.google.com/icons?icon.set=Material+Icons

## Docker

The mySQL database is running in a docker container.
1. Run `docker compose up -d` to build the docker container.
2. Run `npx migrate prisma deploy` to apply the migrations. (development)
3. Also create a `.env` file for the database configuration.

## ApolloGraphQL.Studio

https://studio.apollographql.com/sandbox/explorer

## Development server

Run `npm run startClient` to start the development server.

## Development graphQL server

Run `npm run startServer` to start the graphQL server.

## Prisma studio

Run: `npm run prismaStudio` to see the data in the database.

## Prisma production

Run `npx prisma migrate deploy` to run migration on the production server

## How to run .ts files on NodeJS

Run `ts-node --esm ./my-script.ts` to run a TypeScript file on a NodeJS environment.

## How to migrate Prisma schema changes

1. Update the `schema.prisma` file
2. Create an migration `prisma migrate dev --name <name>`

## Server commands

 - `sudo nano /etc/nginx/sites-available/ti4companion.com`
 - `pm2 restart all` 
 - `sudo systemctl restart nginx`
 - `sudo nginx -t`
 - `nano /var/log/nginx/error.log`

## Docker commands

 - `docker exec -it ti4-automation-mysql-1 bash`
 - `mysql -u root -p ti4-automation`
