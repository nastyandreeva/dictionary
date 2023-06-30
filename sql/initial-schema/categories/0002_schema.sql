BEGIN;

CREATE SCHEMA categories AUTHORIZATION ${categories_owner_role};

GRANT USAGE ON SCHEMA categories TO ${categories_api_role};
