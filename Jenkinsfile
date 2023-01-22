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

    stage("Execute DockerFile") {
      steps {

       bat "docker build -t pw$BUILD_NUMBER ."

        }
   }

    stage('Execute PW Test') {
      steps {
            bat "docker run -d --network=host pw$BUILD_NUMBER npm run test"
            }

            post {
                            success {
                                junit '**/target/surefire-reports/TEST-*.xml'
                                       archive 'target/*.jar'
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

