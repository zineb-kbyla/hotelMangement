# Jenkins Setup Guide (Backend + Frontend)

This guide explains how to create a Jenkins pipeline for the project.
It builds and tests the Spring Boot backend and the React frontend.

## 1) Prerequisites

- Jenkins installed (Windows or Linux).
- Java 17+ configured in Jenkins (Manage Jenkins -> Global Tool Configuration).
- Maven configured in Jenkins (or use the Maven Wrapper in backend).
- Node.js (18+) configured in Jenkins.
- Git configured in Jenkins.

Recommended Jenkins plugins:
- Pipeline
- Git
- NodeJS
- Maven Integration
- Workspace Cleanup
- JUnit

## 2) Repository Structure

Workspace root:
- backend/HotelBookingApplication (Spring Boot)
- frontend/Hotel-booking-application (React + Vite)

## 3) Jenkins Global Tools

Configure tools in:
Manage Jenkins -> Global Tool Configuration

- JDK: name it "JDK17"
- Maven: name it "Maven3"
- NodeJS: name it "Node18" (install from NodeJS plugin)

## 4) Create Jenkins Pipeline Job

1. Open Jenkins dashboard.
2. Click "New Item".
3. Choose "Pipeline".
4. Set a name (example: hotel-booking-ci).
5. Configure SCM -> Git -> repository URL.
6. Use a Jenkinsfile in repo.

## 5) Add Jenkinsfile to the repo

Create a file named "Jenkinsfile" at the repo root.

Example Jenkinsfile:

pipeline {
    agent any

    tools {
        jdk 'JDK17'
        maven 'Maven3'
        nodejs 'Node18'
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

Notes:
- If Jenkins is on Linux, replace `bat` with `sh`.
- If you prefer Maven in Jenkins, replace `mvnw.cmd` with `mvn`.

## 6) Configure Environment Variables (Optional)

If the backend needs database config in CI, set these in Jenkins:

- SPRING_DATASOURCE_URL
- SPRING_DATASOURCE_USERNAME
- SPRING_DATASOURCE_PASSWORD

Example in Jenkinsfile:

environment {
    SPRING_DATASOURCE_URL = 'jdbc:mysql://localhost:3306/hotelbooking'
    SPRING_DATASOURCE_USERNAME = 'root'
    SPRING_DATASOURCE_PASSWORD = ''
}

## 7) Run the Pipeline

- Trigger the pipeline manually in Jenkins.
- Or set a webhook from GitHub to trigger on push.

## 8) Common Issues

- Node not found: ensure NodeJS tool is configured and used.
- Maven build fails: verify JDK version and dependencies.
- Tests fail: check database connectivity or use a test profile.

## 9) Next Steps

- Add Docker build stage if you want container deployment.
- Add deployment stages (Azure App Service, AWS, or a VM).
- Add unit test coverage reports.
