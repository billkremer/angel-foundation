
CREATE DATABASE Angel_Data_Reporting

CREATE TABLE patient (
  patient_id SERIAL PRIMARY KEY,
  angel_patient_id int,
  age int,
  ethnicity varchar (100),
  martial_status varchar (50),
  diagnoses varchar (100),
  grant_used varchar (50),
  county varchar (50),
  clinic varchar (50),
  income int,
  gender varchar (10)
);

CREATE TABLE users (
  users_id SERIAL PRIMARY KEY,
  username varchar (50),
  password varchar (300)
);













-- -- patient table
-- CREATE TABLE patient (
-- patient_id SERIAL PRIMARY KEY,
-- angel_patient_id varchar (300)
-- );
--
-- -- ethnicity table
-- CREATE TABLE ethnicity (
-- ethnicity_id SERIAL PRIMARY KEY,
-- african_american boolean,
-- american_indian boolean,
-- asian boolean,
-- caucasian boolean,
-- hispanic boolean,
-- other boolean,
-- patient_id int REFERENCES patient
-- );
--
-- -- ages table
-- CREATE TABLE ages (
-- ages_id SERIAL PRIMARY KEY,
-- age_18 boolean,
-- age_20s boolean,
-- age_30s boolean,
-- age_40s boolean,
-- age_50s boolean,
-- age_60s boolean,
-- age_70s boolean,
-- age_80s boolean,
-- age_90s boolean,
-- patient_id int REFERENCES patient
-- );
--
-- -- diagnoses table
-- CREATE TABLE diagnoses (
-- diagnoses_id SERIAL PRIMARY KEY,
-- brain boolean,
-- breast boolean,
-- cervical boolean,
-- colon_rectal boolean,
-- leukemia boolean,
-- lung boolean,
-- lymphoma boolean,
-- multiple_myeloma boolean,
-- ovarian boolean,
-- pancreatic boolean,
-- prostate boolean,
-- patient_id int REFERENCES patient
-- );
--
-- -- martial status
-- CREATE TABLE martial_status (
-- martial_status_id SERIAL PRIMARY KEY,
-- divorced boolean,
-- relationship boolean,
-- married boolean,
-- seperated boolean,
-- single boolean,
-- widowed boolean,
-- patient_id int REFERENCES patient
-- );
--
-- -- county lived in
-- CREATE TABLE county (
-- county_id SERIAL PRIMARY KEY,
-- anoke boolean,
-- carver boolean,
-- dakota boolean,
-- hennepin boolean,
-- ramsey boolean,
-- scott boolean,
-- washington boolean,
-- patient_id int REFERENCES patient
-- );






-- CREATE TABLE achievement_data ( -- the achievements the child has completed.
-- 	id SERIAL PRIMARY KEY,
-- 	userid INT, --or userID?
-- 	achievement_id INT, -- so that it doesn't always show - using a JOIN.
--   achievement_completed_text TEXT,
--   achievement_completed_date DATE,
--   achievement_completed_comment TEXT
-- );
