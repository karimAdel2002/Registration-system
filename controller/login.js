import admin from "../model/admin.js";
import doctor from "../model/doctor.js";
import student from "../model/student.js";

export const index = async (req, res) => { 
    res.render('logins/index')
};


export const store = async (req, res) => {
    const { username, password, type } = req.body;
   
    if (type ==='admin'){
        const admins = await admin.findOne({username ,password}).lean();
        if(admins===null){
           return res.send("Incorrect username or password")
        }
        if(admins!==null){
            res.cookie('_id',admins._id)
          res.redirect("/admins")
         }
    }
     if (type ==='doctor'){
        const doctors = await doctor.findOne({username ,password}).lean();
        if(doctors===null){
            return res.send("Incorrect username or password")
         }
         if(doctors!==null){
            res.cookie('_id',doctors._id)
            res.redirect("/doctors")
          }
    }
    
    if(type ==='student'){
        const students = await student.findOne({username ,password}).lean();
        if(students===null){
            return res.send("Incorrect username or password")
         }
         if(students!==null){
            res.cookie('_id',students._id)
            res.redirect("/students")
          }

        }


}
