BEGIN;

CREATE OR REPLACE FUNCTION categories.records_get(filter_params jsonb)
    RETURNS SETOF categories.records
    LANGUAGE plpgsql
    SECURITY DEFINER
    AS $$
#variable_conflict use_variable
<<this>>
DECLARE
    _name text := replace(filter_params->>'name', 'ё', 'е');
    _description text := filter_params->>'description';
    _active boolean := (filter_params->>'active')::boolean;
    _search text := filter_params->>'search';
    _limit numeric := COALESCE((filter_params->>'pageSize')::numeric, 2);
    _offset numeric := COALESCE((filter_params->>'page')::numeric, 0);
    _sort text := COALESCE(filter_params->>'sorted', '-createddate');
    sort_by text;
    sort_field text;
    field_has_space boolean;
BEGIN
    IF (_sort LIKE '-%') THEN
        sort_by := 'DESC';
    ELSE
        sort_by := 'ASC';
    END IF;

    sort_field := TRIM(LEADING '-' FROM _sort);

    IF (sort_field NOT IN (SELECT column_name
                            FROM information_schema.columns
                            WHERE table_schema = 'categories' AND table_name = 'records')
                            ) THEN
        sort_field := 'createddate';
        sort_by := 'DESC';
    END IF;

     IF EXISTS (SELECT 1 from jsonb_each_text(filter_params::jsonb) WHERE VALUE ~ ' ') THEN
         field_has_space := true;
     ELSE
        field_has_space := false;
     END IF;

    IF ((filter_params IS NULL) OR (field_has_space = TRUE)) THEN
        RETURN QUERY EXECUTE format(
           $q$
           SELECT *
           FROM categories.records r
           ORDER BY r.%I %s
           LIMIT %s OFFSET %s
           $q$, sort_field, sort_by, _limit, _offset );
     ELSE
        IF (_limit > 10) THEN
          _limit := 10;
        END IF;

        RETURN QUERY EXECUTE format(
                   $q$
                   SELECT *
                   FROM categories.records r
                   WHERE ($1 IS NULL OR ((LOWER(r.name) = LOWER($1)) OR ($4 IS NOT NULL)))
                   AND ($2 IS NULL OR (r.active = $2))
                   AND ($3 IS NULL OR ((r.description = $3) OR ($4 IS NOT NULL)))
                   AND ($4 IS NULL OR (r.name = $4) OR (r.description = $4))
                   ORDER BY r.%I %s
                   LIMIT %s OFFSET %s
                   $q$, sort_field, sort_by, _limit, _offset )
        USING _name, _active, _description, _search;
     END IF;
END
$$;

ALTER FUNCTION categories.records_get(jsonb) OWNER TO ${categories_owner_role};
GRANT EXECUTE ON FUNCTION categories.records_get(jsonb) TO ${categories_api_role};

