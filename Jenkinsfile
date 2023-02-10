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
                echo "Validate"
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

}

