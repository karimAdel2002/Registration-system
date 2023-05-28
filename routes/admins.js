import { Router } from 'express';
import { index,
     add_department,
      add_doctor,
       show_departments, 
       show_doctors, 
       add_student, 
       select_subjects, 
       edit_departments, 
       update_department, 
       delete_department, 
       edit_doctors, 
       update_doctor, 
       delete_doctor, 
       add_subject, 
       show_subjects, 
       edit_subjects, 
       update_subject, 
       delete_subject,
       show_students,
       delete_student,
       update_student,
       edit_students,
       show_all_subjects,
       show_Students,
       
     } from '../controller/admin.js';


const router = new Router();

router.get('/', index);
router.post('/add_department', add_department);
router.post('/add_doctor', add_doctor);
router.post('/add_student', add_student);
router.post('/add_subject', add_subject);
router.post('/select_subjects', select_subjects);


router.get('/departments', show_departments);
router.get('/doctors', show_doctors);
router.get('/students', show_students);
router.get('/subjects', show_subjects);


router.get('/:id/edit_departments', edit_departments);
router.put('/:id', update_department);
router.delete('/:id', delete_department);

router.get('/:id/edit_doctors', edit_doctors);
router.put('/:id/update_doctor', update_doctor);
router.delete('/:id/delete_doctor', delete_doctor);

router.get('/:id/edit_students', edit_students);
router.put('/:id/update_student', update_student);
router.delete('/:id/delete_student', delete_student);

router.get('/:id/edit_subjects', edit_subjects);
router.put('/:id/update_subject', update_subject);
router.delete('/:id/delete_subject', delete_subject);

router.get('/show_all_subjects', show_all_subjects);
router.get('/:_id', show_Students);














export default router;


