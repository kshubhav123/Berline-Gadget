const express=require("express");
const route=express.Router();

const { authChek, AdminCheck } = require("../middleware/auth");
const {create,list,read,remove}=require("../controller/brand")

route.post("/brand",authChek,AdminCheck, create);
route.get("/brands", list);
route.get("/brand/:slug", read);
route.delete("/brand/:slug",authChek,AdminCheck, remove);

module.exports=route