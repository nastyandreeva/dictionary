BEGIN;


CREATE TABLE categories.records (
	id text NOT NULL DEFAULT (categories.generate_new_id()),
	slug text NOT NULL,
	name text NOT NULL,
	description text NULL,
	active boolean NOT NULL DEFAULT FALSE,
	createdDate timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT records_pk PRIMARY KEY (id)
);

ALTER TABLE categories.records ADD CONSTRAINT slug_uniq UNIQUE (slug);
ALTER TABLE categories.records OWNER TO ${categories_owner_role};
GRANT SELECT, INSERT, UPDATE ON TABLE categories.records TO ${categories_api_role};
