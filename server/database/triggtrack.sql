--
-- PostgreSQL port of the "TriggTrack" database.
--

BEGIN;

CREATE TABLE IF NOT EXIST "user" (
    username VARCHAR(100) NOT NULL PRIMARY KEY,
    hash VARCHAR(100) NOT NULL,
    user_type VARCHAR(20) NOT NULL,
    access_type VARCHAR(20) NOT NULL,
    full_name TEXT NOT NULL,
    profile_picture text NULL,  -- image
    profession VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    bio TEXT NOT NULL,
    overall_rating INT(2) NULL,
    CONSTRAINT user_type_check CHECK ((user_type = 'Health Logger'::text) OR (user_type = 'Service Provider'::text))
    CONSTRAINT access_type_check CHECK ((access_type = 'Private'::text) OR (user_type = 'Public'::text) OR (user_type = 'Protected'::text))
);

CREATE TABLE IF NOT EXIST "logger_service" (
  username VARCHAR(100) NOT NULL PRIMARY KEY,
  associated_username VARCHAR(100) NOT NULL,
  status VARCHAR(20) NOT NULL,
  review_date DATE NULL,
  FOREIGN KEY (username)
      REFERENCES user (username),
  FOREIGN KEY (review_date)
      REFERENCES review (date),
  CONSTRAINT status_check CHECK ((status = 'Nil'::text) OR (status = 'Potential'::text) OR (status = 'Requested'::text) OR (status = 'Partnered'::text))
);

CREATE TABLE IF NOT EXIST "record" (
  logger_username VARCHAR(100) NOT NULL PRIMARY KEY,
  date DATE NOT NULL,
  type VARCHAR(20) NOT NULL,
  name VARCHAR(100) NOT NULL,
  category VARCHAR(100) NOT NULL,
  record_entry_id INT(4)
  FOREIGN KEY (logger_username)
      REFERENCES user (username),
  FOREIGN KEY (record_entry_id)
      REFERENCES record_entry (id),
  CONSTRAINT type_check CHECK ((type = 'Condition'::text) OR (status = 'Variable'::text))
);

CREATE TABLE IF NOT EXIST "record_entry" (
  id SERIAL NOT NULL PRIMARY KEY,
  title VARCHAR(50) NOT NULL,
  item TEXT NOT NULL,
  image_url TEXT NULL,
  trigger_tag VARCHAR(100) NOT NULL,
);


COPY city (id, name, countrycode, district, population) FROM stdin;
1	Kabul	AFG	Kabol	1780000
2	Qandahar	AFG	Qandahar	237500
3	Herat	AFG	Herat	186800
4	Mazar-e-Sharif	AFG	Balkh	127800
5	Amsterdam	NLD	Noord-Holland	731200
6	Rotterdam	NLD	Zuid-Holland	593321
7	Haag	NLD	Zuid-Holland	440900
8	Utrecht	NLD	Utrecht	234323
9	Eindhoven	NLD	Noord-Brabant	201843
10	Tilburg	NLD	Noord-Brabant	193238
\.

--
-- Data for Name: countrylanguage; Type: TABLE DATA; Schema: public; Owner: chriskl
--

COPY countrylanguage (countrycode, "language", isofficial, percentage) FROM stdin;
AFG	Pashto	t	52.400002
NLD	Dutch	t	95.599998
ANT	Papiamento	t	86.199997
ALB	Albaniana	t	97.900002
DZA	Arabic	t	86
ASM	Samoan	t	90.599998
\.


ALTER TABLE ONLY city
    ADD CONSTRAINT city_pkey PRIMARY KEY (id);

ALTER TABLE ONLY country
    ADD CONSTRAINT country_pkey PRIMARY KEY (code);

ALTER TABLE ONLY countrylanguage
    ADD CONSTRAINT countrylanguage_pkey PRIMARY KEY (countrycode, "language");

ALTER TABLE ONLY country
    ADD CONSTRAINT country_capital_fkey FOREIGN KEY (capital) REFERENCES city(id);

ALTER TABLE ONLY countrylanguage
    ADD CONSTRAINT countrylanguage_countrycode_fkey FOREIGN KEY (countrycode) REFERENCES country(code);

COMMIT;

ANALYZE city;
ANALYZE country;
ANALYZE countrylanguage;
