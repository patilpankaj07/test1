const mongoose = require('mongoose');

const studentMarksSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rollNo: {
        type: Number,
        required: true,
        unique: true
    },
    wadMarks: {
        type: Number,
        min: 0,
        max: 100
    },
    ccMarks: {
        type: Number,
        min: 0,
        max: 100
    },
    dsbdaMarks: {
        type: Number,
        min: 0,
        max: 100
    },
    cnsMarks: {
        type: Number,
        min: 0,
        max: 100
    },
    aiMarks: {
        type: Number,
        min: 0,
        max: 100
    }
});

const StudentMarks = mongoose.model('StudentMarks', studentMarksSchema);

module.exports = StudentMarks;
