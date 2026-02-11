# syntax=docker/dockerfile:1

FROM eclipse-temurin:17-jdk AS build
WORKDIR /workspace

COPY mvnw* ./
COPY .mvn .mvn
COPY pom.xml .
RUN ./mvnw -q -DskipTests dependency:go-offline

COPY src src
RUN ./mvnw -q -DskipTests clean package

FROM eclipse-temurin:17-jre
WORKDIR /app

COPY --from=build /workspace/target/*.jar app.jar

EXPOSE 8083
ENV JAVA_OPTS=""

ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]
