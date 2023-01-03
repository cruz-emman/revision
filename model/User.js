import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
    {
        firstname: {type: String, required: true},
        middlename: {type: String},
        contactNumber: {type: String, requrired: true},
        lastname: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        department: {type: String, required: true},
        password: {type:String, required: true},
        studentId: {type:String, required:true, unique:true, index: true},
        img: {type: String},
        isAdmin: {type: Boolean,default: false},
        status: {type:String, default: "pending"},
    }
, {timestamps: true}
)


export default mongoose.model('User', UserSchema)