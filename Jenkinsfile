pipeline {
  agent any
  tools {
    nodejs "NodeJS"
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
        sh 'which npm'
        sh 'sudo ./scripts/deploy.sh'
        sh 'npm run start &'
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