# syntax=docker/dockerfile:1

FROM eclipse-temurin:17-jre
WORKDIR /app

# Copier le JAR déjà compilé par Jenkins
COPY target/*.jar app.jar

EXPOSE 8083
ENV JAVA_OPTS=""

ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]
