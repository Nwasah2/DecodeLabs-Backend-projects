const express = require('express');
const app = express();
const PORT = 3000;

// Middleware: This allows your API to understand incoming JSON data
app.use(express.json());

// Simulated database for NEO-G Agricultural Enterprise
let swineInventory = [
    { id: 1, breed: 'Large White', count: 45 },
    { id: 2, breed: 'Duroc', count: 30 }
];

// ---------------------------------------------------------
// REQUIREMENT 1: GET Endpoint (Read Data)
// ---------------------------------------------------------
// When a user visits this URL, the API sends back the current inventory.
app.get('/api/inventory', (req, res) => {
    res.status(200).json({
        message: "Inventory retrieved successfully",
        totalRecords: swineInventory.length,
        data: swineInventory
    });
});

// ---------------------------------------------------------
// REQUIREMENT 2 & 3: POST Endpoint & Data Validation (Create Data)
// ---------------------------------------------------------
// This endpoint handles user input to add new livestock records.
app.post('/api/inventory', (req, res) => {
    // Extract the user input from the request body
    const { breed, count } = req.body;

    // VALIDATION: Check if the user left any fields blank
    if (!breed || !count) {
        return res.status(400).json({
            error: "Validation failed. You must provide both 'breed' and 'count'."
        });
    }

    // VALIDATION: Ensure the count is actually a number
    if (typeof count !== 'number') {
        return res.status(400).json({
            error: "Validation failed. 'count' must be a number."
        });
    }

    // Application Logic: Create a new record and add it to our database
    const newRecord = {
        id: swineInventory.length + 1,
        breed: breed,
        count: count
    };
    
    swineInventory.push(newRecord);

    // Send a success response back to the user
    res.status(201).json({
        message: "New livestock record added successfully",
        data: newRecord
    });
});

// Start the server listening on the defined port
app.listen(PORT, () => {
    console.log(`NEO-G Backend API is running on http://localhost:${PORT}`);
});