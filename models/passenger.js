import mongoose from "mongoose";
const {model, Schema} = mongoose

const passengerSchema = new Schema ({
    fname : {type : String, required: true},
    lname : {type : String, required: true},
    sex: {type : String, required: true},
    mobile : {type : Number, required: true},
    email : {type : String, required: true},
    destination : {type : String, required: true},
    password : {type : String, required: true},
    dateReg: {
        type: Date,
        default: Date.now().toString()
    }
})
const Passenger = mongoose.model("Passenger", passengerSchema);
export default Passenger; 
