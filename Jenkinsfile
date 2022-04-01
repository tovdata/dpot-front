pipeline {
  agent none
  tools {
    nodejs "NodeJS 16.14.0"
  }
  stages {
    stage('Build') {
      agent nodejs
      steps {
        sh 'npm install'
        sh 'npm run build'
      }
    }
    stage('Deply') {
      agent nodejs
      steps {
        sh 'sudo ./scripts/deploy.sh'
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