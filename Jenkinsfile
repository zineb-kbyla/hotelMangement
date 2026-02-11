pipeline {
    agent any

    tools {
        jdk 'jdk-21'
        maven 'Maven3'
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

        stage('Docker - Start MySQL') {
            steps {
                script {
                    // Nettoyer les conteneurs existants
                    bat 'docker compose down || exit 0'
                    // Démarrer uniquement le service MySQL pour les tests
                    bat 'docker compose up -d db'
                    // Attendre que MySQL soit vraiment prêt avec logs
                    bat '''
                        powershell -Command "Write-Host 'Waiting for MySQL to be ready...'; for ($i=0; $i -lt 60; $i++) { $result = docker exec hotelbooking-db mysqladmin ping -uroot -proot 2>&1; if ($result -match 'mysqld is alive') { Write-Host 'MySQL is ready!'; exit 0 }; Write-Host \"Attempt $($i+1)/60: MySQL not ready yet...\"; Start-Sleep -Seconds 2 }; Write-Host 'MySQL failed to start after 120 seconds'; exit 1"
                    '''
                    echo 'MySQL Docker container is ready'
                }
            }
        }

        stage('Backend - Build & Test') {
            steps {
                dir('backend/HotelBookingApplication') {
                    // Tests avec MySQL Docker (port 3307, user root, password root)
                    bat 'mvnw.cmd clean test -Dspring.datasource.url=jdbc:mysql://localhost:3307/hotelbooking -Dspring.datasource.username=root -Dspring.datasource.password=root'
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
        always {
            script {
                // Arrêter et nettoyer les conteneurs Docker
                bat 'docker compose down || exit 0'
            }
            cleanWs()
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Build failed. Check logs.'
        }
    }
}
