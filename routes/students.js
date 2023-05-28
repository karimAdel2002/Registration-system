import { Router } from 'express';
import { index, register_page, student_register1, student_register2, student_register3, student_register4, student_register5, student_register6, download, show, pdf_download,  } from '../controller/student.js';


const router = new Router();

router.get('/', index);
router.get('/register', register_page);
router.get('/show_subjects', show);
router.post('/student_register1', student_register1);
router.post('/student_register2', student_register2);
router.post('/student_register3', student_register3);
router.post('/student_register4', student_register4);
router.post('/student_register5', student_register5);
router.post('/student_register6', student_register6);
router.get('/:_id',download );
router.get('/:_id/download',pdf_download );









export default router;