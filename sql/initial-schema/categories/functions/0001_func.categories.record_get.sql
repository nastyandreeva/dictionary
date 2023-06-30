BEGIN;

CREATE OR REPLACE FUNCTION categories.record_get(_id text DEFAULT NULL, _slug text DEFAULT NULL)
    RETURNS SETOF categories.records
    LANGUAGE plpgsql
    SECURITY DEFINER
    AS $$
#variable_conflict use_variable
BEGIN
     RETURN QUERY
        SELECT * FROM categories.records r
            WHERE (_id IS NULL OR r.id = _id)
            AND (_slug IS NULL OR r.slug = _slug);
END
$$;

ALTER FUNCTION categories.record_get(text, text) OWNER TO ${categories_owner_role};
GRANT EXECUTE ON FUNCTION categories.record_get(text,text) TO ${categories_api_role};
