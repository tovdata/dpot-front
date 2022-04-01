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
        script {
          sh 'sudo chmod +x ./script/deploy.sh'
          sh 'sudo ./scripts/deploy.sh'
        }
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