const { Router } = require("express");
const { supabase } = require("../config/supabase");

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { email } = req.body;

    // Validate email exists
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    // Basic email format validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    // Insert into database
    const { error } = await supabase
      .from("subscriptions")
      .insert([{ 
        email, 
        date: new Date().toISOString(),
        status: 'active'
      }]);

    if (error) {
      console.error("Supabase insert error:", error);
      return res.status(500).json({ 
        error: "Failed to subscribe",
        details: error.message 
      });
    }

    res.status(201).json({ 
      success: true,
      message: "Subscribed successfully" 
    });

  } catch (err) {
    console.error("Subscription error:", err);
    res.status(500).json({ 
      error: "Internal server error",
      details: err.message 
    });
  }
});

module.exports = router;