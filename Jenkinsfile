pipeline {
  agent any
  
  environment {
    DOCKER_HUB_USERNAME = 'kennethalt99'
    DOCKER_HUB_PASSWORD = credentials('docker-hub-password')
    CLIENT_IMAGE_NAME = 'kennethalt99/stubby-client'
    SERVER_IMAGE_NAME = 'kennethalt99/stubby-server'
    DOCKER_IMAGE_TAG = 'latest'
  }

  stages {
    // stage('Checkout') {
    //     steps {
    //         git 'https://github.com/kenneth-alt/stubby.io'
    //     }
    // }

    stage('Build Client Image') {
      steps {
        dir('client') {
          script {
            docker.build("${CLIENT_IMAGE_NAME}:${DOCKER_IMAGE_TAG}")
          }
        } 
      }
    }

      stage('Build Server Image') {
        steps {
          dir('server') {
            script {
              docker.build("${SERVER_IMAGE_NAME}:${DOCKER_IMAGE_TAG}")
            }
          }   
        }
      }

      stage('Push Images to Docker Hub') {
        steps {
          script {
            docker.withRegistry('https://index.docker.io/v1/', DOCKER_HUB_USERNAME, DOCKER_HUB_PASSWORD) {
              docker.image("${CLIENT_IMAGE_NAME}:${DOCKER_IMAGE_TAG}").push()
              docker.image("${SERVER_IMAGE_NAME}:${DOCKER_IMAGE_TAG}").push()
            }
          }
        }
    }
  }
}
