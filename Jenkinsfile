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

