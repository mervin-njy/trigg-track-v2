--
-- PostgreSQL port of the "TriggTrack" database.
--

BEGIN;

CREATE TABLE "user" (
    "username" VARCHAR(100) NOT NULL PRIMARY KEY UNIQUE,
    "hash" VARCHAR(100) NOT NULL,
    "user_type" VARCHAR(20) NOT NULL,
    "access_type" VARCHAR(20) NOT NULL,
    "full_name" TEXT NOT NULL,
    "profile_picture" text NULL,  -- image
    "profession" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "bio" TEXT NOT NULL,
    "overall_rating" INT2 NULL,
    CONSTRAINT "user_type_check" 
        CHECK (("user_type" = 'Health Logger'::text) OR ("user_type" = 'Service Provider'::text)),
    CONSTRAINT "access_type_check" 
        CHECK (("access_type" = 'Private'::text) OR ("user_type" = 'Public'::text) OR ("user_type" = 'Protected'::text))
);

CREATE TABLE "record_entry" (
  "id" SERIAL NOT NULL PRIMARY KEY,
  "title" VARCHAR(50) NOT NULL,
  "item" TEXT NOT NULL,
  "image_url" TEXT NULL,
  "trigger_tag" BOOLEAN NOT NULL
);

CREATE TABLE "record" (
  "logger_username" VARCHAR(100) NOT NULL PRIMARY KEY,
  "date" DATE NOT NULL,
  "type" VARCHAR(20) NOT NULL,
  "name" VARCHAR(100) NOT NULL,
  "category" VARCHAR(100) NOT NULL,
  "record_entry_id" INT4 NOT NULL,
  CONSTRAINT "fk_username"
    FOREIGN KEY ("logger_username")
        REFERENCES "user" ("username"),
  CONSTRAINT "fk_record_entry"
    FOREIGN KEY ("record_entry_id")
        REFERENCES "record_entry" ("id"),
  CONSTRAINT "type_check" 
    CHECK (("type" = 'Condition'::text) OR ("type" = 'Variable'::text))
);

CREATE TABLE "triggers" (
  "logger_username" VARCHAR(100) NOT NULL PRIMARY KEY,
  "trigger_condition" VARCHAR(100) NOT NULL,
  "trigger_variable" VARCHAR(100) NOT NULL,
  "trigger_id" INT4 NOT NULL,
  CONSTRAINT "fk_username"
    FOREIGN KEY ("logger_username")
        REFERENCES "user" ("username"),
  CONSTRAINT "fk_trigger"
    FOREIGN KEY ("trigger_id")
        REFERENCES "record_entry" ("id")
);

CREATE TABLE "review" (
  "date" DATE NOT NULL PRIMARY KEY,
  "logger_review" TEXT NOT NULL,
  "logger_rating" INT2 NOT NULL,
  CONSTRAINT "rating_check" 
    CHECK (("logger_rating" > 0) AND ("logger_rating" < 5))
);

CREATE TABLE "logger_service" (
  "username" VARCHAR(100) NOT NULL UNIQUE,
  "associated_username" VARCHAR(100) NOT NULL,
  "status" VARCHAR(20) NOT NULL,
  "review_date" DATE NULL PRIMARY KEY,
  CONSTRAINT "fk_username"
    FOREIGN KEY ("username")
        REFERENCES "user" ("username"),
  CONSTRAINT "fk_review"
    FOREIGN KEY ("review_date")
        REFERENCES "review" ("date"),
  CONSTRAINT "status_check" 
    CHECK (("status" = 'Nil'::text) OR ("status" = 'Potential'::text) OR ("status" = 'Requested'::text) OR ("status" = 'Partnered'::text))
);

CREATE TABLE "comment" (
  "servicer_username" VARCHAR(100) NOT NULL,
  "servicer_comment" VARCHAR(255) NOT NULL,
  "servicer_response" BOOLEAN NULL,
  "record_entry_id" INT4 NOT NULL PRIMARY KEY,
  CONSTRAINT "fk_username"
    FOREIGN KEY ("servicer_username")
        REFERENCES "logger_service" ("username"),
  CONSTRAINT "fk_record"
    FOREIGN KEY ("record_entry_id")
        REFERENCES "record_entry" ("id")
);


-- COPY city (id, name, countrycode, district, population) FROM stdin;
-- 1	Kabul	AFG	Kabol	1780000
-- 2	Qandahar	AFG	Qandahar	237500
-- 3	Herat	AFG	Herat	186800
-- 4	Mazar-e-Sharif	AFG	Balkh	127800
-- 5	Amsterdam	NLD	Noord-Holland	731200
-- 6	Rotterdam	NLD	Zuid-Holland	593321
-- 7	Haag	NLD	Zuid-Holland	440900
-- 8	Utrecht	NLD	Utrecht	234323
-- 9	Eindhoven	NLD	Noord-Brabant	201843
-- 10	Tilburg	NLD	Noord-Brabant	193238
-- \.

-- --
-- -- Data for Name: countrylanguage; Type: TABLE DATA; Schema: public; Owner: chriskl
-- --

-- COPY countrylanguage (countrycode, "language", isofficial, percentage) FROM stdin;
-- AFG	Pashto	t	52.400002
-- NLD	Dutch	t	95.599998
-- ANT	Papiamento	t	86.199997
-- ALB	Albaniana	t	97.900002
-- DZA	Arabic	t	86
-- ASM	Samoan	t	90.599998
-- \.


-- ALTER TABLE ONLY city
--     ADD CONSTRAINT city_pkey PRIMARY KEY (id);

-- ALTER TABLE ONLY country
--     ADD CONSTRAINT country_pkey PRIMARY KEY (code);

-- ALTER TABLE ONLY countrylanguage
--     ADD CONSTRAINT countrylanguage_pkey PRIMARY KEY (countrycode, "language");

-- ALTER TABLE ONLY country
--     ADD CONSTRAINT country_capital_fkey FOREIGN KEY (capital) REFERENCES city(id);

-- ALTER TABLE ONLY countrylanguage
--     ADD CONSTRAINT countrylanguage_countrycode_fkey FOREIGN KEY (countrycode) REFERENCES country(code);

-- COMMIT;

-- ANALYZE city;
-- ANALYZE country;
-- ANALYZE countrylanguage;
