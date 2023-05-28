import pdf from "../model/pdf.js";
import pre from "../model/pre.js";
import student from "../model/student.js";
import subject from "../model/subject.js";

export const index = async (req, res) => { 
    const id = req.cookies._id
    const the_student = await student.findById(id).lean()
    res.render('students/index',{the_student})
};
export const register_page = async (req, res) => {
    let cookie = req.cookies._id;
    const singleStudent = await student.findOne({_id:cookie}).populate({path: 'passed_subjects1',select:'name code department Pre_requisite doctor',}).populate({path: 'passed_subjects2',select:'name code department Pre_requisite doctor',})
    .populate({path: 'passed_subjects3',select:'name code department Pre_requisite doctor',}).populate({path: 'passed_subjects4',select:'name code department Pre_requisite doctor',})
    .populate({path: 'passed_subjects5',select:'name code department Pre_requisite doctor',}).populate({path: 'passed_subjects6',select:'name code department Pre_requisite doctor',})
    .populate({path: 'passed_subjects7',select:'name code department Pre_requisite doctor',}).populate({path: 'passed_subjects8',select:'name code department Pre_requisite doctor',})
    .populate({path: 'passed_subjects9',select:'name code department Pre_requisite doctor',}).populate({path: 'passed_subjects10',select:'name code department Pre_requisite doctor',})
    .populate({path: 'passed_subjects11',select:'name code department Pre_requisite doctor',}).populate({path: 'passed_subjects12',select:'name code department Pre_requisite doctor',})
    .populate({path: 'passed_subjects13',select:'name code department Pre_requisite doctor',}).populate({path: 'passed_subjects14',select:'name code department Pre_requisite doctor',})
    .populate({path: 'passed_subjects15',select:'name code department Pre_requisite doctor',}).populate({path: 'registered_subjects1',select:'name code department Pre_requisite doctor',})
    .populate({path: 'registered_subjects2',select:'name code department Pre_requisite doctor',}).populate({path: 'registered_subjects3',select:'name code department Pre_requisite doctor',})
    .populate({path: 'registered_subjects4',select:'name code department Pre_requisite doctor',}).populate({path: 'registered_subjects5',select:'name code department Pre_requisite doctor',})
    .populate({path: 'registered_subjects6',select:'name code department Pre_requisite doctor',}).lean();
    const allSubjects = await subject.find().populate({path: 'Pre_requisite',select:'pre_requisiteName',}).lean();
    res.render('students/register' , {subject :allSubjects , the_student :singleStudent })

};

export const student_register1 = async (req, res) => { 
    const id = req.cookies._id
    const {registered_subjects1 } = req.body;    
    const find_pre_requisite = await pre.findOne({subject_id : registered_subjects1}).lean() //this is the object of the Pre_requisite
    
    const the_student = await student.findById(id) // this is the object of the student
    var arr_passed = [the_student.passed_subjects1,the_student.passed_subjects2,the_student.passed_subjects3,
        the_student.passed_subjects4,the_student.passed_subjects5,the_student.passed_subjects6,
        the_student.passed_subjects7,the_student.passed_subjects8,the_student.passed_subjects9,
        the_student.passed_subjects10,the_student.passed_subjects11,the_student.passed_subjects12,
        the_student.passed_subjects13,the_student.passed_subjects14,the_student.passed_subjects15,] // this is all passed subjectss of the student
        var arr_registered =[the_student.registered_subjects1,the_student.registered_subjects2,the_student.registered_subjects3,
            the_student.registered_subjects4,the_student.registered_subjects5,the_student.registered_subjects6]
            if(find_pre_requisite === null){
                
                let flag= 0
                for (let index = 0; index < arr_passed.length; index++) {
                    if (arr_passed[index]!==undefined&&arr_passed[index].equals(registered_subjects1)) {
                        flag=0;
                break;
            } else{
                for (let index = 0; index < arr_registered.length; index++) {
                    if (arr_registered[index]===undefined) {
                        flag = -1
                    } else if (arr_registered[index].equals(registered_subjects1)) {
                        flag = 0;
                        break;
                    }else{
                        flag = -1
                    }
                }
                
            }
            
        }
        if (flag == -1) {
            await student.findByIdAndUpdate(id, { $set: {registered_subjects1} })
            res.redirect('/students/register')
        }else{
            res.send("You can't register this subject")
        }
    }else{
        
        const pre_requisite_id =find_pre_requisite.pre_requisite_id // this is the id of the Pre_requisite
        let flag= 0
        for (let index = 0; index < arr_passed.length; index++) {
            if(arr_passed[index]!==undefined&&arr_passed[index].equals(pre_requisite_id)){
                
                for (let index = 0; index < arr_registered.length; index++) {
                    if (arr_registered[index]===undefined) {
                        flag = -1
                    } else if (arr_registered[index].equals(registered_subjects1)) {
                        flag = 0;
                        break;
                        }else{
                            flag = -1
                        }
                    }
                }
                if (arr_passed[index]!==undefined&&arr_passed[index].equals(registered_subjects1)) {
                    flag=0;
                    break;
                }
                
            }
            if (flag == -1) {
                await student.findByIdAndUpdate(id, { $set: {registered_subjects1} })
                res.redirect('/students/register')
    }else{
        res.send("You can't register this subject")
    }
    }
};
export const student_register2 = async (req, res) => { 
    const id = req.cookies._id
    const {registered_subjects2 } = req.body;    
    const find_pre_requisite = await pre.findOne({subject_id : registered_subjects2}).lean() //this is the object of the Pre_requisite
    
    const the_student = await student.findById(id) // this is the object of the student
    var arr_passed = [the_student.passed_subjects1,the_student.passed_subjects2,the_student.passed_subjects3,
        the_student.passed_subjects4,the_student.passed_subjects5,the_student.passed_subjects6,
        the_student.passed_subjects7,the_student.passed_subjects8,the_student.passed_subjects9,
        the_student.passed_subjects10,the_student.passed_subjects11,the_student.passed_subjects12,
        the_student.passed_subjects13,the_student.passed_subjects14,the_student.passed_subjects15,] // this is all passed subjectss of the student
        var arr_registered =[the_student.registered_subjects1,the_student.registered_subjects2,the_student.registered_subjects3,
            the_student.registered_subjects4,the_student.registered_subjects5,the_student.registered_subjects6]
            if(find_pre_requisite === null){
                
                let flag= 0
                for (let index = 0; index < arr_passed.length; index++) {
                    if (arr_passed[index]!==undefined&&arr_passed[index].equals(registered_subjects2)) {
                        flag=0;
                break;
            } else{
                for (let index = 0; index < arr_registered.length; index++) {
                    if (arr_registered[index]===undefined) {
                        flag = -1
                    } else if (arr_registered[index].equals(registered_subjects2)) {
                        flag = 0;
                        break;
                    }else{
                        flag = -1
                    }
                }
                
            }
            
        }
        if (flag == -1) {
            await student.findByIdAndUpdate(id, { $set: {registered_subjects2: registered_subjects2} })
            res.redirect('/students/register')
        }else{
            res.send("You can't register this subject")
        }
    }else{
        
        const pre_requisite_id =find_pre_requisite.pre_requisite_id // this is the id of the Pre_requisite
        let flag= 0
        for (let index = 0; index < arr_passed.length; index++) {
            if(arr_passed[index]!==undefined&&arr_passed[index].equals(pre_requisite_id)){
                
                for (let index = 0; index < arr_registered.length; index++) {
                    if (arr_registered[index]===undefined) {
                        flag = -1
                    } else if (arr_registered[index].equals(registered_subjects2)) {
                        flag = 0;
                        break;
                        }else{
                            flag = -1
                        }
                    }
                }
                if (arr_passed[index]!==undefined&&arr_passed[index].equals(registered_subjects2)) {
                    flag=0;
                    break;
                }
                
            }
            if (flag == -1) {
                await student.findByIdAndUpdate(id, { $set: {registered_subjects2: registered_subjects2} })
                res.redirect('/students/register')
    }else{
        res.send("You can't register this subject")
    }
    }
};
export const student_register3 = async (req, res) => { 
    const id = req.cookies._id
    const { registered_subjects3 } = req.body;    
    const find_pre_requisite = await pre.findOne({subject_id : registered_subjects3}).lean() //this is the object of the Pre_requisite
    
    const the_student = await student.findById(id) // this is the object of the student
    var arr_passed = [the_student.passed_subjects1,the_student.passed_subjects2,the_student.passed_subjects3,
        the_student.passed_subjects4,the_student.passed_subjects5,the_student.passed_subjects6,
        the_student.passed_subjects7,the_student.passed_subjects8,the_student.passed_subjects9,
        the_student.passed_subjects10,the_student.passed_subjects11,the_student.passed_subjects12,
        the_student.passed_subjects13,the_student.passed_subjects14,the_student.passed_subjects15,] // this is all passed subjectss of the student
        var arr_registered =[the_student.registered_subjects1,the_student.registered_subjects2,the_student.registered_subjects3,
            the_student.registered_subjects4,the_student.registered_subjects5,the_student.registered_subjects6]
            if(find_pre_requisite === null){
                
                let flag= 0
                for (let index = 0; index < arr_passed.length; index++) {
                    if (arr_passed[index]!==undefined&&arr_passed[index].equals(registered_subjects3)) {
                        flag=0;
                break;
            } else{
                for (let index = 0; index < arr_registered.length; index++) {
                    if (arr_registered[index]===undefined) {
                        flag = -1
                    } else if (arr_registered[index].equals(registered_subjects3)) {
                        flag = 0;
                        break;
                    }else{
                        flag = -1
                    }
                }
                
            }
            
        }
        if (flag == -1) {
            await student.findByIdAndUpdate(id, { $set: {registered_subjects3: registered_subjects3} })
            res.redirect('/students/register')
        }else{
            res.send("You can't register this subject")
        }
    }else{
        
        const pre_requisite_id =find_pre_requisite.pre_requisite_id // this is the id of the Pre_requisite
        let flag= 0
        for (let index = 0; index < arr_passed.length; index++) {
            if(arr_passed[index]!==undefined&&arr_passed[index].equals(pre_requisite_id)){
                
                for (let index = 0; index < arr_registered.length; index++) {
                    if (arr_registered[index]===undefined) {
                        flag = -1
                    } else if (arr_registered[index].equals(registered_subjects3)) {
                        flag = 0;
                        break;
                        }else{
                            flag = -1
                        }
                    }
                }
                if (arr_passed[index]!==undefined&&arr_passed[index].equals(registered_subjects3)) {
                    flag=0;
                    break;
                }
                
            }
            if (flag == -1) {
                await student.findByIdAndUpdate(id, { $set: {registered_subjects3: registered_subjects3} })
                res.redirect('/students/register')
    }else{
        res.send("You can't register this subject")
    }
    }
};
export const student_register4 = async (req, res) => { 
    const id = req.cookies._id
    const { registered_subjects4 } = req.body;    
    const find_pre_requisite = await pre.findOne({subject_id : registered_subjects4}).lean() //this is the object of the Pre_requisite
    
    const the_student = await student.findById(id) // this is the object of the student
    var arr_passed = [the_student.passed_subjects1,the_student.passed_subjects2,the_student.passed_subjects3,
        the_student.passed_subjects4,the_student.passed_subjects5,the_student.passed_subjects6,
        the_student.passed_subjects7,the_student.passed_subjects8,the_student.passed_subjects9,
        the_student.passed_subjects10,the_student.passed_subjects11,the_student.passed_subjects12,
        the_student.passed_subjects13,the_student.passed_subjects14,the_student.passed_subjects15,] // this is all passed subjectss of the student
        var arr_registered =[the_student.registered_subjects1,the_student.registered_subjects2,the_student.registered_subjects3,
            the_student.registered_subjects4,the_student.registered_subjects5,the_student.registered_subjects6]
            if(find_pre_requisite === null){
                
                let flag= 0
                for (let index = 0; index < arr_passed.length; index++) {
                    if (arr_passed[index]!==undefined&&arr_passed[index].equals(registered_subjects4)) {
                        flag=0;
                break;
            } else{
                for (let index = 0; index < arr_registered.length; index++) {
                    if (arr_registered[index]===undefined) {
                        flag = -1
                    } else if (arr_registered[index].equals(registered_subjects4)) {
                        flag = 0;
                        break;
                    }else{
                        flag = -1
                    }
                }
                
            }
            
        }
        if (flag == -1) {
            await student.findByIdAndUpdate(id, { $set: {registered_subjects4: registered_subjects4} })
            res.redirect('/students/register')
        }else{
            res.send("You can't register this subject")
        }
    }else{
        
        const pre_requisite_id =find_pre_requisite.pre_requisite_id // this is the id of the Pre_requisite
        let flag= 0
        for (let index = 0; index < arr_passed.length; index++) {
            if(arr_passed[index]!==undefined&&arr_passed[index].equals(pre_requisite_id)){
                
                for (let index = 0; index < arr_registered.length; index++) {
                    if (arr_registered[index]===undefined) {
                        flag = -1
                    } else if (arr_registered[index].equals(registered_subjects4)) {
                        flag = 0;
                        break;
                        }else{
                            flag = -1
                        }
                    }
                }
                if (arr_passed[index]!==undefined&&arr_passed[index].equals(registered_subjects4)) {
                    flag=0;
                    break;
                }
                
            }
            if (flag == -1) {
                await student.findByIdAndUpdate(id, { $set: {registered_subjects4: registered_subjects4} })
                res.redirect('/students/register')
    }else{
        res.send("You can't register this subject")
    }
    }
};
export const student_register5 = async (req, res) => { 
    const id = req.cookies._id
    const {registered_subjects5 } = req.body;    
    const find_pre_requisite = await pre.findOne({subject_id : registered_subjects5}).lean() //this is the object of the Pre_requisite
    
    const the_student = await student.findById(id) // this is the object of the student
    var arr_passed = [the_student.passed_subjects1,the_student.passed_subjects2,the_student.passed_subjects3,
        the_student.passed_subjects4,the_student.passed_subjects5,the_student.passed_subjects6,
        the_student.passed_subjects7,the_student.passed_subjects8,the_student.passed_subjects9,
        the_student.passed_subjects10,the_student.passed_subjects11,the_student.passed_subjects12,
        the_student.passed_subjects13,the_student.passed_subjects14,the_student.passed_subjects15,] // this is all passed subjectss of the student
        var arr_registered =[the_student.registered_subjects1,the_student.registered_subjects2,the_student.registered_subjects3,
            the_student.registered_subjects4,the_student.registered_subjects5,the_student.registered_subjects6]
            if(find_pre_requisite === null){
                
                let flag= 0
                for (let index = 0; index < arr_passed.length; index++) {
                    if (arr_passed[index]!==undefined&&arr_passed[index].equals(registered_subjects5)) {
                        flag=0;
                break;
            } else{
                for (let index = 0; index < arr_registered.length; index++) {
                    if (arr_registered[index]===undefined) {
                        flag = -1
                    } else if (arr_registered[index].equals(registered_subjects5)) {
                        flag = 0;
                        break;
                    }else{
                        flag = -1
                    }
                }
                
            }
            
        }
        if (flag == -1) {
            await student.findByIdAndUpdate(id, { $set: {registered_subjects5: registered_subjects5} })
            res.redirect('/students/register')
        }else{
            res.send("You can't register this subject")
        }
    }else{
        
        const pre_requisite_id =find_pre_requisite.pre_requisite_id // this is the id of the Pre_requisite
        let flag= 0
        for (let index = 0; index < arr_passed.length; index++) {
            if(arr_passed[index]!==undefined&&arr_passed[index].equals(pre_requisite_id)){
                
                for (let index = 0; index < arr_registered.length; index++) {
                    if (arr_registered[index]===undefined) {
                        flag = -1
                    } else if (arr_registered[index].equals(registered_subjects5)) {
                        flag = 0;
                        break;
                        }else{
                            flag = -1
                        }
                    }
                }
                if (arr_passed[index]!==undefined&&arr_passed[index].equals(registered_subjects5)) {
                    flag=0;
                    break;
                }
                
            }
            if (flag == -1) {
                await student.findByIdAndUpdate(id, { $set: {registered_subjects5: registered_subjects5} })
                res.redirect('/students/register')
    }else{
        res.send("You can't register this subject")
    }
    }
};
export const student_register6 = async (req, res) => { 
    const id = req.cookies._id
    const { registered_subjects6 } = req.body;    
    const find_pre_requisite = await pre.findOne({subject_id : registered_subjects6}).lean() //this is the object of the Pre_requisite
    
    const the_student = await student.findById(id) // this is the object of the student
    var arr_passed = [the_student.passed_subjects1,the_student.passed_subjects2,the_student.passed_subjects3,
        the_student.passed_subjects4,the_student.passed_subjects5,the_student.passed_subjects6,
        the_student.passed_subjects7,the_student.passed_subjects8,the_student.passed_subjects9,
        the_student.passed_subjects10,the_student.passed_subjects11,the_student.passed_subjects12,
        the_student.passed_subjects13,the_student.passed_subjects14,the_student.passed_subjects15,] // this is all passed subjectss of the student
        var arr_registered =[the_student.registered_subjects1,the_student.registered_subjects2,the_student.registered_subjects3,
            the_student.registered_subjects4,the_student.registered_subjects5,the_student.registered_subjects6]
            if(find_pre_requisite === null){
                
                let flag= 0
                for (let index = 0; index < arr_passed.length; index++) {
                    if (arr_passed[index]!==undefined&&arr_passed[index].equals(registered_subjects6)) {
                        flag=0;
                break;
            } else{
                for (let index = 0; index < arr_registered.length; index++) {
                    if (arr_registered[index]===undefined) {
                        flag = -1
                    } else if (arr_registered[index].equals(registered_subjects6)) {
                        flag = 0;
                        break;
                    }else{
                        flag = -1
                    }
                }
                
            }
            
        }
        if (flag == -1) {
            await student.findByIdAndUpdate(id, { $set: {registered_subjects6: registered_subjects6} })
            res.redirect('/students/register')
        }else{
            res.send("You can't register this subject")
        }
    }else{
        
        const pre_requisite_id =find_pre_requisite.pre_requisite_id // this is the id of the Pre_requisite
        let flag= 0
        for (let index = 0; index < arr_passed.length; index++) {
            if(arr_passed[index]!==undefined&&arr_passed[index].equals(pre_requisite_id)){
                
                for (let index = 0; index < arr_registered.length; index++) {
                    if (arr_registered[index]===undefined) {
                        flag = -1
                    } else if (arr_registered[index].equals(registered_subjects6)) {
                        flag = 0;
                        break;
                        }else{
                            flag = -1
                        }
                    }
                }
                if (arr_passed[index]!==undefined&&arr_passed[index].equals(registered_subjects6)) {
                    flag=0;
                    break;
                }
                
            }
            if (flag == -1) {
                await student.findByIdAndUpdate(id, { $set: {registered_subjects6: registered_subjects6} })
                res.redirect('/students/register')
    }else{
        res.send("You can't register this subject")
    }
    }
};
export const show = async (req, res) => {
    let cookie = req.cookies._id;
    const singleStudent = await student.findOne({_id:cookie}).populate({path: 'registered_subjects1',select:'name code department Pre_requisite doctor',})
    .populate({path: 'registered_subjects2',select:'name code department Pre_requisite doctor',}).populate({path: 'registered_subjects3',select:'name code department Pre_requisite doctor',})
    .populate({path: 'registered_subjects4',select:'name code department Pre_requisite doctor',}).populate({path: 'registered_subjects5',select:'name code department Pre_requisite doctor',})
    .populate({path: 'registered_subjects6',select:'name code department Pre_requisite doctor',}).lean();
    res.render('students/subjects' , { the_student :singleStudent })

};
export const download = async (req, res) => {
    const  id  = req.params;
    const sub = await subject.findOne({_id:id}).lean()
        const all_pdf = await pdf.find({subject_id:id}).lean()
    res.render('students/materials',{all_pdf ,sub })
};

export const pdf_download = async (req, res) => {
    const  id  = req.params;
    const the_pdf_object = await pdf.findById(id).lean()
    var the_pdf_name = the_pdf_object.pdf1

    res.download("./templates/uploads/"+the_pdf_name )
};