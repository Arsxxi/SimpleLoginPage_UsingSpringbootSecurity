# Stage 1: Builder
FROM maven:3.9-eclipse-temurin-17 AS builder
WORKDIR /app

# 1. Copy HANYA pom.xml terlebih dahulu
COPY pom.xml .

# 2. Download dependency (Layer ini akan di-cache selama pom.xml tidak berubah)
RUN mvn dependency:go-offline -B

# 3. Baru copy source code
COPY src ./src

# 4. Jalankan packaging
RUN --mount=type=cache,target=/root/.m2 mvn package -DskipTests

# Stage 2: Runner
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]