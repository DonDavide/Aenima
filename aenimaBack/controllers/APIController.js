const db = require("../database/models");
const Op = db.Sequelize.Op;

var APIController = {
    
    products : (req, res, next) => { 
        console.log('entro aca');
        
        req.body.offset != undefined ? offset = req.body.offset : offset = 0;

        let name = req.body.name;
        let description = req.body.description;
        let priceFrom = req.body.priceFrom;
        let priceTo = req.body.priceTo;
        var filters = {description : description, priceFrom : priceFrom, priceTo : priceTo};
        var options = {where: {
            deleted : null,
        },
        order: [
            ['createdAt', 'DESC']
            ],
        limit : 10,
        offset : offset,
    
     include:[{association : "images"}]};

        if(name) {
          options.where.name = {[Op.like]: name};
        }
        if(description) {
            options.where.description = {[Op.like]: description};
          }
        if(priceFrom && priceTo) {
          options.where.price = {$between: [priceFrom, priceTo]}
        }
        console.log(options)
        let getProducts = db.Product.findAndCountAll(options);
        Promise.all ([getProducts])
        .then( ([getProducts])=>{
            let response = {
                meta:{
                    status : 200,
                    state : "OK",
                    total : getProducts.length,
                    url : "/api/products",
                    filters : filters,
                    
                },
                data : getProducts
            }
            res.json(response);
        }).catch(function(error){
            console.log(error);
        })
    },
    product : (req, res, next) => { 
        db.Product.findOne({
            where : {
                id_product : req.params.id,
                deleted : null
            }
        })
        .then( (result)=>{
            if(result==null){
                let response={
                    
                        meta:{
                            status : 200,
                            state : false,
                            url : "/api/product",
                            message : "Invalid product id"                
                        },
                        data : null 
                }
                console.log(response);
                res.json(response)   
            }else{
            let response = {
                meta:{
                    status : 200,
                    state : true,
                    total : result.length,
                    url : "/api/product",
                    message : "OK"                
                },
                data : result
            }
            res.json(response)
            console.log(response);} 
        }).catch(function(error){
            console.log(error);
        })    
    },
    newProduct: (req, res, next) =>{
        console.log(req.body.name);
        console.log(req.body.price);
        console.log(req.body.description);

        console.log(req.files);

        db.Product.create({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
        })
        .then(function(){
            db.Product.max('id_product').then(result => {
                console.log('despues del then de max id')
                console.log(req.files)
                for (var i = 0 ; i < req.files.length ; i ++){
                    db.Image.create({
                       id_product : result,
                        path : req.files[i].filename,
                        name : req.files[i].originalname
                    })
                }
                }) 
        })
        .then(function(){
            db.Product.findAndCountAll({
                order: [
                    ['name', 'ASC'],
                    ],
            })
        })
        .then((getProducts)=>{
            let response = {
                meta:{
                    status : 200,
                    state : "OK",
                    url : "/api/products",
                },
                data : getProducts
            }
            res.json(response);
        }).catch(function(error){
            console.log(error);
        })
    },
    softDelete: (req, res, next) => {
        console.log(req.params.id);
        hoy = Date.toString;
        console.log(hoy);

        db.Product.update({
            deleted : 1

        },{
            where :  {id_product: req.params.id}
        }) 
        .then(function(){
            db.Image.update({
                deleted : 1
            },{
                where :  {id_product: req.params.id}
            })
        })
        .then((getProducts)=>{
            let response = {
                meta:{
                    status : 200,
                    state : "OK",
                    url : "/api/delete",
                },
                data : getProducts
            }
            res.json(response);
        }).catch(function(error){
            console.log(error);
        })

    },
    softDeleteImage: (req, res, next) => {
            db.Image.update({
                deleted : 1
            },{
                where :  {id_image: req.params.id}
            })
        .then((getProducts)=>{
            let response = {
                meta:{
                    status : 200,
                    state : "OK",
                    url : "/api/deleteImage",
                },
                data : getProducts
            }
            res.json(response);
        }).catch(function(error){
            console.log(error);
        })

    },
    editProduct : (req, res, next) =>{
        db.Product.update({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,   
        },{
            where :  {id_product: req.params.id}
        })
        .then(function(){
        for (var i = 0 ; i < req.files.length ; i ++){
            db.Image.findOrCreate({
                where: { id_product: req.params.id, name : req.files[i].originalname },
                defaults: {
                    id_product : result,
                    path : req.files[i].filename,
                    name : req.files[i].originalname
                }
              })
        }
        }) 
        .then(function(){
            db.Product.findAndCountAll({
                order: [
                    ['name', 'ASC'],
                    ],
            })
        })
        .then((getProducts)=>{
            let response = {
                meta:{
                    status : 200,
                    state : "OK",
                    total : getProducts.length,
                    url : "/api/edit",
                },
                data : getProducts
            }
            res.json(response);
        }).catch(function(error){
            console.log(error);
        }) 
    }
}
module.exports = APIController;