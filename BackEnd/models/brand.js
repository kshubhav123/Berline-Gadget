const mongoose = require("mongoose");

const brandSchema =new mongoose.Schema({
    name:{
        type:String,
        require:"brand name is Required",
    },
    slug:{
        type:String,
        unique:true,
        lowercase:true,
        index:true
    }
},{timestamps:true});

module.exports=mongoose.model("Brand",brandSchema);