import mongoose from 'mongoose';

const DataSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    eMail: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    residentialAddress: {
        street1:{
            type: String
        },
        street2: {
            type: String
        }
    },
    permanentAddress: {
        street1:{
            type: String
        },
        street2: {
            type: String
        }
    },
    
})

export const DataModel = mongoose.model("DataModel", DataSchema);