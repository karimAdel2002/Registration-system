import { Router } from 'express';
import { index, store } from '../controller/login.js';


const router = new Router();


router.get('/', index);
router.post('/', store);






export default router;