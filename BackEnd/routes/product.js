const express=require("express");
const route=express.Router();

const { authChek, AdminCheck } = require("../middleware/auth");
const {create,listAll,remove,read,update,list,productscount,productStar, listRelated,filterProduct,getbrandsprod}=require("../controller/product")

route.post("/product",authChek,AdminCheck, create);
route.get("/products/:count", listAll);
route.delete("/products/:slug",authChek,AdminCheck, remove);
route.get("/product/:slug",read)
route.put("/product/:slug",update)
route.post("/products", list);
route.get("/productcount/total",productscount)
route.put("/productStar/:productId",authChek,productStar)
route.get("/productrelated/:productId",listRelated)
route.post("/product/filters", filterProduct);
route.get("/prdbrnd/:brand",getbrandsprod)

module.exports=route

