const { Router } = require("express");
const { supabase } = require("../config/supabase");

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { 
      childName, childAge, childGrade, childSchool,
      parentName, parentPhone, parentEmail,
      homeAddress, city, state, zipCode,
      emergencyContact1Name, emergencyContact1Phone,
      emergencyContact2Name, emergencyContact2Phone,
      selectedScheduleDay, selectedScheduleTime, 
      selectedScheduleDates, selectedScheduleAgeGroup,
      programType // This will come from frontend
    } = req.body;

    // Validate required fields
    if (!childName || !parentEmail || !programType) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Insert into database
    const { data, error } = await supabase
      .from("program_registrations")
      .insert([{
        program: programType,
        child_name: childName,
        child_age: childAge,
        child_grade: childGrade,
        child_school: childSchool,
        parent_name: parentName,
        parent_phone: parentPhone,
        parent_email: parentEmail,
        home_address: homeAddress,
        city: city,
        state: state,
        zip_code: zipCode,
        emergency_contact1_name: emergencyContact1Name,
        emergency_contact1_phone: emergencyContact1Phone,
        emergency_contact2_name: emergencyContact2Name,
        emergency_contact2_phone: emergencyContact2Phone,
        selected_schedule_day: selectedScheduleDay,
        selected_schedule_time: selectedScheduleTime,
        selected_schedule_dates: selectedScheduleDates,
        selected_schedule_age_group: selectedScheduleAgeGroup,
        registration_date: new Date().toISOString(),
        payment_status: 'pending'
      }])
      .select();

    if (error) {
      console.error("Supabase error:", error);
      return res.status(500).json({ error: "Database error" });
    }

    // Return success response
    res.status(201).json({ 
      success: true,
      registration: data[0],
      // Include payment redirect URL when ready
      // paymentUrl: "..." 
    });

  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;