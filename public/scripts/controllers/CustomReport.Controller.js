angular.module("AngelApp").controller("CustomReportController",
  function(CustomReportService,$location,$http) {
    console.log('custom controller loaded');

    var vm=this;

    vm.diagnosis=[];
    vm.cities=[];
    vm.counties=[];
    vm.zipCodes=[];
    vm.states=[];
    vm.socialWorkerId=[];
    vm.socialWorkerClinic=[];
    vm.doctorClinic=[];
    vm.doctorIds=[];

    //gets all diagnosis from the database
    vm.getDiagnosis=function(){
      CustomReportService.getAllDiagnosis().then(function(response){
        var allDiagnosis=response.data;
        allDiagnosis.forEach(function(item){
          vm.diagnosis.push(item.diagnosis);
        })
      });
    };
    vm.getCities=function(){
      CustomReportService.getAllCities().then(function(response){
        var allCities=response.data;
        allCities.forEach(function(item){
          vm.cities.push(item.city);
        })
      });
    };
    vm.getCounties=function(){
      CustomReportService.getAllCounties().then(function(response){
        var allCounties=response.data;
        allCounties.forEach(function(item){
          vm.counties.push(item.county);
        })
      });
    };
    vm.getStates=function(){
      CustomReportService.getAllStates().then(function(response){
        var allStates=response.data;
        allStates.forEach(function(item){
          vm.states.push(item.state);
        })
      });
    };
    vm.getZipCodes=function(){
      CustomReportService.getAllZipCodes().then(function(response){
        var allZipCodes=response.data;
        allZipCodes.forEach(function(item){
          vm.zipCodes.push(item.zip);
        })
      });
    };
    vm.getSwIds=function(){
      CustomReportService.getAllSwIds().then(function(response){
        var allSwIds=response.data;
        allSwIds.forEach(function(item){
          vm.socialWorkerId.push(item.social_worker_id);
        })
      });
    };
    vm.getSwClinics=function(){
      CustomReportService.getAllSwClinics().then(function(response){
        var allSwClinics=response.data;
        allSwClinics.forEach(function(item){
          vm.socialWorkerClinic.push(item.social_worker_clinic);
        })
      });
    };
    vm.getDrClinics=function(){
      CustomReportService.getAllDrClinics().then(function(response){
        var allDrClinics=response.data;
        allDrClinics.forEach(function(item){
          vm.doctorClinic.push(item.doctor_clinic);
        })
      });
    };
    vm.getDrIds=function(){
      CustomReportService.getAllDrIds().then(function(response){
        var allDrIds=response.data;
        allDrIds.forEach(function(item){
          vm.doctorIds.push(item.doctor_id);
        })
      });
    };

    //calls on page load
    vm.getDiagnosis();//gets all diagnosis
    vm.getCities();//gets all cities
    vm.getCounties();//gets all counties
    vm.getStates();//get all states
    vm.getZipCodes();//gets all zip codes
    vm.getSwIds();//get all Social Workers Ids
    vm.getSwClinics();//get all Social Worker clinics
    vm.getDrClinics();//get all doctor clinics
    vm.getDrIds();//get all doctor IDs

    vm.dataSetList=[
      {
        title:'Application Date',
        options:[]
      },
      {
        title:'Application Expiration Date',
        options:[]
      },
      {
        title:'Qualify Amount',
        options:['0','100-300','301-500','501-800','801+']
      },
      {
        title:'Transaction Type',
        options:["General", "Margie's Fund"]
      },
      {
        title:'Diagnosis',
        options: vm.diagnosis
      },
      {
        title:'Cancer Stage',
        options:["Remission","None Specified","IV","III","II","I"]
      },
      {
        title:'Age',
        options:['<18','19-29','30-39','40-49','50-59','60-69','70+']
      },
      {
        title:'Gender',
        options:['female','male']
      },
      {
        title:'ethncity',
        options:['female','male']
      },
      {
        title:'marital status',
        options:['Married','Single','Not specified']
      },
      {
        title:'Veteran',
        options:['Yes','No']
      },
      {
        title:'City',
        options: vm.cities
      },
      {
        title:'County',
        options: vm.counties
      },
      {
        title:'State',
        options: vm.states
      },
      {
        title:'Zip Code',
        options: vm.zipCodes
      },
      {
        title:'Monthly Income',
        options:['0','1-15000','15001-30000','300001-45000','45001-60000','60001-75000','75001+']
      },
      {
        title:'Fact Family',
        options:['yes','no']
      },
      {
        title:'Reason',
        options:['Cannot work die to treatment','Extreme Circumstances', 'Forced to move/homeless',
                'Has young children', 'High medical costs', 'In school/recently finished', 'Increasing exp. due to treatment',
                'Lost job', 'Other', 'Terminal', 'Waiting for other funds']
      },
      {
        title:'Referred by',
        options:['Brochure', 'Family', 'Friend', 'Internet', 'Nurse', 'Nurse Navigator', 'Oncologist', 'Other', 'Patient Financial Counselor',
                'Patient Navigator', 'Social Worker', 'United Way 211']
      },
      {
        title:'Social Worker ID',
        options: vm.socialWorkerId
      },
      {
        title:'Social Worker Clinic',
        options: vm.socialWorkerClinic
      },
      {
        title:'Doctor ID',
        options: vm.doctorIds
      },
      {
        title:'Doctor Clinic',
        options: vm.doctorClinic
      }
    ];  // end of dataSetList object

    // vm.dataSetListCategoryOrder = ['gender', 'age', 'income', 'marital'];
    // trying to order the categories on the html page.

    vm.dataSetSelections=[{title:'no selections'}];


    vm.addSelection = function(category,option) {
      if (vm.dataSetSelections[0].title == 'no selections'){
        vm.dataSetSelections=[];
      }

      console.log('category', category);
      console.log('option', option);

        function isMatch(element,index,array){
          return element.title == category.title;
        }

      if (vm.dataSetSelections.some(isMatch)) {
        for(var i=0; i < vm.dataSetSelections.length; i++) {
            if (vm.dataSetSelections[i].title == category.title){
              if (vm.dataSetSelections[i].options.indexOf(option) == -1) {
                vm.dataSetSelections[i].options.push(option);
              };
            };
        };
      } else {
          vm.dataSetSelections.push(
            {
              title:category.title,
              options:[option]
            });
      }
      console.log(vm);
    }; // close addSelection


    vm.removeOptionSelection = function(category,option){
      for(var i=0;i<vm.dataSetSelections.length;i++){
          if (vm.dataSetSelections[i].title == category.title){
            var index = vm.dataSetSelections[i].options.indexOf(option);
            vm.dataSetSelections[i].options.splice(index,1);
          }
      } console.log(vm.dataSetSelections[0]);
      if(vm.dataSetSelections[0] == undefined){
        vm.dataSetSelections=[{title:'no selections'}];
      } console.log(vm.dataSetSelections[0]);
    }


    vm.removeCategorySelection=function(category){
      for(var i=0;i<vm.dataSetSelections.length;i++){
          if (vm.dataSetSelections[i].title==category.title){
            vm.dataSetSelections.splice(i,1);
          }
      }console.log(vm.dataSetSelections[0]);
      if(vm.dataSetSelections[0]==undefined){
          vm.dataSetSelections=[{title:'no selections'}];
        }console.log(vm.dataSetSelections[0]);
    }

});

// 'Adenocarcinoma','Adenoid Cystic Carcinoma','Amyloidosis','Anal','Apocrine','Appendix','Bladder','Bone','Brain - Ependymoma',
//         'Brain - Meningioma','Brain - Oligoastrocytoma','Brain- Astrocytoma','Brain- Esthesioneuroblastoma','Brain- Glioblastoma',
//         'Brain- Glioma','Brain- not specified','Brain-Oliodendroglioma','Breast- DCIS','Breast- LCIS','Breast- not specified','Carcinoid tumor',
//         'Carcinoma','Carcinoma - Myoepithelial','Carcinomatosis',"Castleman's Disease",'Cholangiocarcinoma','Chordoma - lumbar',
//         'Essential Thrombocytosis','Fallopian Tube','Gastrointestinal - Colon','Gastrointestinal - Colorectal','Gastrointestinal - Duodenum',
//         'Gastrointestinal - Esophageal','Gastrointestinal - Gallbladder','Gastrointestinal - Liver','Gastrointestinal - Pancreatic',
//         'Gastrointestinal - Stomach','Gastrointestinal - Stromal','Gastrointestinal - Unspecified','Gynecological - Cervical',
//         'Gynecological - Uterine','Gynecological - Vaginal','Gynecological -Ovarian','Gynecological -Uterine Endometrial',
//         'Head & Neck - Hypopharyngeal','Head & Neck - Laryngeal','Head & Neck - Maxillary Sinus','Head & Neck - Oral','Head & Neck - Oropharyngeal',
//         'Head & Neck - Throat','Head & Neck - Tongue','Head & Neck - Tonsil','Head & Neck- Nasopharyngeal','Head & Neck- not specified',
//         'Head & Neck-Mandible','Head and Neck - Epiglottis','Kidney','Langerhans Histiocytosis','Leiomyosarcoma','Leukemia - Blast Cell',
//         'Leukemia- APL','Leukemia- CLL','Leukemia- CML','Leukemia- MDS','Leukemia- not specified','Leukemia-ALL','Leukemia-AML',
//         'Leukemia-CMML chronic myelomonocytic leukemia','Leukemia-Lymphoproliferative disorder','Lipoma-Spindle cell',"Lung- not specified",
//         "Lung- NSCLC","Lung- SCLC","Lymphoma - Mantle Cell","Lymphoma - Splenic Marginal Zone","Lymphoma - Waldenstrom's Macroglobulinemia",
//         "Lymphoma- B-cell","Lymphoma- Burkitts Lymphoma","Lymphoma- Hodgkin","Lymphoma- Non Hodgkins Lymphoma","Lymphoma- not specified",
//         "Lymphoma- T-cell","Lymphoma-Follicular","Lympoma-MALT","Malignant Neoplasm","Melanoma",'Melanoma - Ocular','Mesotheliaoma',
//         'Multiple Myeloma','Myeloproliferative neoplasms','Neuroendocrine Carcinoma','Osteosarcoma','Other','Paranasal Sinus','Parotid Gland Cancer',
//         'Peripheral Nerve Sheath Tumor','Peritoneal Carcinoma','Polycythemia Vera','Prostate','Rectal','Rhabdomyo Sarcoma','Sarcoma - Synovial',
//         'Sarcoma- Ewing Sarcoma','Sarcoma- Kaposi','Sarcoma- not specified','Sarcoma- Soft Tissue','Skin Cancer- Melanoma','Skin Cancer- Squamous Cell Carcinoma',
//         'Testicular','Thymoma','Unknown Primary','Urothelial',]
