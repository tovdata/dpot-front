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
        nodejs("NodeJS") {
          sh './scripts/deploy.sh &'
        }
      }
    }
  }
  post {
    success {
      echo 'Success to build and deploy for project'
      sh 'JENKINS_NODE_COOKIE=dontKillMe && nohup ./scripts/deploy.sh &'
    }
    failure {
      echo 'Failed to build an deploy for project'
    }
  }
}