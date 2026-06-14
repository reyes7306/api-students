import { Router } from 'express';
import { getStudents, getStudent, createStudent, updateStudent, deleteStudent } from '../controllers/students.controller.js';
import { studentSchema, studentUpdateSchema } from '../middlewares/student.schema.js';
import { validarEsquema } from '../middlewares/errors.middleware.js';

const router = Router();

router.get('/students', getStudents);

router.get('/students/:id', getStudent);

router.post('/students', validarEsquema(studentSchema), createStudent);

router.patch('/students/:id', validarEsquema(studentUpdateSchema), updateStudent);

router.delete('/students/:id', deleteStudent);

export default router;