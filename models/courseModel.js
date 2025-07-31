import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  name: { type: String,
     required: true
     },
  description: String
});

const Course = mongoose.model('Course', courseSchema);
export default Course;
