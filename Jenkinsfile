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

    stage('Test') {
      steps {
            bat "docker run -d --network=host pw$BUILD_NUMBER npm run test"
      }                   
}

    
 stage('Validate') {
      steps {                           
        script{
          def imageName = "docker ps -aqf \"ancestor=pw${env.BUILD_NUMBER}\""
          echo "Image name ${imageName}"
          
          containerId = bat(script: "${imageName}", returnStdout: true).trim().readLines().drop(1).join(" ")
    
              //echo "Git committer email: ${GIT_COMMIT_EMAIL}"
              //def containerId =  bat "docker ps -aqf \"ancestor=pw$BUILD_NUMBER\""
              
              echo "Container Id is : ${containerId}" 
        }
            }
}

        stage('Validate 2') {
      steps {            
        script{
           timeout(time: 2, unit: 'MINUTES') {
          waitUntil {           
              def getStatus = "docker inspect ${containerId} --format='{{.State.ExitCode}}'"
            echo "status command: ${getStatus}"
            
            def status = bat(script: "${getStatus}", returnStdout: true).trim().readLines().drop(1).join(" ")
            
            echo "Exit code:${status}"
                       
            
            if( status != '0' ){
              echo "TRUE"
              return true
            }else{
              echo "False"
              return false
           }
          }
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
