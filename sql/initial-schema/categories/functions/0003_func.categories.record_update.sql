BEGIN;

CREATE OR REPLACE FUNCTION categories.record_update(_id text, params jsonb)
    RETURNS SETOF categories.records
    LANGUAGE plpgsql
    SECURITY DEFINER
    AS $$
#variable_conflict use_variable
DECLARE
    _slug text := params->>'slug';
    _name text := params->>'name';
    _description text := params->>'description';
    _active boolean := (params->>'active')::boolean;
BEGIN
    UPDATE categories.records r
        SET
           slug = COALESCE(_slug, r.slug),
           name = COALESCE(_name, r.name),
           description = COALESCE(_description, r.description),
           active = COALESCE(_active, r.active)
        WHERE r.id = _id;


    RETURN QUERY SELECT * FROM categories.record_get(_id, NULL);
END
$$;

ALTER FUNCTION categories.record_update(text, jsonb) OWNER TO ${categories_owner_role};
GRANT EXECUTE ON FUNCTION categories.record_update(text, jsonb) TO ${categories_api_role};
