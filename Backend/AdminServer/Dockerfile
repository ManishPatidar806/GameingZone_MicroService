# Use the OpenJDK base image
FROM openjdk:21-jdk-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the Spring Boot JAR file into the container
COPY target/Admin-Server-0.0.1-SNAPSHOT.jar /app/app.jar

# Expose the port that the Spring Boot application will run on
EXPOSE 8079


# Run the Spring Boot application when the container starts
CMD ["java", "-jar", "/app/app.jar"]
