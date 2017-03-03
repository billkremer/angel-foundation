
CREATE DATABASE Angel_Data_Reporting;

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


INSERT INTO patient ("patient_id","angel_patient_id","age","ethnicity","marital_status","diagnoses","grant_used","county","clinic","income","gender")
VALUES
(1,1,21,E'caucasian',E'single',E'cancer',E'$1000',E'Hennepin',E'HCMC',50000,E'male'),
(2,2,40,E'hispanic',E'married',E'cancer',E'$700',E'Ramsey',E'The Hospital',70000,E'female');

CREATE TABLE standard_reports (
  report_number SERIAL PRIMARY KEY,
  report_name varchar (100),
  query varchar (300)
  );


INSERT INTO standard_reports (report_name, query)
VALUES ('Report One', 'SELECT * FROM patient');

INSERT INTO standard_reports (report_name, query)
VALUES ('Report Two', 'SELECT ethnicity, income FROM patient');









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
