# Requirements

node >= v24
pnpm >= v10
platforms: win32, darwin, linux

**Make sure that on these commands are added to visudo on your servers:**

username ALL=(root) NOPASSWD:/usr/bin/btrfs
username ALL=(root) NOPASSWD:/usr/bin/mkdir
username ALL=(root) NOPASSWD:/usr/bin/mv


# How to run the project locally

Run `pnpm install`

## Creating the database

1. Change working directory to the server: cd `cd packages/server`
2. Run `pnpm db:generate`
3. Run `pnpm db:migrate`

## Starting the server 

1. Make sure that you have created the database
2. Run `pnpm dev:server`
3. Swagger should be available as `{host}:{serverPort}/swagger`

## Starting the client

1. Run `pnpm dev:gui`
2. You can also access the client via browser as `{host}:{clientPort}`

# How to build the project

Run `pnpm install`

## Building the server

1. Run `pnpm build:server`
2. Build should be in the `packages/server/dist` folder
3. To run the server, set working directory to `packages/server/dist`
4. Run `node server.cjs`

## Building the client

1. Run `pnpm build:gui`
2. Executable/dmg/appimage should be available in the `packages/gui/dist` folder
