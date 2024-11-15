const mongoose = require("mongoose")


const studentSchema = mongoose.Schema({
    name : String,
    class : String,
    rollNo : Number
})

const StudentModel = mongoose.model( "studentData" , studentSchema)


module.exports = StudentModel