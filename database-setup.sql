CREATE DATABASE angel_data_reporting


CREATE TABLE patient (
  id SERIAL PRIMARY KEY,
  application_date DATE,
  expiration_date DATE,
  qualify_amount INT,
  transaction_type TEXT,
  patient_id INT,
  diagnosis TEXT,
  cancer_stage TEXT,
  date_of_birth DATE,
  gender TEXT,
  ethnicity TEXT,
  marital_status TEXT,
  veteran BOOLEAN,
  city TEXT,
  county TEXT,
  state VARCHAR(3),
  zip VARCHAR(10),
  monthly_income MONEY,
  fact_family BOOLEAN,
  reason TEXT,
  referred_by TEXT,
  social_worker_id INT,
  social_worker_clinic TEXT,
  doctor_id INT,
  doctor_clinic TEXT,
  does_not_qualify BOOLEAN,
  does_not_qualify_reason TEXT,
  householdcount TEXT
);


-- demo patient data to test table creation
INSERT INTO patient ("application_date","expiration_date","qualify_amount","transaction_type","patient_id","diagnosis","cancer_stage","date_of_birth","gender","ethnicity","marital_status","veteran","city","county","state","zip","fact_family","monthly_income","reason","referred_by","social_worker_id","social_worker_clinic","doctor_id","doctor_clinic","does_not_qualify","does_not_qualify_reason")
VALUES
('2016-07-25','2016-10-23',850,'General',3187,'Appendix','None Specified','1967-11-12','Female','','Single',FALSE,'St Louis Park','Hennepin','MN','55426',TRUE,'$800.00','Increasing exp. due to treatment','Social Worker',39,'U of M - Masonic Cancer Clinic',59,'University of Minnesota-Masonic',FALSE,'');



CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username varchar (50),
  password varchar (300)
);


CREATE TABLE distributions (
  id SERIAL PRIMARY KEY,
  patient_id INT,
  date_of_birth DATE,
  grant_type TEXT,
  transaction_type TEXT,
  application_date DATE,
  distribution_date DATE,
  fund_general MONEY,
  fund_komen MONEY,
  fund_brain MONEY,
  fund_park_nicollet MONEY,
  fund_lung	MONEY,
  fund_melanoma	MONEY,
  fund_margies MONEY,
  fund_colon MONEY,
  fund_total MONEY,
  qualify_amount REAL
);


-- demo distribution data to test table creation
INSERT INTO distributions ("patient_id","date_of_birth","grant_type","transaction_type","application_date","distribution_date","fund_general","fund_komen","fund_brain","fund_park_nicollet","fund_lung","fund_melanoma","fund_margies","fund_colon","fund_total","qualify_amount")
VALUES
(1043,'1970-08-12','Grocery Card','Margie''s Fund','2016-01-06','2016-01-06','$0.00','$0.00','$0.00','$0.00','$0.00','$0.00','$100.00','$0.00','$100.00',200);



CREATE TABLE standard_reports (
  report_number SERIAL PRIMARY KEY,
  report_name varchar (100),
  query varchar (300)
  );


INSERT INTO standard_reports (report_name, query)
VALUES ('Report One', 'SELECT * FROM patient');

INSERT INTO standard_reports (report_name, query)
VALUES ('Report Two', 'SELECT ethnicity, monthly_income FROM patient');


CREATE TABLE date (
id SERIAL PRIMARY KEY,
patient_time TIMESTAMP,
distributions_time TIMESTAMP
);

INSERT INTO date (patient_time, distributions_time) VALUES (current_timestamp, current_timestamp);








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
