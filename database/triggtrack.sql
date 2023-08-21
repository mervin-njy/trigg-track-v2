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
  "date" VARCHAR(10) UNIQUE,
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
  "date" VARCHAR(10) NOT NULL PRIMARY KEY,
  "logger_review" TEXT NOT NULL,
  "logger_rating" INT2 NOT NULL,
  CONSTRAINT "rating_check" 
    CHECK (("logger_rating" > 0) AND ("logger_rating" <= 5))
);

CREATE TABLE "logger_service" (
  "logger_username" VARCHAR(100),
  "servicer_username" VARCHAR(100),
  "status" VARCHAR(20) NOT NULL,
  "review_date" VARCHAR(10) NULL,
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
441234008,mervin,2023-03-08
441234009,mervin,2023-03-09
441234010,mervin,2023-03-10
441234011,mervin,2023-03-11
441234012,mervin,2023-03-12
441234013,mervin,2023-03-13
441234014,mervin,2023-03-14
441234015,mervin,2023-03-15
441234016,mervin,2023-03-16
441234017,mervin,2023-03-17
441234018,mervin,2023-03-18
441234019,mervin,2023-03-19
441234020,mervin,2023-03-20
441234021,mervin,2023-03-21
441234022,mervin,2023-03-22
441234023,mervin,2023-03-23
441234024,mervin,2023-03-24
441234025,mervin,2023-03-25
441234026,mervin,2023-03-26
441234027,mervin,2023-03-27
441234028,mervin,2023-03-28
441234029,mervin,2023-03-29
441234030,mervin,2023-03-30
441234031,mervin,2023-03-31
441234032,mervin,2023-04-01
441234033,mervin,2023-04-02
441234034,mervin,2023-04-03
441234035,mervin,2023-04-04
441234036,mervin,2023-04-05
441234037,mervin,2023-04-06
441234038,mervin,2023-04-07
441234039,mervin,2023-04-08
441234040,mervin,2023-04-09
441234041,mervin,2023-04-10
441234042,mervin,2023-04-11
441234043,mervin,2023-04-12
441234044,mervin,2023-04-13
441234045,mervin,2023-04-14
441234046,mervin,2023-04-15
441234047,mervin,2023-04-16
441234048,mervin,2023-04-17
441234049,mervin,2023-04-18
441234050,mervin,2023-04-19
441234051,mervin,2023-04-20
441234052,mervin,2023-04-21
441234053,mervin,2023-04-22
441234054,mervin,2023-04-23
441234055,mervin,2023-04-24
441234056,mervin,2023-04-25
441234057,mervin,2023-04-26
441234058,mervin,2023-04-27
441234059,mervin,2023-04-28
441234060,mervin,2023-04-29
441234061,mervin,2023-04-30
\.

-- TODO: add image once working
COPY "entry" ("record_id", "id", "type", "name", "category", "title", "item", "trigger_tag") FROM stdin (DELIMITER ',');
441234001,881234001,Variable,Diet,Breakfast,location,Home,false
441234001,881234002,Variable,Diet,Breakfast,1,Barcook Bakery\'s Coconut bread,false
441234001,881234003,Variable,Diet,Breakfast,2,Soft boiled eggs,false
441234001,881234004,Variable,Diet,Breakfast,3,Filtered coffee,false
441234001,881234005,Variable,Diet,Lunch,location,MacDonald\'s,false
441234001,881234006,Variable,Diet,Lunch,1,Double quarter pounder w/ 2 beef patties\, cheese\, onion & ketchup,false
441234001,881234007,Variable,Diet,Lunch,2,Shaker fries w/ chargrilled chicken seasoning & curry sauce,false
441234001,881234008,Variable,Diet,Lunch,3,Flat white w/ lotus biscuit,false
441234001,881234009,Variable,Diet,Dinner,location,Home,false
441234001,881234010,Variable,Diet,Dinner,1,Mung bean dong fen w/ ikea plant balls\, omelette\, red bellpepper\, cabbage\, garlic\, spring onion\, vege stock\, sunflower & canola oil, false
441234001,881234011,Variable,Diet,Dinner,2,Red dragonfruit w/ pear smoothie,false
441234001,881234012,Condition,Eczema,Itch,7/10,Needed antihistamine to control,false
441234001,881234013,Condition,Eczema,Flare,8/10,Mostly on sole of feet,false
441234001,881234014,Condition,Eczema,Dry,7/10,Flaky,false
441234001,881234015,Condition,Herniated Disc,Pain,5/10,Manageable,false
441234002,881234016,Variable,Diet,Breakfast,location,Mei cheng food court,false
441234002,881234017,Variable,Diet,Breakfast,1,Mifen w/ chicken cutlet\, spring rolls & cabbage w/ carrots,false
441234002,881234018,Variable,Diet,Breakfast,2,Kopi C kosong peng,false
441234002,881234019,Variable,Diet,Lunch,location,Putra Minang,false
441234002,881234020,Variable,Diet,Lunch,1,Nasi padang w/ beef rendang\, curry cabbage w/ carrots & french beans \, bergedil,false
441234002,881234021,Variable,Diet,Lunch,location,Funtea,false
441234002,881234022,Variable,Diet,Lunch,2,Kopi C kosong,false
441234002,881234023,Variable,Diet,Dinner,location,Bishan st 22 chindamani indian stall,false
441234002,881234024,Variable,Diet,Dinner,1,Cheese egg prata\, plain prata w/ dhal curry,false
441234002,881234025,Variable,Diet,Dinner,location,Taimei,false
441234002,881234026,Variable,Diet,Dinner,1,Popcorn chicken & assorted mushrooms w/ sour plum powder,false
441234002,881234027,Variable,Diet,Dinner,location,Boost,false
441234002,881234028,Variable,Diet,Dinner,1,Watermelon lychee crush w/ sorbet,false
441234002,881234029,Condition,Eczema,Itch,9/10,Cannot fall asleep,false
441234002,881234030,Condition,Eczema,Flare,9/10,Mostly on hands,false
441234002,881234031,Condition,Eczema,Dry,7/10,Looking for a new dyson vacuum,false
441234002,881234032,Condition,Herniated Disc,Pain,6/10,Slightly more uncomfortable,false
441234003,881234033,Variable,Diet,Breakfast,location,Home,false
441234003,881234034,Variable,Diet,Breakfast,1,Barcook Bakery\'s Banana bread w/ chocolate filling,false
441234003,881234035,Variable,Diet,Breakfast,2,Soft boiled eggs,false
441234003,881234036,Variable,Diet,Breakfast,3,Filtered coffee,false
441234003,881234037,Variable,Diet,Lunch,location,Idaten,false
441234003,881234038,Variable,Diet,Lunch,1,Beef sukiyaki don w/ onsen egg & sesame,false
441234003,881234039,Variable,Diet,Lunch,location,Old tea hut,false
441234003,881234040,Variable,Diet,Lunch,1,Kopi c kosong peng,false
441234003,881234041,Condition,Eczema,Itch,8/10,Could it be the environment,false
441234003,881234042,Condition,Eczema,Flare,7/10,Everywhere is the same,false
441234003,881234043,Condition,Eczema,Dry,6/10,Moisturizing like mad,false
441234003,881234044,Condition,Herniated Disc,Pain,4/10,Will be fine soon I hope,false
441234032,881234045,Variable,Diet,Breakfast,location,Home,false
441234032,881234046,Variable,Diet,Breakfast,1,Gluten-free museli corn flakes w/ cashew milk,false
441234032,881234047,Variable,Diet,Breakfast,2,Dorayaki w/ hokkaido cream and red bean,false
441234032,881234048,Variable,Diet,Breakfast,3,Filtered coffee,false
441234032,881234049,Variable,Diet,Lunch,location,Greendot,false
441234032,881234050,Variable,Diet,Lunch,1,Hainanese beancurd skin curry rice w/ shiitake mushrooms\, braised tau kwa\, stir-fried cabbage\, black fungus & carrot,false
441234032,881234051,Variable,Diet,Lunch,2,Fruit tea w/ apple & strawberries,false
441234032,881234052,Variable,Diet,Dinner,location,Home - mum\'s food,false
441234032,881234053,Variable,Diet,Dinner,1,Steamed fish w/ dang gui\, red date & yuzu,false
441234032,881234054,Variable,Diet,Dinner,2,Stir-fried cabbage w/ carrots & mushrooms\, served w/ brown rice,false
441234032,881234055,Variable,Diet,Dinner,3,Udders\' salted speculoos ice cream,false
441234032,881234056,Variable,Diet,Dinner,4,Citrus lime alcohol,false
441234032,881234057,Variable,Diet,Dinner,5,Plum flavoured chips,false
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