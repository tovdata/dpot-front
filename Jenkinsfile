pipeline {
  agent any
  tools {
    nodejs "NodeJS 16.14.0"
  }
  stages {
    stage('Build') {
      steps {
        sh 'npm install'
        sh 'npm run build'
      }
    }
    stage('Deply') {
      steps {
        sh 'if [ -n $(lsof -t -i:3000) ]; then kill -9 $(lsof -t -i:3000) fi'
        sh 'npm run start'
      }
    }
  }
  post {
    success {
      echo 'Success to build and deploy for project'
    }
    failure {
      echo 'Failed to build an deploy for project'
    }
  }
}