#!/usr/bin/env groovy
pipeline {
  agent any

  environment {
    TAG = "demo_${env.BRANCH_NAME}_${env.BUILD_NUMBER}"
    def containerId=0;
  }

  stages {     

    stage("Checkout") {
      steps {
        checkout scm
      }
    }

    stage("Build Image") {
      steps {

       bat "docker build -t pw$BUILD_NUMBER ."

        }
   }

    stage('Execute Image') {
      steps {
            bat "docker run --rm --name pw-automation -d --network=host pw$BUILD_NUMBER"
            }
}

 stage('Validations') {
      steps {
            def status = bat "docker exec -it pw-automation /bin/sh -c "curl http://localhost:7070/runtest""
            def maxwait = 15;
            def testStatus= ''; 
            for(int i=0;i<maxwait;i++){

              if(testStatus!='DONE'){
                  testStatus = bat "docker exec -it pw-automation /bin/sh -c "curl http://localhost:7070/getstatus""
                  echo "Test Status is: ${testStatus}"
              }
              if(testStatus == 'DONE'){
                 echo "Test Status is: ${testStatus}";
                 break;
              }
              if(testStatus == 'FAILED'){
                 echo "Test Status is: ${testStatus}";
                 break;
              }
              else if(i>maxwait){
                echo "Test Execution has reached maximum limit, hence breaking";
                break;
              }
              else{
                sleep(30);
              }

            }
          }
}
       
    
    stage('Results') {
      steps {
            echo 'Results are published...'
            }
       post {
        always {
          publishHTML target: [
            allowMissing         : false,
            alwaysLinkToLastBuild: false,
            keepAll             : true,
            reportDir            : 'Report',
            reportFiles          : 'output.html',
            reportName           : 'Test Report'
          ]
        }
      }
}


//  stage('Results') {
//  steps{
//        junit '**/target/surefire-reports/TEST-*.xml'
//        archive 'target/*.jar'l
//     }
//    }


//  stage('Delete Docker Images') {
//       steps {
//
//            bat "docker-compose -f docker-compose.yml down --rmi all"
//
//            bat "docker rmi -f uiprojdockerimage$BUILD_NUMBER"
//             }
//                             }

    }

  }

