var express = require('express');
var router = express.Router();
const APIController = require('../controllers/APIController');
const path = require ('path');
const multer = require('multer');


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/img/products')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

var upload = multer({ storage: storage })


router.get('/products', APIController.products);

router.get('/product/:id', APIController.product);

router.post('/products', APIController.products);

router.post('/newProduct', upload.any(), APIController.newProduct);

router.get('/delete/:id', APIController.softDelete);


router.post('/delete/:id', APIController.softDelete);

router.post('/deleteImage/:id', APIController.softDeleteImage);

router.post('/edit/:id', upload.any(), APIController.editProduct);





module.exports = router;