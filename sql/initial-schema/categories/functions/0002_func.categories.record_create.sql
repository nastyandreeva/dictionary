BEGIN;

CREATE OR REPLACE FUNCTION categories.record_create(params jsonb)
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
    ---return query попробовать
    INSERT INTO categories.records (
        slug,
        name,
        description,
        active
    )
    VALUES (
        _slug,
        _name,
        _description,
        _active
    )
    ON CONFLICT ON CONSTRAINT slug_uniq DO NOTHING;

    RETURN QUERY SELECT * FROM categories.record_get(NULL, _slug);
END
$$;

ALTER FUNCTION categories.record_create(jsonb) OWNER TO ${categories_owner_role};
GRANT EXECUTE ON FUNCTION categories.record_create(jsonb) TO ${categories_api_role};
