# Overview

The **SmartTask Web App** is a full-stack task management system that allows users to create, update, and delete tasks while tracking their progress in real time. The project demonstrates my ability as a software engineer to build an end-to-end solution that connects a Java-based backend API with a modern React frontend, integrating a cloud-hosted MongoDB database.

This software was developed to deepen my understanding of **Java microservices**, **RESTful API design**, and **frontend-backend integration** using React. I wanted to practice connecting a Java backend (using the Spark framework) to a cloud database (MongoDB Atlas) and a Vite-based React frontend. The process helped me gain hands-on experience with CORS configuration, data serialization/deserialization using JSON, and full-stack deployment workflows.

[Software Demo Video](http://youtube.link.goes.here)

# Development Environment

The SmartTask Web App was developed using the following tools and technologies:

- **Frontend:** React (with Vite for fast development and bundling)
- **Backend:** Java with the Spark framework (lightweight web framework)
- **Database:** MongoDB Atlas (cloud-hosted NoSQL database)
- **Build Tool:** Gradle (for dependency management and build automation)
- **API Testing:** Postman and browser console (for verifying REST endpoints)
- **IDE:** Visual Studio Code

### Programming Language and Libraries
- **Java:** Core backend language for developing REST endpoints.
- **Spark Java:** Used to define API routes and handle HTTP requests/responses.
- **MongoDB Java Driver:** Provides database connectivity and CRUD operations.
- **Jackson:** Used for converting between Java objects and JSON.
- **React:** Frontend library for building an interactive UI.
- **Vite:** Development server and build tool for optimized frontend builds.

# Useful Websites

These resources were invaluable during development and troubleshooting:

- [Spark Framework Documentation](https://sparkjava.com/documentation)
- [MongoDB Java Driver Documentation](https://www.mongodb.com/docs/drivers/java/)
- [MongoDB Atlas Documentation](https://www.mongodb.com/docs/atlas/)
- [Gradle Build Tool Reference](https://docs.gradle.org/current/userguide/userguide.html)
- [React Documentation](https://react.dev/)

# Future Work

There are several improvements and features planned for future development:

- Implement **user authentication and authorization** (e.g., JWT) so each user has personalized tasks.
- Add **due dates, priorities, and task categories** for better task organization.
- Introduce **real-time updates** using WebSockets or polling.
- Implement **search and advanced filtering** on both frontend and backend.
- Enhance **UI/UX design** with better responsiveness and animations.
- Deploy the entire stack (backend + frontend) to a cloud platform for public access.
