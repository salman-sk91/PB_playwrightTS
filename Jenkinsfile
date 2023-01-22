#!/usr/bin/env groovy
pipeline {
  agent any

  environment {
    TAG = "demo_${env.BRANCH_NAME}_${env.BUILD_NUMBER}"
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

    stage('Test') {
      steps {
            bat "docker run -d --network=host pw$BUILD_NUMBER npm run test"
            }
}

 stage('Validate') {
      steps {
            echo 'Validating...'
           containerId =  bat docker ps -aqf "ancestor=pw$BUILD_NUMBER"
           echo 'Container Id is : '+containerId
        
            exitcode=-1

           while(exitcode!=0){
            exitcode= bat docker inspect containerId --format='{{.State.ExitCode}}'
            echo 'Exit code: '+exitcode
           }
            }
}

    stage('Results') {
      steps {
            echo 'Results are published...'
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

