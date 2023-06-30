BEGIN;

CREATE OR REPLACE FUNCTION categories.record_delete(_id text)
    RETURNS boolean
    LANGUAGE plpgsql
    SECURITY DEFINER
    AS $$
#variable_conflict use_variable
BEGIN
    IF EXISTS (SELECT 1 FROM categories.records r WHERE r.id = _id)
    THEN
        DELETE FROM categories.records r WHERE r.id = _id;
        RETURN TRUE;
    ELSE
        RETURN false;
    END IF;
END
$$;

ALTER FUNCTION categories.record_delete(text) OWNER TO ${categories_owner_role};
GRANT EXECUTE ON FUNCTION categories.record_delete(text) TO ${categories_api_role};
