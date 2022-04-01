pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        sh 'npm install'
        sh 'npm run build'
      }
    }
    stage('Deply') {
      step {
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