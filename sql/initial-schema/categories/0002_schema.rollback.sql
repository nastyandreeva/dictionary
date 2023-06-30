BEGIN;

REVOKE USAGE ON SCHEMA partner_transfers FROM ${categories_api_role};

DROP SCHEMA IF EXISTS categories;
