import doctor from "../model/doctor.js";
import subject from "../model/subject.js";
import pdf from "../model/pdf.js";


export const index = async (req, res) => { 
    res.render('doctors/index')
};
export const doctor_subjects = async (req, res) => { 
    let cookie = req.cookies._id;
    const singleDoctor = await doctor.findOne({_id:cookie}).lean();
    const doctor_subjects = await subject.find({doctor:cookie}).lean();
    res.render('doctors/subjects', { the_doctor :singleDoctor ,the_subjects :doctor_subjects })
};
export const upload_pdf = async (req, res) => {
    const  id  = req.params;
    const the_subject = await subject.findById(id).lean();
    res.render('doctors/upload', { the_subject })
};
export const save_upload = async (req, res) => {
    const  id  = req.params; //subject
    console.log(id)
    const the_subject = await subject.findById(id).lean();
    const all_pdf = await pdf.find({subject_id:id}).lean();
    console.log(all_pdf.length)
if(all_pdf.length > 3){
   
            for (let index = 0; index < 4; index++) {
                await pdf.findByIdAndDelete(all_pdf[index]._id)
                
            }
           
};
    switch (all_pdf.length) { 
            case 0:

                await pdf.create({
                    subject_name: the_subject.name,
                    subject_id: the_subject._id,
                    pdf1:req.file.filename ,
                    pdf1_name : req.file.originalname
                })
            
                  const the_added_pdf = await pdf.findOne({pdf1_name : req.file.originalname}).lean();
             
                await subject.findByIdAndUpdate( id, { $set: { pdf1: the_added_pdf._id} })
                break;
                case 1:
                    await pdf.create({
                    subject_name: the_subject.name,
                    subject_id: the_subject._id,
                    pdf1:req.file.filename ,
                    pdf1_name : req.file.originalname
                    })
                
                    const the_added_pdf1 = await pdf.findOne({pdf1_name : req.file.originalname}).lean();
                
                    await subject.findByIdAndUpdate( id, { $set: { pdf2: the_added_pdf1._id} })
                    break;
        case 2:
            await pdf.create({
                    subject_name: the_subject.name,
                    subject_id: the_subject._id,
                    pdf1:req.file.filename ,
                    pdf1_name : req.file.originalname
            })
        
            const the_added_pdf2 = await pdf.findOne({pdf1_name : req.file.originalname}).lean();
                
                    await subject.findByIdAndUpdate( id, { $set: { pdf3: the_added_pdf2._id} })
                    break;
            break;
            case 3:
                await pdf.create({
                    subject_name: the_subject.name,
                    subject_id: the_subject._id,
                    pdf1:req.file.filename ,
                    pdf1_name : req.file.originalname
                })
            
                const the_added_pdf3 = await pdf.findOne({pdf1_name : req.file.originalname}).lean();
            
                await subject.findByIdAndUpdate( id, { $set: { pdf4: the_added_pdf3._id} })
                break;
              
        default:
            break;
    }

    let cookie = req.cookies._id;
    const singleDoctor = await doctor.findOne({_id:cookie}).lean();
    const doctor_subjects = await subject.find({doctor:cookie}).lean();
    res.render('doctors/subjects', { the_doctor :singleDoctor ,the_subjects :doctor_subjects })
};