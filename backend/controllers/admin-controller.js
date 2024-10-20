const bcrypt = require('bcrypt');
const Admin = require('../models/adminSchema.js');
const Sclass = require('../models/sclassSchema.js');
const Student = require('../models/studentSchema.js');
const Teacher = require('../models/teacherSchema.js');
const Subject = require('../models/subjectSchema.js');
const Notice = require('../models/noticeSchema.js');
const Complain = require('../models/complainSchema.js');
const jwt=require('jsonwebtoken')
const nodemailer=require('nodemailer')
// const adminRegister = async (req, res) => {
//     try {
//         const salt = await bcrypt.genSalt(10);
//         const hashedPass = await bcrypt.hash(req.body.password, salt);

//         const admin = new Admin({
//             ...req.body,
//             password: hashedPass
//         });

//         const existingAdminByEmail = await Admin.findOne({ email: req.body.email });
//         const existingSchool = await Admin.findOne({ schoolName: req.body.schoolName });

//         if (existingAdminByEmail) {
//             res.send({ message: 'Email already exists' });
//         }
//         else if (existingSchool) {
//             res.send({ message: 'School name already exists' });
//         }
//         else {
//             let result = await admin.save();
//             result.password = undefined;
//             res.send(result);
//         }
//     } catch (err) {
//         res.status(500).json(err);
//     }
// };

// const adminLogIn = async (req, res) => {
//     if (req.body.email && req.body.password) {
//         let admin = await Admin.findOne({ email: req.body.email });
//         if (admin) {
//             const validated = await bcrypt.compare(req.body.password, admin.password);
//             if (validated) {
//                 admin.password = undefined;
//                 res.send(admin);
//             } else {
//                 res.send({ message: "Invalid password" });
//             }
//         } else {
//             res.send({ message: "User not found" });
//         }
//     } else {
//         res.send({ message: "Email and password are required" });
//     }
// };

const adminRegister = async (req, res) => {
    try {
        const admin = new Admin({
            ...req.body
        });

        const existingAdminByEmail = await Admin.findOne({ email: req.body.email });
        const existingSchool = await Admin.findOne({ schoolName: req.body.schoolName });

        if (existingAdminByEmail) {
            res.send({ message: 'Email already exists' });
        }
        else if (existingSchool) {
            res.send({ message: 'School name already exists' });
        }
        else {
            let result = await admin.save();
            result.password = undefined;
            res.send(result);
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const adminLogIn = async (req, res) => {
    if (req.body.email && req.body.password) {
        let admin = await Admin.findOne({ email: req.body.email });
        if (admin) {
            if (req.body.password === admin.password) {
                admin.password = undefined;
                res.send(admin);
            } else {
                res.send({ message: "Invalid password" });
            }
        } else {
            res.send({ message: "User not found" });
        }
    } else {
        res.send({ message: "Email and password are required" });
    }
};

const getAdminDetail = async (req, res) => {
    try {
        let admin = await Admin.findById(req.params.id);
        if (admin) {
            admin.password = undefined;
            res.send(admin);
        }
        else {
            res.send({ message: "No admin found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

// const deleteAdmin = async (req, res) => {
//     try {
//         const result = await Admin.findByIdAndDelete(req.params.id)

//         await Sclass.deleteMany({ school: req.params.id });
//         await Student.deleteMany({ school: req.params.id });
//         await Teacher.deleteMany({ school: req.params.id });
//         await Subject.deleteMany({ school: req.params.id });
//         await Notice.deleteMany({ school: req.params.id });
//         await Complain.deleteMany({ school: req.params.id });

//         res.send(result)
//     } catch (error) {
//         res.status(500).json(err);
//     }
// }

// const updateAdmin = async (req, res) => {
//     try {
//         if (req.body.password) {
//             const salt = await bcrypt.genSalt(10)
//             res.body.password = await bcrypt.hash(res.body.password, salt)
//         }
//         let result = await Admin.findByIdAndUpdate(req.params.id,
//             { $set: req.body },
//             { new: true })

//         result.password = undefined;
//         res.send(result)
//     } catch (error) {
//         res.status(500).json(err);
//     }
// }

// module.exports = { adminRegister, adminLogIn, getAdminDetail, deleteAdmin, updateAdmin };
const adminResetPasswordLink=async(req,res)=>{
    try {
        const user=await Admin.findOne({email:req.body.email})

        if(!user){
            res.status(400).json({message:"User with this email does not exist"})
        }

        const secret=process.env.JWT_SECRET+user.password

        const token=await jwt.sign({
            email:user.email,
            id:user._id
        },
        secret,
        {
            expiresIn:process.env.JWT_EXPIRY
        })

        const url=`${process.env.BACKEND_URL}/Admin/resetpassword/${user._id}/${token}`
        const transporter=nodemailer.createTransport({
            host:'smtp.gmail.com',
            port:587,
            auth:{
                user:process.env.EMAIL,
                pass:process.env.PASSWORD
            }
        })
        await transporter.sendMail({
            to:user.email,
            subject:'Password Reset Link',
            text:`Click on the link below to reset your password
            ${url}`,
            html:`<h2>Click on the link below to reset your password</h2>
            <a href=${url}>Password Reset</a>`
        })

        res.status(200).json({message:"Password reset link has been sent to your email"})
    } catch (error) {
        res.status(500).json({message:"Something went wrong"})
    }
}

const adminResetPassword=async(req,res)=>{
    try {
        const user=await Admin.findById(req.params.id)

        if(!user){
            return res.status(400).json({message:"User does not exist"})
        }
        const secret=process.env.JWT_SECRET+user.password

        const decoded=await jwt.verify(req.params.token,secret)
        if(decoded.id===user._id.toString()){
            user.password=req.body.password
            const salt=await bcrypt.genSalt(10)
            user.password=await bcrypt.hash(user.password,salt)

            await user.save()
            res.status(200).json({message:"Password reset successful"})
        }
        else{
            res.status(400).json({message:"Invalid token"})
        }
    } catch (error) {
        res.status(500).json({message:"Something went wrong"})
    }
}

module.exports = { adminRegister, adminLogIn, getAdminDetail ,adminResetPasswordLink ,adminResetPassword};
