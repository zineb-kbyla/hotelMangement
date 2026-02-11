pipeline {
    agent any

    tools {
        jdk 'jdk-21'
        maven 'Maven3'
    }

    environment {
        SPRING_DATASOURCE_URL = 'jdbc:mysql://localhost:3306/hotelbooking'
        SPRING_DATASOURCE_USERNAME = 'root'
        SPRING_DATASOURCE_PASSWORD = ''
    }

    options {
        timestamps()
        skipDefaultCheckout(true)
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Backend - Build & Test') {
            steps {
                dir('backend/HotelBookingApplication') {
                    // Use Maven Wrapper to avoid local Maven mismatch
                    bat 'mvnw.cmd clean test'
                }
            }
            post {
                always {
                    junit 'backend/HotelBookingApplication/target/surefire-reports/*.xml'
                }
            }
        }

        stage('Frontend - Install & Build') {
            steps {
                dir('frontend/Hotel-booking-application') {
                    bat 'npm install'
                    bat 'npm run build'
                }
            }
        }

        stage('Docker - Build') {
            steps {
                bat 'docker compose build'
            }
        }
    }

    post {
        success {
            echo 'Build completed successfully.'
        }
        failure {
            echo 'Build failed. Check logs.'
        }
        cleanup {
            cleanWs()
        }
    }
}
