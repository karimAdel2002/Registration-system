import department from "../model/department.js";
import doctor from "../model/doctor.js";
import student from "../model/student.js";
import subject from "../model/subject.js";
import pre from "../model/pre.js";


export const index = async (req, res) => {
    const singleDepartment = await department.find().lean();
    const singleDoctor = await doctor.find().lean();
    const singleSubject = await subject.find().lean();
    const singlePre = await pre.find().lean();


    res.render('admins/index', { department: singleDepartment, doctor: singleDoctor , subject :singleSubject ,pre:singlePre})

};

export const add_department = async (req, res) => {
    const { name, code } = req.body;
    await department.create({
        name,
        code,
    })
    res.redirect('/admins/departments')
};
export const add_doctor = async (req, res) => {
    const { doctor_name, doctor_username, doctor_password } = req.body;
    await doctor.create({
        name: doctor_name,
        username: doctor_username,
        password: doctor_password,
    })
    res.redirect('/admins/doctors')
};
export const show_departments = async (req, res) => {
    const singleDepartment = await department.find().lean();
    res.render('admins/departments', { department: singleDepartment })

};
export const show_doctors = async (req, res) => {
    const singleDoctor = await doctor.find().lean();
    res.render('admins/doctors', { doctor: singleDoctor })

};
export const add_student = async (req, res) => {
    const singleSubject = await subject.find().lean();

    const { student_name, student_username, student_password, student_academic_number, department } = req.body;
    await student.create({
        name: student_name,
        username: student_username,
        password: student_password,
        academic_number: student_academic_number,
        department,

    })
    res.cookie('student_username',student_username)

    res.render('admins/select_subjects',{subject : singleSubject})
};
export const edit_departments = async (req, res) => {
    const singleDepartment = await department.find().lean();
    const { id } = req.params;
    const the_department = await department.findById(id).lean();
    res.render('admins/edit_departments', { department: singleDepartment, the_department })
};
export const update_department = async (req, res) => {
    const { name, code } = req.body;
    const { id } = req.params;
    await department.findByIdAndUpdate(id, { $set: { name, code } })

    res.redirect('/admins/departments')
};
export const delete_department = async (req, res) => {
    const { id } = req.params;
    await department.findByIdAndDelete(id)
    return res.redirect('/admins/departments')
};
export const edit_doctors = async (req, res) => {
    const singleDoctor = await doctor.find().lean();
    const { id } = req.params;
    const the_doctor = await doctor.findById(id).lean();
    res.render('admins/edit_doctors', { doctor: singleDoctor, the_doctor })
};
export const update_doctor = async (req, res) => {
    const { name, username, password } = req.body;
    const { id } = req.params;
    await doctor.findByIdAndUpdate(id, { $set: { name, username, password } })

    res.redirect('/admins/doctors')
};
export const delete_doctor = async (req, res) => {
    const { id } = req.params;
    await doctor.findByIdAndDelete(id)
    return res.redirect('/admins/doctors')
};
export const add_subject = async (req, res) => {
    //  First : we will add the subject without Pre_requisite
    const { name, code, department, Pre_requisite, doctor } = req.body;
    await subject.create({
        name,
        code,
        department,
        doctor
    })
    //   if there is no Pre_requisite
    if (Pre_requisite === "none") {
        res.redirect('/admins/subjects')
    }
    //   if we have a Pre_requisite
    if (Pre_requisite !== "none") {
    //   Second : we will get the subject id that was added & the Pre_requisite name from [subject table] and add it to pre table
    const the_added_subject = await subject.findOne({name}).lean() 
    const the_added_subject_id = the_added_subject._id
    const pre_requisitie_object = await subject.findById(Pre_requisite).lean()
    const pre_requisitie_name = pre_requisitie_object.name
    await pre.create({
        subjectName : name,
        pre_requisiteName : pre_requisitie_name,
        subject_id : the_added_subject_id ,
        pre_requisite_id:Pre_requisite ,
    })
//   Third : we will get the Pre_requisite id that added to add it to subject 
    const the_added_pre = await pre.findOne({subject_id:the_added_subject_id}).lean()
    const the_added_pre_id = the_added_pre._id
    await subject.findByIdAndUpdate(the_added_subject_id, { $set: { Pre_requisite : the_added_pre_id } })
    res.redirect('/admins/subjects')}
};
export const show_subjects = async (req, res) => {
    const singleSubject = await subject.find().populate("department").populate("doctor").populate("Pre_requisite").lean();
    res.render('admins/subjects', { subject: singleSubject })
};
export const edit_subjects = async (req, res) => {
    const { id } = req.params;
    const singleSubject = await subject.find().populate("Pre_requisite").lean();
    const allDepartment = await department.find().lean();
    const allDoctors = await doctor.find().lean();
    const allPre = await pre.find().lean();
    const the_Pre = await pre.findOne({subject_id : id}).lean();
    const the_subject = await subject.findById(id).populate("Pre_requisite").populate("department").populate("doctor").lean();
    res.render('admins/edit_subjects', { subject: singleSubject, the_subject,department:allDepartment,doctor: allDoctors,pre :allPre ,the_Pre})
};
export const update_subject = async (req, res) => {

    var { name, code, the_new_pre,department,doctor } = req.body;
    const { id } = req.params;
    const the_subject_obj = await subject.findOne({_id: id}).lean()
    if(department === undefined){  department =the_subject_obj.department  };
    if(doctor === undefined){  doctor =the_subject_obj.doctor };
    console.log(name)
    console.log(code)
    console.log(the_new_pre)
    console.log(department)
    console.log(doctor)
    
    if (the_new_pre === undefined) {
        await subject.findByIdAndUpdate(id, { $set: { name, code,department,doctor } })
        res.redirect('/admins/subjects')
    }else {
    const the_pre_object = await pre.findOne({subject_id: id}).lean()

    if (the_pre_object === null) {
        // first : we will add a create function here [to create a pre table] 
        // then : we wii update in it
        const the_added_subject = await subject.findOne({_id:id}).lean() 
        const the_added_subject_id = the_added_subject._id
        const pre_requisitie_object = await subject.findById(the_new_pre).lean()
        const pre_requisitie_name = pre_requisitie_object.name
        await pre.create({
            subjectName : name,
            pre_requisiteName : pre_requisitie_name,
            subject_id : the_added_subject_id ,
            pre_requisite_id : the_new_pre ,
        })
        const the_added_pre = await pre.findOne({subject_id:the_added_subject_id}).lean()
        const the_added_pre_id = the_added_pre._id
        await subject.findByIdAndUpdate(the_added_subject_id, { $set: { Pre_requisite : the_added_pre_id } })
        res.redirect('/admins/subjects')


    } else{
    const the_pre_id = the_pre_object._id
    const the_subject_object = await subject.findOne({_id: the_new_pre}).lean()
    const the_subject_name = the_subject_object.name
    await pre.findByIdAndUpdate(the_pre_id, { $set: { pre_requisite_id : the_new_pre , pre_requisiteName :the_subject_name ,subjectName:name} })
    res.redirect('/admins/subjects')
    }}
};
export const delete_subject = async (req, res) => {
    const { id } = req.params;
    const check = await subject.findById(id).lean()
    
 if (check.Pre_requisite === undefined) {
    await subject.findByIdAndDelete(id)
        res.redirect('/admins/subjects')
    }
    if (check.Pre_requisite !== undefined) {
    await subject.findByIdAndDelete(id)
    const the_pre_of_subject = await pre.findOne({subject_id:id}).lean()
    const the_pre_of_subject_id = the_pre_of_subject._id
    await pre.findByIdAndDelete(the_pre_of_subject_id)
    return res.redirect('/admins/subjects') 
    }
   
};
export const select_subjects = async (req, res) => {
    
    let cookie = req.cookies.student_username;
    const allStudent = await student.findOne({username:cookie}).lean();
    const rr = req.body.one
    let id = allStudent._id
    var key = 0;
    if (rr == undefined) {
        res.send('Select the subjects')
    }
    if (rr != undefined) {
        switch (rr.length) {
            case 16:
          res.send("Select Less Than 15 Subjects")
            case 15:
          
            case 15:
                await student.findByIdAndUpdate(id, { $set: { passed_subjects15: rr[14] } })
            case 14:
                await student.findByIdAndUpdate(id, { $set: { passed_subjects14: rr[13] } })
            case 13:
                await student.findByIdAndUpdate(id, { $set: { passed_subjects13: rr[12] } })
            case 12:
                await student.findByIdAndUpdate(id, { $set: { passed_subjects12: rr[11] } })
            case 11:
                await student.findByIdAndUpdate(id, { $set: { passed_subjects11: rr[10] } })
            case 10:
                await student.findByIdAndUpdate(id, { $set: { passed_subjects10: rr[9] } })
            case 9:
                await student.findByIdAndUpdate(id, { $set: { passed_subjects9: rr[8] } })
            case 8:
                await student.findByIdAndUpdate(id, { $set: { passed_subjects8: rr[7] } })
            case 7:
                await student.findByIdAndUpdate(id, { $set: { passed_subjects7: rr[6] } })
            case 6:
                await student.findByIdAndUpdate(id, { $set: { passed_subjects6: rr[5] } })
            case 5:
                await student.findByIdAndUpdate(id, { $set: { passed_subjects5: rr[4] } })
            case 4:
                await student.findByIdAndUpdate(id, { $set: { passed_subjects4: rr[3] } })
            case 3:
                await student.findByIdAndUpdate(id, { $set: { passed_subjects3: rr[2] } })
            case 2:
                await student.findByIdAndUpdate(id, { $set: { passed_subjects2: rr[1] } })
            case 1:
                await student.findByIdAndUpdate(id, { $set: { passed_subjects1: rr[0] } })
                break;
            default:
                console.log("Switch case error")
                break;
        }
    }
    res.redirect('/admins/students')
};
export const show_students = async (req, res) => {
    const singleStudent = await student.find().populate("department").populate({path: 'passed_subjects1',select:'name code department Pre_requisite doctor',}).populate({path: 'passed_subjects2',select:'name code department Pre_requisite doctor',})
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
    res.render('admins/students', { student: singleStudent})
};

export const edit_students = async (req, res) => {
    const singleStudent = await subject.find().lean();
    const singleDepartment = await department.find().lean();
    const { id } = req.params;
    const the_student = await student.findById(id).populate({path: 'passed_subjects1',select:'name code department Pre_requisite doctor',}).populate({path: 'passed_subjects2',select:'name code department Pre_requisite doctor',})
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
    res.render('admins/edit_students', { subject: singleStudent, the_student , department:singleDepartment})

};
export const update_student = async (req, res) => {
    const { name, username, password,academic_number,department,
    passed_subjects1,passed_subjects2,passed_subjects3,passed_subjects4,
    passed_subjects5,passed_subjects6,passed_subjects7,passed_subjects8,
    passed_subjects9,passed_subjects10,passed_subjects11,passed_subjects12,
    passed_subjects13,passed_subjects14,passed_subjects15,registered_subjects1,
    registered_subjects2,registered_subjects3,registered_subjects4,registered_subjects5,registered_subjects6 } = req.body;
    const { id } = req.params;
    
    await student.findByIdAndUpdate(id, { $set: { name, username, password,academic_number,department,
        passed_subjects1,passed_subjects2,passed_subjects3,passed_subjects4,
        passed_subjects5,passed_subjects6,passed_subjects7,passed_subjects8,
        passed_subjects9,passed_subjects10,passed_subjects11,passed_subjects12,
        passed_subjects13,passed_subjects14,passed_subjects15,registered_subjects1,
        registered_subjects2,registered_subjects3,registered_subjects4,registered_subjects5,registered_subjects6} })

    res.redirect('/admins/students')
};
export const delete_student = async (req, res) => {
    const { id } = req.params;
    await student.findByIdAndDelete(id)
    return res.redirect('/admins/students')
};

export const show_all_subjects = async (req, res) => {
    const singlSubject = await subject.find().lean();
    res.render('admins/show_all_subjects', { subject: singlSubject})
}


export const show_Students = async (req, res) => {
    const { _id } = req.params;
    const singleSubject = await subject.findById(_id).lean();
    const the_students1 = await student.find({registered_subjects1: _id}).lean();
    const the_students2 = await student.find({registered_subjects2: _id}).lean();
    const the_students3 = await student.find({registered_subjects3: _id}).lean();
    const the_students4 = await student.find({registered_subjects4: _id}).lean();
    const the_students5 = await student.find({registered_subjects5: _id}).lean();
    const the_students6 = await student.find({registered_subjects6: _id}).lean();
    let array = the_students1.concat(the_students2).concat(the_students3).concat(the_students4).concat(the_students5).concat(the_students6)

    
    res.render('admins/show_all_students', { subject: singleSubject , students :array })
};