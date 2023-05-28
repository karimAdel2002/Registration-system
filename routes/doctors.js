import { Router } from 'express';
import { doctor_subjects, index, save_upload, upload_pdf  } from '../controller/doctor.js';
import multer from "multer";
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'templates/uploads')
    },
    filename: function (req, file, cb) { 
      cb(null, file.fieldname + '-' +Date.now()+'.pdf')
    }
  })
  
  var upload = multer({ storage: storage })

const router = new Router();

router.get('/', index);
router.get('/subjects', doctor_subjects);
router.get('/:_id',upload_pdf );
router.post('/:_id/addPdf', upload.single('pdf_name'),save_upload);





export default router;