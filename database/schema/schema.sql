-- psql -U postgres -h 127.0.0.1 -d shelterpets -f ./database/schema/schema.sql;

-- psql -U postgres -d shelterpets;

-- Show tables:
-- \dt

-- Show databases:
-- \l

-- See details of a table:
-- \d+ answers;

-- DROP DATABASE IF EXISTS shelterpets;

-- CREATE DATABASE shelterpets;

DROP TABLE IF EXISTS pets CASCADE;

CREATE TABLE pets (
   id SERIAL PRIMARY KEY,
   name VARCHAR(20) NOT NULL,
   description VARCHAR(2000) NOT NULL,
   age VARCHAR(20) NOT NULL,
   breed VARCHAR(40) NOT NULL,
   energyLevel INT,
   skill1Known VARCHAR(100),
   skill2Known VARCHAR(100),
   skill3Known VARCHAR(100),
   skill1ToLearn VARCHAR(100),
   skill2ToLearn VARCHAR(100),
   skill3ToLearn VARCHAR(100),
   photo1OfMe TEXT,
   photo2OfMe TEXT,
   photo3OfMe TEXT,
   photo4OfMe TEXT,
   photo5OfMe TEXT,
   comfortWithCats INT DEFAULT 0,
   comfortWithDogs INT DEFAULT 0,
   comfortWithKids INT DEFAULT 0
);


-- See timing of queries in terminal:
-- \timing


-- Convert date from unix to date timestamp
-- ALTER TABLE  answers
--   ALTER COLUMN date_written TYPE TIMESTAMP USING
--    to_timestamp(date_written / 1000) + ((date_written % 1000) || ' milliseconds') :: INTERVAL;


-- Add photos column to answers table, Create temp table to store photo urls in an array per answer id - then reassign the photos column in answers to be these values:
-- ALTER TABLE answers ADD photos TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[]
-- CREATE TEMP TABLE urls AS SELECT answer_id, array_agg(url) as url_list FROM answers_photos GROUP BY answer_id;
-- UPDATE answers SET photos = url_list FROM urls WHERE answers.id = urls.answer_id;


-- To see count in a table/column:
-- select count(*) from answers_photos;


-- Change SERIAL id starting number (because importing the its screws up the serial setup)
-- ALTER SEQUENCE ${table}_${column}_seq RESTART WITH ${newStart}


-- date_written DATE NOT NULL DEFAULT CURRENT_DATE


-- Create index - create it in a table for all columns used with 'WHERE, ON or AND' of a query
-- Adding indexes for getQuestionsWithAnswers:
-- CREATE INDEX questionsForProduct_idx ON questions(product_id, reported);
-- CREATE INDEX answersForQs_idx ON answers(question_id, reported);


-- To get overview of query report - add this in front of query, inside terminal:
-- EXPLAIN (ANALYZE)