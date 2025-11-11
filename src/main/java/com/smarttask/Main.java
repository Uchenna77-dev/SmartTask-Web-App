package com.smarttask;

import static spark.Spark.*;

/**
 * Main: Core class for initializing and running the Spark Java application.
 * Replaces the old Javalin setup with Spark's simpler configuration.
 */
public class Main {

    public static void main(String[] args) {
        
        // --- 1. Initialize Controller ---
        TaskController taskController = new TaskController();

        // --- 2. Initialize Spark Server ---
        // Set the server port to 7000, matching your old Javalin port
        port(7000); 

        // Set the response type globally (optional, but good practice for API)
        before((request, response) -> response.type("application/json"));

        // --- 3. Enable Permissive CORS Filter ---
        // This replaces the Javalin CORS plugin configuration
        options("/*", (request, response) -> {
            String accessControlRequestHeaders = request.headers("Access-Control-Request-Headers");
            if (accessControlRequestHeaders != null) {
                response.header("Access-Control-Allow-Headers", accessControlRequestHeaders);
            }

            String accessControlRequestMethod = request.headers("Access-Control-Request-Method");
            if (accessControlRequestMethod != null) {
                response.header("Access-Control-Allow-Methods", accessControlRequestMethod);
            }
            // Allow requests from any domain
            response.header("Access-Control-Allow-Origin", "*");
            return "OK";
        });
        before((request, response) -> response.header("Access-Control-Allow-Origin", "*"));
        
        // --- 4. Define API Routes ---
        
        // Root Endpoint
        get("/", (req, res) -> "{\"message\": \"Welcome to the SmartTask Backend (Spark Java)! API is running.\"}");

        // Task API Endpoints
        // Spark uses ':id' for path parameters
        path("/api/tasks", () -> {
            // GET /api/tasks
            get("", taskController::getAllTasks); 
            // POST /api/tasks
            post("", taskController::addTask);     
            
            // Routes dependent on an ID path parameter
            path("/:id", () -> {
                // GET /api/tasks/:id
                get("", taskController::getTaskById);   
                // PUT /api/tasks/:id
                put("", taskController::updateTask);    
                // DELETE /api/tasks/:id
                delete("", taskController::deleteTask); 
            });
        });
        
        // --- 5. Error Handlers ---
        
        // Not Found Handler (404)
        notFound((req, res) -> {
            res.status(404);
            return "{\"error\": \"Not Found\", \"path\": \"" + req.pathInfo() + "\"}";
        });

        // Internal Server Error Handler (500)
        internalServerError((req, res) -> {
            res.status(500);
            return "{\"error\": \"Internal Server Error: Something went wrong.\"}";
        });

        // Ensure server is fully initialized before printing ready message
        awaitInitialization();
        System.out.println("✅ SmartTask Backend is running on: http://localhost:7000");
    }
}