require('dotenv').config();
const express = require("express");
const cors = require("cors");
const { supabase } = require("./config/supabase");
const registerRouter = require("./routes/register");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Subscribe route
app.post("/subscribe", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const { data, error } = await supabase
      .from("subscribers")
      .insert([{ email, date: new Date() }]);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.json({ message: "Email stored successfully", data });
  } catch (err) {
    console.error("Subscribe error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Register route
app.use("/register", registerRouter);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;