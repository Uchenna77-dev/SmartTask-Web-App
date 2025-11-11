package com.smarttask;

import org.bson.Document;

public class Task {
    private String id;
    private String title;
    private String description;
    private boolean completed;
    private String priority;
    private String dueDate;

    // IMPORTANT: Required by ObjectMapper for JSON deserialization
    public Task() {} 
    
    // Constructor for creating from Document (your existing logic)
    public Task(String id, String title, String description, boolean completed, String priority, String dueDate) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.completed = completed;
        this.priority = priority;
        this.dueDate = dueDate;
    }
    
    // Setters (Required by ObjectMapper to set values after construction)
    public void setId(String id) { this.id = id; }
    public void setTitle(String title) { this.title = title; }
    public void setDescription(String description) { this.description = description; }
    public void setCompleted(boolean completed) { this.completed = completed; }
    public void setPriority(String priority) { this.priority = priority; }
    public void setDueDate(String dueDate) { this.dueDate = dueDate; }

    // Getters
    public String getId() { return id; }
    public String getTitle() { return title; }
    public String getDescription() { return description; }
    public boolean isCompleted() { return completed; }
    public String getPriority() { return priority; }
    public String getDueDate() { return dueDate; }

    // Convert to MongoDB document
    public Document toDocument() {
        return new Document("title", title)
                .append("description", description)
                .append("completed", completed)
                .append("priority", priority)
                .append("dueDate", dueDate);
    }

    // Create from MongoDB document
    public static Task fromDocument(Document doc) {
        return new Task(
                // Ensure null check before calling toString()
                doc.getObjectId("_id") != null ? doc.getObjectId("_id").toHexString() : null, 
                doc.getString("title"),
                doc.getString("description"),
                doc.getBoolean("completed", false),
                doc.getString("priority"),
                doc.getString("dueDate")
        );
    }
}