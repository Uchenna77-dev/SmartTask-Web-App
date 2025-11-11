package com.smarttask;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import spark.Request;
import spark.Response;
import org.bson.Document;
import org.bson.types.ObjectId;

import java.util.ArrayList;
import java.util.List;

import static com.mongodb.client.model.Filters.eq;

/**
 * TaskController: Handles CRUD operations for tasks, adapted for Spark Java.
 * All handler methods must now return the response body as a string.
 */
public class TaskController {

    private final MongoCollection<Document> collection;
    // ObjectMapper is used to convert Java objects (Task, List<Task>) to JSON strings
    private final ObjectMapper mapper = new ObjectMapper();

    public TaskController() {
        MongoDatabase db = MongoDBConnection.connect();
        // FIX: Changed collection name from "tasks" to "Task" to match Atlas exactly.
        this.collection = db.getCollection("Task"); 
    }

    // GET all tasks - Returns JSON string of all tasks
    public Object getAllTasks(Request req, Response res) {
        try {
            List<Task> tasks = new ArrayList<>();
            // The find() method without filters retrieves all documents in the collection
            for (Document doc : collection.find()) {
                tasks.add(Task.fromDocument(doc));
            }
            // Serialize List<Task> to JSON string
            if (tasks.isEmpty()) {
                 res.status(404);
                 return "{\"status\": \"No tasks found\"}"; // Returning 404/Not Found for empty results
            }
            res.type("application/json");
            return mapper.writeValueAsString(tasks);
        } catch (Exception e) {
            res.status(500);
            System.err.println("Error fetching tasks: " + e.getMessage());
            return "{\"error\": \"Failed to fetch tasks: " + e.getMessage() + "\"}";
        }
    }

    // GET task by ID - Returns JSON string of a single task
    public Object getTaskById(Request req, Response res) {
        try {
            // Spark path parameters are retrieved using req.params(":name")
            String id = req.params(":id"); 
            
            Document doc = collection.find(eq("_id", new ObjectId(id))).first();
            
            if (doc == null) {
                res.status(404);
                return "{\"error\": \"Task not found\"}";
            }
            // Serialize Task object to JSON string
            res.type("application/json");
            return mapper.writeValueAsString(Task.fromDocument(doc));
        } catch (IllegalArgumentException e) {
            res.status(400); // Bad Request for invalid ObjectId format
            return "{\"error\": \"Invalid task ID format: " + e.getMessage() + "\"}";
        } catch (Exception e) {
            res.status(500);
            System.err.println("Error getting task by ID: " + e.getMessage());
            return "{\"error\": \"Failed to get task: " + e.getMessage() + "\"}";
        }
    }

    // POST new task - Returns JSON string of the newly created task
    public Object addTask(Request req, Response res) {
        try {
            // Deserialize JSON body string back to a Task object
            Task task = mapper.readValue(req.body(), Task.class);
            
            // Insert into MongoDB
            collection.insertOne(task.toDocument());
            
            // Set status 201 Created and return the task JSON
            res.status(201);
            res.type("application/json");
            return mapper.writeValueAsString(task);
        } catch (Exception e) {
            res.status(400);
            System.err.println("Error adding task: " + e.getMessage());
            return "{\"error\": \"Invalid task data: " + e.getMessage() + "\"}";
        }
    }

    // PUT (update) task - Returns simple status message
    public Object updateTask(Request req, Response res) {
        try {
            String id = req.params(":id");
            
            // Parse request body as a MongoDB Document for update operation
            Document updated = Document.parse(req.body());
            
            collection.updateOne(eq("_id", new ObjectId(id)), new Document("$set", updated));
            
            res.status(200);
            res.type("application/json");
            return "{\"status\": \"✅ Task updated\"}";
        } catch (IllegalArgumentException e) {
            res.status(400);
            return "{\"error\": \"Invalid ID or JSON format: " + e.getMessage() + "\"}";
        } catch (Exception e) {
            res.status(500);
            System.err.println("Error updating task: " + e.getMessage());
            return "{\"error\": \"Failed to update task: " + e.getMessage() + "\"}";
        }
    }

    // DELETE task - Returns simple status message
    public Object deleteTask(Request req, Response res) {
        try {
            String id = req.params(":id");
            
            collection.deleteOne(eq("_id", new ObjectId(id)));
            
            res.status(200);
            res.type("application/json");
            return "{\"status\": \"🗑️ Task deleted\"}";
        } catch (IllegalArgumentException e) {
            res.status(400);
            return "{\"error\": \"Invalid ID format: " + e.getMessage() + "\"}";
        } catch (Exception e) {
            res.status(500);
            System.err.println("Error deleting task: " + e.getMessage());
            return "{\"error\": \"Failed to delete task: " + e.getMessage() + "\"}";
        }
    }
}