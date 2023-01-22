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
             timeout(time: 5, unit: 'MINUTES') {
          waitUntil {
            script {
              echo 'Validate...'                      
              sh(script: 'uname', returnStdout: true)
               containerId = bat (script: 'docker ps -aqf \"ancestor=pw$(BUILD_NUMBER)\"',returnStdout: true).trim()
    
              //echo "Git committer email: ${GIT_COMMIT_EMAIL}"
              //def containerId =  bat "docker ps -aqf \"ancestor=pw$BUILD_NUMBER\""
              
              echo "Container Id is : ${containerId}"
        
             def exitcode = -1
             echo "Init exitcode is : ${exitcode}"
           
              exitcode= bat "docker inspect ${containerId} --format='{{.State.ExitCode}}'"
            echo 'Exit code: ' +exitcode
           
           return (exitcode == 0)
            }
          }
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

