import Course from '../models/courseModel.js';
export const createCourse = async (req, res) => {
  try {
    const { name, description } = req.body;
    const newCourse = new Course({ 
        name,
         description
         });
    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
