import  express from 'express';
import { engine } from 'express-handlebars';
import dotenv from 'dotenv';
dotenv.config();
import loginRouter from './routes/logins.js'
import adminRouter from './routes/admins.js'
import doctorRouter from './routes/doctors.js'
import studentRouter from './routes/students.js'
import methodOverride from 'method-override';

import cookieParser from 'cookie-parser';

import mongoose from 'mongoose';
// import doctor from './model/doctor.js';
// import student from './model/student.js';
// import admin from './model/admin.js';

mongoose.connect(process.env.mongooconectionurl)
const app = express();
app.use(cookieParser())

app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'))
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './templates');



app.use(express.static("templates"))
app.use('/logins',loginRouter)
app.use('/admins',adminRouter)
app.use('/doctors',doctorRouter)
app.use('/students',studentRouter)


// console.log(mongoose.connection.readyState);

// app.get('/', async(req,res) => {
//     await admin.create({
//         name: 'Mr.Admin2',
//         username: 'admin2',
//         password: 'admin1234',

//     });
//     await doctor.create({
//         name: 'Mr.Doctor2',
//         username: 'Doctor2',
//         password: 'Doctor1234',
//         his_subjects:null,


//     });
//     await student.create({
//         name: 'Mr.student2',
//         username: 'student2',
//         password: 'student1234',
//         academic_number:'2004892',
//         department: null,
//         passed_subjects: null,
//         registered_subjects: null

//     });
//     console.log('Added');
// });
app.listen(process.env.port, () => {
    
    console.log('started the application on http://localhost:' + process.env.port)
})