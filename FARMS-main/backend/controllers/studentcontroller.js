
const student = require("../models/student");
exports.createStudent = async (req, res) => {
  try {
    const { name, rollNumber, email, contactNumber, className, division, address } = req.body;

    const response = await student.create({
      name,
      rollNumber,
      email,
      phone: contactNumber, // Map `contactNumber` to `phone`
      className,
      division,
      address
    });

    res.status(200).json({
      success: true,
      data: response,
      message: "Entry created successfully",
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      data: "Internal server problem",
      message: e.message,
    });
  }
};
exports.getStudents=async(req,res)=>{
  try{
    const response=await student.find();
    res.status(200).json({
      success:true,
      data:response,
      message:"data fetched successfully"
    })
  }
  catch(e){
    console.error(e);
    res.status(500).json({
      success:false,
      data:"Internal server problem",
      message:e.message
    })
  }
}
