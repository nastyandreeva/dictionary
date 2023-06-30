BEGIN;

--
--  Create roles (if not exists) and grant owner to current_user
--

DO $$
BEGIN

    CREATE ROLE ${categories_owner_role} ROLE current_user;
EXCEPTION
    WHEN duplicate_object THEN NULL;

END
$$;


DO $$
BEGIN

    CREATE ROLE ${categories_api_role} ROLE ${categories_api_user};
EXCEPTION
    WHEN duplicate_object THEN NULL;

END
$$;
