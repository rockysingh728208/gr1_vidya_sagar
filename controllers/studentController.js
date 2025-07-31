import Student from '../models/studentModel.js';
import Course from '../models/courseModel.js';
export const addStudent = async (req, res) => {
  try {
    const { name, email, age } = req.body;

if(!name || !email || !age){
     res.json({success:false,message:"all fields are required"})
}

    const existingStudent = await Student.findOne({ email });

    if (existingStudent)
         return res.status(400).json({  success:false,message: "email already exists" });

    const newStudent = new Student({ name, email, age });
    await newStudent.save();
    res.status(201).json({success:true,message:"add student successfuly",newStudent});
  } catch (error) {
    res.status(500).json({  success:false,error: error.message });
  }
};


export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().populate('courses');
    res.status(200).json({
      success: true,
      message: 'All students fetched successfully',
      data: students
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'internal server error',
      error: error.message
    });
  }
};



export const updateStudent = async (req, res) => {
  try {
    const studentId = req.params.id;
    const updatedData = req.body;

    const student = await Student.findByIdAndUpdate(studentId, updatedData, { new: true });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Student updated successfully',
      data: student
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'internal server error',
      error: error.message
    });
  }
};



export const deleteStudent = async (req, res) => {
  try {
    const studentId = req.params.id;

    const deletedStudent = await Student.findByIdAndDelete(studentId);

    if (!deletedStudent) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Student deleted successfully',
      data: deletedStudent
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'internal server error',
      error: error.message
    });
  }
};


export const enrollInCourse = async (req, res) => {
  try {
    const studentId = req.params.id;
    const { courseId } = req.body;
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

   
    if (student.courses.includes(courseId)) {
      return res.status(400).json({
        success: false,
        message: 'Student is already enrolled in this course'
      });
    }
    student.courses.push(courseId);
    await student.save();

    const updatedStudent = await Student.findById(studentId).populate('courses');

    res.status(200).json({
      success: true,
      message: 'Student enrolled successfully',
      data: updatedStudent
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

