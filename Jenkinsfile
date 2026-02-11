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
                    // Attendre que MySQL soit vraiment prêt (vérification avec retry)
                    bat '''
                        powershell -Command "$retries = 0; $maxRetries = 30; while ($retries -lt $maxRetries) { try { docker exec hotelbooking-db mysql -uroot -proot -e 'SELECT 1' > $null 2>&1; if ($LASTEXITCODE -eq 0) { Write-Host 'MySQL is ready'; break } } catch {} $retries++; Start-Sleep -Seconds 2; if ($retries -eq $maxRetries) { Write-Host 'MySQL failed to start'; exit 1 } }"
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
