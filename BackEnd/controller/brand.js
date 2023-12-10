const Products = require("../models/products");
const Brand=require("../models/brand");
const slugify = require("slugify");

exports.create = async(req, res) => {
    try {
        console.log(req.body);
        const { name } = req.body;
        const brand = await new Brand({ name, slug: slugify(name) }).save();
        res.json(brand);
    } catch (e) {
        console.log(e);
        res.status(400).send("Create Category Failed");
    }
}

exports.list = async(req, res) => {
    const brand = await Brand.find({}).sort({ createdAt: -1 }).exec();
    res.json(brand);
}

exports.read = async(req, res) => {
    const brand = await Brand.findOne({ slug: req.params.slug }).exec();
    console.log("branditems", brand);
    const product=await Products.find({brand}).populate("brand").exec();
    res.json({product,brand});
    console.log(product,brand);
}

exports.remove = async(req, res) => {
    try {
        const deleted = await Brand.findOneAndDelete({ slug: req.params.slug });
        res.json(deleted);
    } catch (e) {
        res.status(400).send("Brand Delete Failed", err)
    }
}