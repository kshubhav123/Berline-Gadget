const slugify = require("slugify");
const Products = require("../models/products");
const User = require("../models/user");
const Brand = require("../models/brand");


exports.create = (req, res) => {
    try {
        console.log(req.body);
        req.body.slug = slugify(req.body.title);
        const createProduct = new Products(req.body).save();
        res.json(createProduct);

    } catch (err) {
        console.log(err);
        // res.status(400).send("Create Product Failed");
        res.json.status(400)({
            err: err.message
        })
    }
}

exports.listAll = async (req, res) => {
    try {
        let products = await Products.find({}).
            limit(parseInt(req.params.count)).
            populate("category").
            populate("brand").
            sort([["createdAt", "desc"]]).exec();
        res.json(products);
    } catch (err) {
        console.log(err);
        res.json.status(400)({
            err: err.message
        })
    }
}


exports.read = async (req, res) => {
    try {
        let product = await Products.findOne({ slug: req.params.slug }).
            populate("category").
            populate("sub").
            sort([["createdAt", "desc"]]).exec();
        res.json(product);
    } catch (err) {
        console.log(err);
        res.json.status(400)({
            err: err.message
        })
    }
}

exports.update = async (req, res) => {
    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title)
        }
        const updated = Products.findOneAndUpdate({ slug: req.params.slug }, req.body, { new: true }).exec();
        res.json(updated)
    } catch (e) {
        console.log("Update Backend catch ", e);
    }
}

exports.remove = async (req, res) => {
    try {
        let deleted = await Products.findOneAndRemove({ slug: req.params.slug }).exec();
        res.json(deleted)
    } catch (err) {
        console.log("Product Deletion failed", err);
    }
}

// // without pagination
// exports.list = async (req, res) => {
//     try {
//         const { sort, order, limit } = req.body
//         let products = await Products.find({})
//             .populate("category")
//             .populate("sub")
//             .sort([[sort, order]])
//             .limit(limit)
//             .exec();
//         res.json(products)
//     } catch (e) {
//         console.log("lis Errror Backend", e);
//     }
// }

// with pagination
exports.list = async (req, res) => {
    try {
        const { sort, order, page } = req.body
        let currentPage = page || 1;
        let perpage = 4

        let products = await Products.find({})
            .skip((currentPage - 1) * perpage)
            .populate("category")
            .populate("sub").
            populate("brand").
            sort([[sort, order]])
            .limit(perpage)
            .exec();
        res.json(products)
    } catch (e) {
        console.log("lis Errror Backend", e);
    }
}


exports.productscount = async (req, res) => {
    try {
        let resultcount = await Products.find({}).estimatedDocumentCount().exec();
        res.json(resultcount);


    } catch (e) {
        console.log(e)
    }
}

exports.productStar = async (req, res) => {

    const product = await Products.findById(req.params.productId).exec();
    const user = await User.findOne({ email: req.user.email }).exec();
    const { star } = req.body;
    let exitingRatingObject = product.ratings.find((ele) => ele.postedBy.toString() === user._id.toString());

    if (exitingRatingObject == undefined) {
        let ratingAdded = await Products.findByIdAndUpdate(product._id,
            {
                $push: {
                    ratings: {
                        star,
                        postedBy: user._id
                    }
                }
            },
            { new: true }
        ).exec();

        res.json(ratingAdded);
        console.log("3333333333", ratingAdded);
    } else {
        const ratingUpdated = await Products.updateOne(
            {
                ratings: { $elemMatch: exitingRatingObject }
            },
            { $set: { "ratings.$.star": star } },
            { new: true }
        ).exec();
        console.log("555555", star);
        console.log("555555", ratingUpdated);
    }
}



exports.listRelated = async (req, res) => {
    const product = await Products.findById(req.params.productId).exec();
    const related = await Products.find({
        _id: { $ne: product._id },
        category: product.category,
    }).
        limit(3)
        .populate("category")
        .populate("sub")
        .populate("brand")
        .exec();
    res.json(related);
}



exports.filterProduct = async (req, res) => {
    const { query, price, category, stars, sub, shipping, color, brand } = req.body;

    if (query) {
        console.log("query", query);
        await handleQuery(req, res, query);
    }

    if (price !== undefined) {
        console.log("Price value", price);
        await handlePrice(req, res, price)
    }

    if (category) {
        console.log("Category", category);
        await handleCategory(req, res, category)
    }

    if (stars) {
        console.log("Stars", stars);
        await handleStar(req, res, stars)
    }

    if (sub) {
        console.log("Sub", sub);
        await handleSubs(req, res, sub)
    }
    if (shipping) {
        console.log("Shipping", shipping);
        await handleShipping(req, res, shipping)
    }
    if (color) {
        console.log("Color", color);
        await handleColor(req, res, color)
    }
    if (brand) {
        console.log("Brand", brand);
        await handleBrand(req, res, brand)
    }


}

const handleQuery = async (req, res, query) => {
    const product = await Products.find({ $text: { $search: query } })
        .populate("category", "_id name")
        .populate("sub", "_id name")
        .populate("brand")
        .exec();
    res.json(product);
}


const handlePrice = async (req, res, price) => {
    try {
        const product = await Products.find({
            price: {
                $gte: price[0],
                $lte: price[1]
            },
        })
            .populate("category", "_id name")
            .populate("sub", "_id name")
            .populate("brand")
            .exec();
        res.json(product);
    }
    catch (err) {
        console.log(err);
    }
}

const handleCategory = async (req, res, category) => {
    try {
        console.log("category 433333", category);
        const product = await Products.find({ category })
            .populate("category", "_id name")
            .populate("sub", "_id name")
            .populate("brand")
            .exec();
        res.json(product);
    } catch (e) {
        console.log(e);
    }
}

const handleStar = (req, res, stars) => {
    Products.aggregate([{
        $project: {
            document: "$$ROOT",

            floorAverage: {
                $floor: { $avg: "$ratings.star" }
            }
        },
    },
    {
        $match: { floorAverage: stars },
    }
    ]).limit(12).exec((err, aggregate) => {
        if (err) console.log("Aggrttt Error", err);
        Products.find({ _id: aggregate })
            .populate("category", "_id name")
            .populate("sub", "_id name")
            .populate("brand")
            .exec((err, products) => {
                if (err) console.log("Product Aggrttt Error", err);
                res.json(products);
            })
    })
}


const handleSubs = async (req, res, sub) => {
    try {
        console.log("category 433333", sub);
        const product = await Products.find({ sub })
            .populate("category", "_id name")
            .populate("sub", "_id name")
            .populate("brand")
            .exec();
        res.json(product);
    } catch (e) {
        console.log(e);
    }
}



const handleShipping = async (req, res, shipping) => {
    try {
        console.log("category 433333", shipping);
        const product = await Products.find({ shipping })
            .populate("category", "_id name")
            .populate("sub", "_id name")
            .populate("brand")
            .exec();
        res.json(product);
    } catch (e) {
        console.log(e);
    }
}

const handleColor = async (req, res, color) => {
    try {
        const product = await Products.find({ color })
            .populate("category", "_id name")
            .populate("sub", "_id name")
            .populate("brand")
            .exec();
        res.json(product);
    } catch (e) {
        console.log(e);
    }
}

const handleBrand = async (req, res, brand) => {
    try {
        const product = await Products.find({ brand })
            .populate("category", "_id name")
            .populate("sub", "_id name")
            .populate("brand")
            .exec();
        res.json(product);
    } catch (e) {
        console.log(e);
    }
}

exports.getbrandsprod = async (req, res) => {
    const slug = req.params.brand;
    try {
        const brand = await Brand.findOne({ slug }).exec();
      
        if (!brand) {
          // Handle the case where the brand with the given slug is not found
          return res.status(404).json({ error: 'Brand not found' });
        }
      
        const product = await Products.find({ brand: brand._id })
          .populate('brand')
          .sort({ createdAt: -1 })
          .exec();
      
        return res.json(product);
      } catch (e) {
        console.error(e);
        return res.status(500).json({ error: 'Internal server error' });
      }
};