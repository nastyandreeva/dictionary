# Dictionary

## Requirements

- nodejs v14.12.0
- postgresql ^10
- liquibase


## Database

Database structure is described in ./sql

Api requires database user with role: `categories_api_role`

Create database user `DB_USER` `DB_PASSWORD`
After run `liquibase update` user will granted role `categories_api_role`.

Fill in the `liquibase.properties` file with liquibase parameters

```
cp ./liquibase.properties.sample ./liquibase.properties
```

Run

```
liquibase update
```

## Configuration

Application expects ENV varilables to be set before starting.
List of ENV varilables is defined in `.env.sample`

## Install

```
npm install
```

## Start api

```
set -o allexport; . ./.env
node src/interfaces/api/index.js
```

## Test

Fill in the `setup.js` file with env variables

```
cp ./test/setup.sample.js ./test/setup.js
```

### Run tests

```npm run test```
