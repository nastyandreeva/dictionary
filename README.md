# Dictionary

## Requirements

- postgresql ^10
- liquibase

## Configs
```shell
$ cp liquibase.properties.sample liquibase.properties

// and edit liquibase.properties (fill actual credentials)
```

## Setup

```shell
-- dbname: partner_transfers

CREATE USER categories_liquibase WITH PASSWORD '****';
CREATE USER categories_api_user WITH PASSWORD '****';
CREATE DATABASE categories OWNER categories_liquibase;
```

```shell
$ liquibase update

// rollback
$ liquibase rollback v1.0.0
```

## Configuration

Application expects ENV varilables to be set before starting.
List of ENV varilables is defined in `.envrc.sample`

## Install

```
npm install
```
