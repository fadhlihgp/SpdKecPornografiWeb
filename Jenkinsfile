pipeline {
    agent any
     
    environment {
        DOCKER_IMAGE = "spdkecpornografi-web"
        VERSION = "latest"
        HOST_PORT = "6002"
        CONTAINER_PORT = "8080"
        HOST_LOG_DIR = "/var/www/Apps/SPDKecPornografi/Files"
        CONTAINER_LOG_DIR = "/var/www/Apps/SPDKecPornografi/Files"
        CONTAINER_NAME = "spdkecpornografi-web-${env.BRANCH_NAME}"
        DB_CONNECTION = credentials('CONNECTION_SPD_KEC_PORNOGRAFI_WEB_DATABASE')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Set Environment') {
            steps {
                script {
                    echo "Deploying branch ${env.BRANCH_NAME} to port ${HOST_PORT}"
                }
            }
        }

        stage('Remove Old Container') {
            steps {
                script {
                    def containerId = sh(script: "docker ps -aqf name=${CONTAINER_NAME}", returnStdout: true).trim()
                    if (containerId) {
                        echo "Stopping and removing old container: ${containerId}"
                        sh "docker stop ${containerId}"
                        sh "docker rm ${containerId}"
                    } else {
                        echo "No container named ${CONTAINER_NAME} is running."
                    }
                }
            }
        }

        stage('Remove Old Image') {
            steps {
                script {
                    def imageId = sh(script: "docker images -q ${DOCKER_IMAGE}:${VERSION}", returnStdout: true).trim()
                    if (imageId) {
                        echo "Removing old image: ${imageId}"
                        sh "docker rmi -f ${imageId}"
                    }
                }
            }
        }
        
        stage('Build Docker Image') {
            steps {
                script {
                    sh "docker build -t ${DOCKER_IMAGE}:${VERSION} ."
                }
            }
        }

        stage('Run Docker Container') {
            steps {
                script {
                    sh """
                    docker run -d --restart unless-stopped \\
                        --name ${CONTAINER_NAME} \\
                        -p ${HOST_PORT}:${CONTAINER_PORT} \\
                        -v ${HOST_LOG_DIR}:${CONTAINER_LOG_DIR} \\
                        -v /var/www/Apps/appDbSettings.json:/var/www/Apps/appDbSettings.json \\
                        -v /usr/bin/google-chrome:/usr/bin/google-chrome \\
                        ${DOCKER_IMAGE}:${VERSION} \\
                        dotnet PortofolioWeb.dll --urls=http://0.0.0.0:8080
                    """
                }
            }
        }
    }
    post {
        failure {
            echo "Deploy failed."
        }
        success {
            echo "Deploy successfully."
        }
    }
}
