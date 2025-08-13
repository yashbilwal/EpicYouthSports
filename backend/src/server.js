require('dotenv').config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const { supabase } = require("./config/supabase");
const registerRouter = require("./routes/register");

const app = express();

// Middleware
app.use(helmet()); // Security headers
app.use(cors({
  origin: process.env.FRONTEND_URL || '*' // Configure allowed origins
}));
app.use(express.json());

// Health check endpoint (required for Render)
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// Subscribe route
app.post("/subscribe", async (req, res) => {
  const { email } = req.body;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "Valid email is required" });
  }

  try {
    const { data, error } = await supabase
      .from("subscribers")
      .insert([{ 
        email, 
        date: new Date(),
        ip_address: req.ip // Track IP for security
      }]);

    if (error) throw error;

    res.status(201).json({ 
      success: true,
      message: "Subscription successful",
      data 
    });
  } catch (err) {
    console.error("Subscribe error:", err);
    res.status(500).json({ 
      error: err.message || "Internal server error" 
    });
  }
});

// Register route
app.use("/register", registerRouter);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(`[${new Date().toISOString()}] Error:`, err);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start server (Render-compatible)
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;