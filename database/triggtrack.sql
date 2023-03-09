--
-- PostgreSQL port of the "TriggTrack" database.
--
BEGIN;

-- DELETE TABLES BEFORE STARTING ---------------------------------------------------------------------------------------------------------------
DROP TABLE IF EXISTS "user", "entry", "record", "triggers", "review", "logger_service", "comment";
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

CREATE TABLE "record" (
  "id" SERIAL PRIMARY KEY,
  "logger_username" VARCHAR(100),
  "date" DATE UNIQUE,
  CONSTRAINT "fk_username"
    FOREIGN KEY ("logger_username")
        REFERENCES "user" ("username") ON DELETE CASCADE
);

CREATE TABLE "entry" (
  "record_id" INT4 NOT NULL,
  "id" SERIAL PRIMARY KEY,
  "type" VARCHAR(20) NOT NULL,
  "name" VARCHAR(100) NOT NULL,
  "category" VARCHAR(100) NOT NULL,
  "title" VARCHAR(50) NOT NULL,
  "item" TEXT NOT NULL,
  "image_url" TEXT NULL,
  "trigger_tag" BOOLEAN NOT NULL,
  CONSTRAINT "fk_record"
    FOREIGN KEY ("record_id")
        REFERENCES "record" ("id") ON DELETE CASCADE,
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
        REFERENCES "entry" ("id") ON DELETE CASCADE
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
        REFERENCES "entry" ("id") ON DELETE CASCADE
);

-- SEEDING SAMPLE INITIAL DATA ----------------------------------------------------------------------------------------------------------

COPY "user" ("username", "hash", "user_type", "access_type", "display_name", "profession", "email", "bio") FROM stdin (DELIMITER ',');
mervin,$2b$12$oG6NpAAT8BfBxFskPQyUkOJsTqFDhR1.2niMMDSuEqU7vAmO1/YpO,Health Logger,Public,Mervin Ng,Student,mervin.njy@outlook.com,"Long time victim of eczema flares on a daily basis\, gets triggered easily by sweat\, stress\, lack of sleep and probably diet - here to find out! Tries to exercise 1-3 times a week and cook if possible."
glow,$2b$12$VBkGVF0t1AEDOp3gaSqbwew2y5HSMHiXcoK0xNa5LnR5UGvAHj0Du,Health Logger,Private,Gavin Low,Student,gavin_low@outlook.com,"Here for the LOLs."
amir,$2b$12$HREihvzaneLUJe4Ibg//Ce.ZoKDI5bCxfJwOkfboFW5EJl9hpuyaO,Service Provider,Public,Amir,Dietitian,amir@gmail.com,"Inspired by a personal history of poor eating habits\, I draw motivational factors to personalize good habits in your eating patterns."
izhar,$2b$12$A2Ye59uQbf6Hevwxs9mYguRg2sZFjZDoml1Sj13hNj8Ueb4a1ak.q,Service Provider,Public,Izhar,Dietitian,izhar@gmail.com,"Inspired scholar that fixes all problems."
admin,$2b$12$FYMO8D9ARMuzLMdpkHtuUOIfS/P01M3NE6lRUFRG9.mZrBW.lCBO2,Admin,Private,Admin,-,-,"Administrator."
logtest,$2b$12$hyJm0CzQF3EmS3PhmHe2OuIwy44bU9JN7FMFWI5AXZKKAm.i4v0ze,Health Logger,Public,Test user - Logger,-,-,"Logger."
servtest,$2b$12$Kl4l5gqX1XghzteiykAil.nkRPrBL/iP15DVu6zJoZEkhjCs5x8Vu,Service Provider,Public,Test user - Servicer,-,-,"Servicer."
\.

COPY "record" ("id", "logger_username", "date") FROM stdin (DELIMITER ',');
441234001,mervin,2023-03-01
441234002,mervin,2023-03-02
441234003,mervin,2023-03-03
441234004,mervin,2023-03-04
441234005,mervin,2023-03-05
441234006,mervin,2023-03-06
441234007,mervin,2023-03-07
\.

-- TODO: add image once working
COPY "entry" ("record_id", "id", "type", "name", "category", "title", "item", "trigger_tag") FROM stdin (DELIMITER ',');
441234001,881234001,Variable,Diet,Breakfast,location,"Mei cheng food court",false
441234001,881234002,Variable,Diet,Breakfast,1,"Mifen w/ chicken cutlet\, spring rolls & cabbage w/ carrots",false
441234001,881234003,Variable,Diet,Breakfast,2,"Kopi C kosong peng",false
441234001,881234004,Variable,Diet,Lunch,location,"Putra Minang",false
441234001,881234005,Variable,Diet,Lunch,1,"Nasi padang w/ beef rendang\, curry cabbage w/ carrots & french beans \, bergedil",false
441234001,881234006,Variable,Diet,Lunch,location,"Funtea",false
441234001,881234007,Variable,Diet,Lunch,2,"Kopi C kosong",false
\.

COPY "logger_service" ("logger_username", "servicer_username", "status") FROM stdin (DELIMITER ',');
mervin,amir,Requested
mervin,izhar,Partnered
\.

COPY "comment" ("servicer_username", "logger_username", "servicer_comment", "servicer_response", "record_entry_id") FROM stdin (DELIMITER ',');
izhar,mervin,"That\'s nice\, but curry contains coconut milk... Try to avoid. And bojio?",false,881234005
\.

COPY "review" ("date", "logger_review", "logger_rating") FROM stdin (DELIMITER ',');
2023-03-10,"Fantastic and insightful service. Learnt a lot from the scholar - accurate description in the bio!",5
\.

COPY "triggers" ("logger_username","trigger_condition", "trigger_variable", "trigger_id") FROM stdin (DELIMITER ',');
mervin,"Eczema","Diet",881234005
\.

-- COMMIT ------------------------------------------------------------------------------------------------------------------------------------------

COMMIT;