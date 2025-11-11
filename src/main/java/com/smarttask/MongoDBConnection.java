package com.smarttask;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoDatabase;

public class MongoDBConnection {
    private static MongoDatabase database;
    
    // Environment variable keys
    private static final String MONGO_URI_ENV = "MONGODB_URI";
    private static final String MONGO_DB_ENV = "MONGODB_DATABASE";

    public static MongoDatabase connect() {
        if (database == null) {
            
            // 1. Load configuration from environment variables
            String uri = System.getenv(MONGO_URI_ENV);
            String dbName = System.getenv(MONGO_DB_ENV);
            
            if (uri == null || uri.trim().isEmpty()) {
                System.err.println("❌ ERROR: MongoDB connection URI is missing. Please set the '" + MONGO_URI_ENV + "' environment variable.");
                // Fallback to a common local URI for development if URI is missing
                uri = "mongodb://localhost:27017";
                System.err.println("⚠️ Falling back to local MongoDB URI: " + uri);
            }

            if (dbName == null || dbName.trim().isEmpty()) {
                dbName = "smarttaskdb"; // Use your default database name
                System.err.println("⚠️ MongoDB database name is missing. Using default: " + dbName);
            }

            try {
                // 2. Connect to MongoDB
                MongoClient client = MongoClients.create(uri);
                database = client.getDatabase(dbName);
                System.out.println("✅ Connected to MongoDB Atlas/Local instance successfully! Database: " + dbName);
            } catch (Exception e) {
                 System.err.println("❌ Failed to connect to MongoDB. URI used: " + uri);
                 e.printStackTrace();
                 System.exit(1);
            }
        }
        return database;
    }
}