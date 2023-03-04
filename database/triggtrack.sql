--
-- PostgreSQL port of the "TriggTrack" database.
--
BEGIN;

-- DELETE TABLES BEFORE STARTING ---------------------------------------------------------------------------------------------------------------
DROP TABLE IF EXISTS "user", "record_entry", "record", "triggers", "review", "logger_service", "comment";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- CREATE TABLES -------------------------------------------------------------------------------------------------------------------------------

-- TODO: 
-- 1. add online/offline status
-- 2. add last logged in
CREATE TABLE "user" (
    "id" uuid DEFAULT uuid_generate_v4(),
    "username" VARCHAR(100) PRIMARY KEY,
    "hash" VARCHAR(100) NOT NULL,
    "user_type" VARCHAR(20) NOT NULL,
    "access_type" VARCHAR(20) NOT NULL,
    "display_name" TEXT NOT NULL,
    "profile_picture" text NULL,  -- image
    "profession" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "bio" TEXT NOT NULL,
    "overall_rating" INT2 NULL,
    CONSTRAINT "user_type_check" 
        CHECK (("user_type" = 'Health Logger'::text) OR ("user_type" = 'Service Provider'::text) OR ("user_type" = 'Admin'::text)),
    CONSTRAINT "access_type_check" 
        CHECK (("access_type" = 'Private'::text) OR ("access_type" = 'Public'::text) OR ("access_type" = 'Protected'::text))
);

CREATE TABLE "record_entry" (
  "id" SERIAL NOT NULL PRIMARY KEY,
  "title" VARCHAR(50) NOT NULL,
  "item" TEXT NOT NULL,
  "image_url" TEXT NULL,
  "trigger_tag" BOOLEAN NOT NULL
);

CREATE TABLE "record" (
  "logger_username" VARCHAR(100) NOT NULL,
  "date" DATE NOT NULL,
  "type" VARCHAR(20) NOT NULL,
  "name" VARCHAR(100) NOT NULL,
  "category" VARCHAR(100) NOT NULL,
  "record_entry_id" INT4 NOT NULL,
  CONSTRAINT "pk_user_record"
    PRIMARY KEY("logger_username", "record_entry_id"),
  CONSTRAINT "fk_username"
    FOREIGN KEY ("logger_username")
        REFERENCES "user" ("username") ON DELETE CASCADE,
  CONSTRAINT "fk_record_entry"
    FOREIGN KEY ("record_entry_id")
        REFERENCES "record_entry" ("id") ON DELETE CASCADE,
  CONSTRAINT "type_check" 
    CHECK (("type" = 'Condition'::text) OR ("type" = 'Variable'::text))
);

CREATE TABLE "triggers" (
  "logger_username" VARCHAR(100) PRIMARY KEY,
  "trigger_condition" VARCHAR(100) NOT NULL,
  "trigger_variable" VARCHAR(100) NOT NULL,
  "trigger_id" INT4 NOT NULL,
  CONSTRAINT "fk_username"
    FOREIGN KEY ("logger_username")
        REFERENCES "user" ("username") ON DELETE CASCADE,
  CONSTRAINT "fk_trigger"
    FOREIGN KEY ("trigger_id")
        REFERENCES "record_entry" ("id") ON DELETE CASCADE
);

CREATE TABLE "review" (
  "date" DATE NOT NULL PRIMARY KEY,
  "logger_review" TEXT NOT NULL,
  "logger_rating" INT2 NOT NULL,
  CONSTRAINT "rating_check" 
    CHECK (("logger_rating" > 0) AND ("logger_rating" <= 5))
);

CREATE TABLE "logger_service" (
  "logger_username" VARCHAR(100),
  "servicer_username" VARCHAR(100),
  "status" VARCHAR(20) NOT NULL,
  "review_date" DATE NULL,
  PRIMARY KEY ("logger_username", "servicer_username"),
  CONSTRAINT "fk_logger"
    FOREIGN KEY ("logger_username")
        REFERENCES "user" ("username") ON DELETE CASCADE,
  CONSTRAINT "fk_servicer"
    FOREIGN KEY ("servicer_username")
        REFERENCES "user" ("username") ON DELETE CASCADE,      
  CONSTRAINT "fk_review"
    FOREIGN KEY ("review_date")
        REFERENCES "review" ("date"),
  CONSTRAINT "status_check" 
    CHECK (("status" = 'Nil'::text) OR ("status" = 'Potential'::text) OR ("status" = 'Requested'::text) OR ("status" = 'Partnered'::text))
);

CREATE TABLE "comment" (
  "servicer_username" VARCHAR(100) NOT NULL,
  "logger_username" VARCHAR(100) NOT NULL,
  "servicer_comment" VARCHAR(255) NOT NULL,
  "servicer_response" BOOLEAN NULL,
  "record_entry_id" INT4 PRIMARY KEY,
  CONSTRAINT "fk_username"
    FOREIGN KEY ("servicer_username", "logger_username")
        REFERENCES "logger_service" ("servicer_username", "logger_username") ON DELETE CASCADE,    -- ***
  CONSTRAINT "fk_record"
    FOREIGN KEY ("record_entry_id")
        REFERENCES "record_entry" ("id") ON DELETE CASCADE
);

-- SEEDING SAMPLE INITIAL DATA ----------------------------------------------------------------------------------------------------------

COPY "user" ("username", "hash", "user_type", "access_type", "display_name", "profession", "email", "bio") FROM stdin (DELIMITER ',');
mervin_njy,mervin123,Health Logger,Public,Mervin Ng,Student,mervin.njy@outlook.com,"Long time victim of eczema flares on a daily basis\, gets triggered easily by sweat\, stress\, lack of sleep and probably diet - here to find out! Tries to exercise 1-3 times a week and cook if possible."
gavin_low,gavin123,Health Logger,Private,Gavin Low,Student,gavin_low@outlook.com,"Here for the LOLs."
amir,amir123,Service Provider,Public,Amir,Dietitian,amir@gmail.com,"Inspired by a personal history of poor eating habits\, I draw motivational factors to personalize good habits in your eating patterns."
izhar,izhar123,Service Provider,Public,Izhar,Dietitian,izhar@gmail.com,"Inspired scholar that fixes all problems."
\.

-- TODO: add image once working
COPY "record_entry" ("id", "title", "item", "trigger_tag") FROM stdin (DELIMITER ',');
881234001,location,"Mei cheng food court",false
881234002,1,"Mifen w/ chicken cutlet\, spring rolls & cabbage w/ carrots",false
881234003,2,"Kopi C kosong peng",false
881234004,location,"Putra Minang",false
881234005,1,"Nasi padang w/ beef rendang\, curry cabbage w/ carrots & french beans \, bergedil",false
881234006,location,"Funtea",false
881234007,2,"Kopi C kosong",false
\.

COPY "record" ("logger_username", "date", "type", "name", "category", "record_entry_id") FROM stdin (DELIMITER ',');
mervin_njy,2023-03-02,Variable,Diet,Breakfast,881234001
mervin_njy,2023-03-02,Variable,Diet,Breakfast,881234002
mervin_njy,2023-03-02,Variable,Diet,Breakfast,881234003
mervin_njy,2023-03-02,Variable,Diet,Lunch,881234004
mervin_njy,2023-03-02,Variable,Diet,Lunch,881234005
mervin_njy,2023-03-02,Variable,Diet,Lunch,881234006
mervin_njy,2023-03-02,Variable,Diet,Lunch,881234007
\.

COPY "logger_service" ("logger_username", "servicer_username", "status") FROM stdin (DELIMITER ',');
mervin_njy,amir,Requested
mervin_njy,izhar,Partnered
\.

COPY "comment" ("servicer_username", "logger_username", "servicer_comment", "servicer_response", "record_entry_id") FROM stdin (DELIMITER ',');
izhar,mervin_njy,"That\'s nice\, but curry contains coconut milk... Try to avoid. And bojio?",false,881234005
\.

COPY "review" ("date", "logger_review", "logger_rating") FROM stdin (DELIMITER ',');
2023-03-10,"Fantastic and insightful service. Learnt a lot from the scholar - accurate description in the bio!",5
\.

COPY "triggers" ("logger_username","trigger_condition", "trigger_variable", "trigger_id") FROM stdin (DELIMITER ',');
mervin_njy,"Eczema","Diet",881234005
\.

-- COMMIT ------------------------------------------------------------------------------------------------------------------------------------------

COMMIT;