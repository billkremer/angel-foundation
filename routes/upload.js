var router = require('express').Router();
var pg = require('pg');
var config = {database: process.env.DATABASE_URL};
var pool = new pg.Pool(config);

router.post('/allPatientData', function(req, res) {
  console.log('posting patient csv to database');
   console.log(req.body.dataArray[100]);


  var patientArray = req.body.dataArray;

  pool.connect(function(err, client, done) {
    if(err) {
      console.log('Error connecting to DB', err);
      res.sendStatus(500);
      done()
    } else {
        //Sending timestamp to DB
      client.query('UPDATE "date" SET patient_time = current_timestamp WHERE id = 1;',
        function(err, result) {
          done();
          if (err) {
            console.log('Error setting time stamp in DB', err);
            res.sendStatus(500);
          } else {

          }
        }
      )
      //Clearing DB data
      client.query('TRUNCATE patient',
        function(err, result) {
          done();
          if (err) {
            console.log('Error clearing DB', err);
            res.sendStatus(500);
          } else {

          }
        }
      )

      for (var i=0; i < patientArray.length; i++  ) {

        patientArray[i].ApplicationDate = new Date(patientArray[i].ApplicationDate);
        patientArray[i].ExpirationDate = new Date(patientArray[i].ExpirationDate);
        patientArray[i].DOB = new Date(patientArray[i].DOB);

        client.query('INSERT INTO patient (application_date, expiration_date, qualify_amount, transaction_type, patient_id, diagnosis, cancer_stage, date_of_birth, gender, ethnicity, marital_status, veteran, city, county, state, zip, fact_family, monthly_income, reason, referred_by, social_worker_id, social_worker_clinic, doctor_id, doctor_clinic, does_not_qualify, does_not_qualify_reason,householdcount) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26,$27)' , [patientArray[i].ApplicationDate, patientArray[i].ExpirationDate, patientArray[i].QualifyAmount, patientArray[i].TransactionType, patientArray[i].PatientID, patientArray[i].Diagnosis, patientArray[i].CancerStage, patientArray[i].DOB, patientArray[i].Gender, patientArray[i].Ethnic, patientArray[i].MaritalStatus, patientArray[i].Veteran, patientArray[i].City, patientArray[i].County, patientArray[i].State, patientArray[i].ZIP, patientArray[i].FaCTFamily, patientArray[i].MonthlyIncome, patientArray[i].Reason, patientArray[i].ReferredBy, patientArray[i].SocialWorkerID, patientArray[i]['SocialWorkers.Clinic'], patientArray[i].DoctorID, patientArray[i]['Doctors.Clinic'], patientArray[i].DoesNotQualify, patientArray[i].DNQReason,patientArray[i].HouseholdCount],


        function(err, result) {
          done();
          if (err) {
            console.log('Error querying DB', err);
            // res.sendStatus(500);
            res.send({status: 500, id: patientArray[i] });
            // let them know which rows have the error

          } else {
            //  console.log('Got info from DB', result.rows);  // comment out later
            //  res.send(result.rows);
          }
        }
      )
      // end for
    }
  }
  res.sendStatus(201); // record created
}) // pool connection closer


}); // post closer



router.post('/allDistributionData', function(req, res) {
  console.log('posting csv to database');
  console.log(req.body);

  var distributionArray = req.body.dataArray;


  pool.connect(function(err, client, done) {
    if(err) {
      console.log('Error connecting to DB, err');
      res.sendStatus(500);
      done()
    } else {
        //Sending timestamp to DB
      client.query('UPDATE "date" SET distributions_time = current_timestamp WHERE id = 1;',
        function(err, result) {
          done();
          if (err) {
            console.log('Error setting time stamp in DB', err);
            res.sendStatus(500);
          } else {

          }
        }
      )
      //Clearing DB data
      client.query('TRUNCATE distributions',
        function(err, result) {
          done();
          if (err) {
            console.log('Error clearing DB', err);
            res.sendStatus(500);
          } else {

          }
        }
      )

      for (var i=0; i < distributionArray.length; i++ ) {

        distributionArray[i].ApplicationDate = new Date(distributionArray[i].ApplicationDate);
        distributionArray[i].DistroDate = new Date(distributionArray[i].DistroDate);
        distributionArray[i].DOB = new Date(distributionArray[i].DOB);

        client.query('INSERT INTO distributions (patient_id, date_of_birth, grant_type, transaction_type, application_date, distribution_date, fund_general, fund_komen, fund_brain, fund_park_nicollet, fund_lung, fund_melanoma, fund_margies, fund_colon, fund_total, qualify_amount) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)' , [distributionArray[i].PatientID, distributionArray[i].DOB, distributionArray[i].GrantType, distributionArray[i].TransactionType, distributionArray[i].ApplicationDate, distributionArray[i].DistroDate, distributionArray[i].FundGeneral, distributionArray[i].FundKomen, distributionArray[i].FundBrain, distributionArray[i].FundParkNicollet, distributionArray[i].FundLung, distributionArray[i].FundMelanoma, distributionArray[i].FundMargies, distributionArray[i].FundColon, distributionArray[i].FundTotal, distributionArray[i].QualifyAmount],

        function(err, result) {
          done();
          if (err) {
            console.log('Error querying DB', err);
            res.send({status: 500, id: distributionArray[i] });
            // res.sendStatus(500);
          } else {
            // console.log('Got info from DB', result.rows);
            // res.send(result.rows);
          }
        }
      )
    } // end for
  }
  res.sendStatus(201); // record created
}) // pool connection closer
}); // post closer


router.post('/addPatientData', function(req, res) {
  console.log('posting patient csv to database');
  // console.log(req.body.dataArray[100]);

  var patientArray = req.body.dataArray;

  pool.connect(function(err, client, done) {
    if(err) {
      console.log('Error connecting to DB', err);
      res.sendStatus(500);
      done()
    } else {
        //Sending timestamp to DB
      client.query('UPDATE "date" SET patient_time = current_timestamp WHERE id = 1;',
        function(err, result) {
          done();
          if (err) {
            console.log('Error setting time stamp in DB', err);
            res.sendStatus(500);
          } else {

          }
        }
      )

      for (var i=0; i < patientArray.length; i++  ) {

        patientArray[i].ApplicationDate = new Date(patientArray[i].ApplicationDate);
        patientArray[i].ExpirationDate = new Date(patientArray[i].ExpirationDate);
        patientArray[i].DOB = new Date(patientArray[i].DOB);


        client.query('INSERT INTO patient (application_date, expiration_date, qualify_amount, transaction_type, patient_id, diagnosis, cancer_stage, date_of_birth, gender, ethnicity, marital_status, veteran, city, county, state, zip, fact_family, monthly_income, reason, referred_by, social_worker_id, social_worker_clinic, doctor_id, doctor_clinic, does_not_qualify, does_not_qualify_reason) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26)' , [patientArray[i].ApplicationDate, patientArray[i].ExpirationDate, patientArray[i].QualifyAmount, patientArray[i].TransactionType, patientArray[i].PatientID, patientArray[i].Diagnosis, patientArray[i].CancerStage, patientArray[i].DOB, patientArray[i].Gender, patientArray[i].Ethnic, patientArray[i].MaritalStatus, patientArray[i].Veteran, patientArray[i].City, patientArray[i].County, patientArray[i].State, patientArray[i].ZIP, patientArray[i].FaCTFamily, patientArray[i].MonthlyIncome, patientArray[i].Reason, patientArray[i].ReferredBy, patientArray[i].SocialWorkerID, patientArray[i]['SocialWorkers.Clinic'], patientArray[i].DoctorID, patientArray[i]['Doctors.Clinic'], patientArray[i].DoesNotQualify, patientArray[i].DNQReason],


        function(err, result) {
          done();
          if (err) {
            console.log('Error querying DB', err);
            // res.sendStatus(500);
            res.send({status: 500, id: patientArray[i] });
            // let them know which rows have the error

          } else {
            //  console.log('Got info from DB', result.rows);  // comment out later
            //  res.send(result.rows);
          }
        }
      )
      // end for
    }
  }
  res.sendStatus(201); // record created
}) // pool connection closer


}); // post closer



router.post('/addDistributionData', function(req, res) {
  console.log('posting csv to database');
  console.log(req.body);

  var distributionArray = req.body.dataArray;


  pool.connect(function(err, client, done) {
    if(err) {
      console.log('Error connecting to DB, err');
      res.sendStatus(500);
      done()
    } else {
      //Sending timestamp to DB
      client.query('UPDATE "date" SET distributions_time = current_timestamp WHERE id = 1;',
        function(err, result) {
          done();
          if (err) {
            console.log('Error setting time stamp in DB', err);
            res.sendStatus(500);
          } else {

          }
        }
      )

      for (var i=0; i < distributionArray.length; i++ ) {

        distributionArray[i].ApplicationDate = new Date(distributionArray[i].ApplicationDate);
        distributionArray[i].DistroDate = new Date(distributionArray[i].DistroDate);
        distributionArray[i].DOB = new Date(distributionArray[i].DOB);

        client.query('INSERT INTO distributions (patient_id, date_of_birth, grant_type, transaction_type, application_date, distribution_date, fund_general, fund_komen, fund_brain, fund_park_nicollet, fund_lung, fund_melanoma, fund_margies, fund_colon, fund_total, qualify_amount) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)' , [distributionArray[i].PatientID, distributionArray[i].DOB, distributionArray[i].GrantType, distributionArray[i].TransactionType, distributionArray[i].ApplicationDate, distributionArray[i].DistroDate, distributionArray[i].FundGeneral, distributionArray[i].FundKomen, distributionArray[i].FundBrain, distributionArray[i].FundParkNicollet, distributionArray[i].FundLung, distributionArray[i].FundMelanoma, distributionArray[i].FundMargies, distributionArray[i].FundColon, distributionArray[i].FundTotal, distributionArray[i].QualifyAmount],

        function(err, result) {
          done();
          if (err) {
            console.log('Error querying DB', err);
            res.send({status: 500, id: distributionArray[i] });
            // res.sendStatus(500);
          } else {
            // console.log('Got info from DB', result.rows);
            // res.send(result.rows);
          }
        }
      )
    } // end for
  }
  res.sendStatus(201); // record created
}) // pool connection closer
}); // post closer


router.get('/databasePatientTimeStamp', function(req,res){
  pool.connect(function(err, client, done) {
    if (err) {
        console.log("Error connecting to DB", err);
        res.sendStatus(500);
        done();
    } else {
        client.query('SELECT to_char(patient_time, \'HH:MIAM  Day MonthDD, YYYY\') FROM date WHERE id = 1;', function(err, result) {
            done();
            if (err) {
                console.log("Error querying DB", err);
                res.sendStatus(500);
            } else {
                console.log("Got timestamp from DB", result.rows);
                res.send(result.rows);
            }
        });
    }
  })
});

router.get('/databaseDistTimeStamp', function(req,res){
  pool.connect(function(err, client, done) {
    if (err) {
        console.log("Error connecting to DB", err);
        res.sendStatus(500);
        done();
    } else {
        client.query('SELECT to_char(distributions_time, \'HH:MIAM  Day MonthDD, YYYY\') FROM date WHERE id = 1;', function(err, result) {
            done();
            if (err) {
                console.log("Error querying DB", err);
                res.sendStatus(500);
            } else {
                console.log("Got timestamp from DB", result.rows);
                res.send(result.rows);
            }
        });
    }
  })
});


module.exports = router;
