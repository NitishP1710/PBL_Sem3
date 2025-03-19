const student = require("../models/student");

exports.createStudent = async (req, res) => {
  try {
    const { name, rollNumber, email, contactNumber } = req.body;
    const response = await student.create({
      name,
      rollNumber,
      email,
      contactNumber,
    });
    res.status(200).json({
      success: true,
      data: response,
      message: "Entry created succesfull",
    });
  } catch (e) {
    console.error(e);
    console.log(e);
    res.status(500).json({
      success: false,
      data: "Internal server problem",
      message: e.message,
    });
  }
};
