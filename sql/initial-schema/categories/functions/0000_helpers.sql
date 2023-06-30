BEGIN;


CREATE OR REPLACE FUNCTION categories.generate_new_id()
  RETURNS text
  LANGUAGE plpgsql
AS $$
DECLARE
BEGIN

  RETURN substr(md5(timeofday() || random()::text), 1, 14);

END
$$;

ALTER FUNCTION categories.generate_new_id() OWNER TO ${categories_owner_role};
GRANT EXECUTE ON FUNCTION categories.generate_new_id() TO ${categories_owner_role};
GRANT EXECUTE ON FUNCTION categories.generate_new_id() TO ${categories_api_role};
