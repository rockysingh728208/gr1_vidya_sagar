import express from 'express';
import {addStudent,getAllStudents,updateStudent,deleteStudent,enrollInCourse} from '../controllers/studentController.js';
const router = express.Router();
router.post('/students', addStudent);
router.get('/students', getAllStudents);
router.put('/students/:id', updateStudent);
router.delete('/students/:id', deleteStudent);
router.patch('/students/:id/enroll', enrollInCourse);

export default router;
