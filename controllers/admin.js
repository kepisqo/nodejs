const Product = require('../models/product');
const Category = require('../models/category');

exports.getProducts = (req, res, next) => {
    Product.findAll()
        .then(products => {//userId den User name bilgisi alınacak.
            console.log(products)
            res.render('admin/products', {
                title: 'Admin Products',
                products: products,
                path: '/admin/products',
                action: req.query.action
            });
        })
        .catch((err) => {
            console.log(err);
        });
}

exports.getAddProduct = (req, res, next) => {
    Category.findAll()
        .then((categories) => {
            res.render('admin/add-product', {
                title: 'New Product',
                path: '/admin/add-product',
                categories: categories
            });
        })
}

exports.postAddProduct = (req, res, next) => {

    const name = req.body.name;
    const price = req.body.price;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const categoryid = req.body.categoryids;
    const user = req.user;
    //çoklu kategory seçme eklenecek
    console.log(req);

    user.createProduct({
        name: name,
        price: price,
        imageUrl: imageUrl,
        description: description,
        categoryId: categoryid
    })
        .then(result => {
            res.redirect('/');
        })
        .catch(err => {
            console.log(err);
        });


}

exports.getEditProduct = (req, res, next) => {

    Product.findByPk(req.params.productid)
        .then((product) => {
            if (!product) {
                return res.redirect('/');
            }
            Category.findAll()
                .then((categories) => {
                    res.render('admin/edit-product', {
                        title: 'Edit Product',
                        path: '/admin/products',
                        product: product,
                        categories: categories
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        })
        .catch((err) => {
            console.log(err);
        });
}

exports.postEditProduct = (req, res, next) => {

    const id = req.body.id;
    const name = req.body.name;
    const price = req.body.price;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const categoryid = req.body.categoryid;

    Product.findByPk(id)
        .then(product => {
            product.name = name;
            product.price = price;
            product.imageUrl = imageUrl;
            product.description = description;
            product.categoryId = categoryid;
            return product.save();
        })
        .then(result => {
            console.log('updated');
            res.redirect('/admin/products?action=edit');
        })
        .catch(err => console.log(err));
}

exports.postDeleteProduct = (req, res, next) => {

    const id = req.body.productid;

    Product.findByPk(id)
        .then(product => {
            return product.destroy();
        })
        .then(result => {
            console.log('product has been deleted.');
            res.redirect('/admin/products?action=delete');
        })
        .catch(err => {
            console.log(err);
        });
}
//*****************************************************************
exports.getAddCategory = (req, res, next) => {
    res.render('admin/add-category', {
        title: 'New Category',
        path: '/admin/add-category'
    });
}


exports.postAddCategory = (req, res, next) => {

    const name = req.body.name;
    const description = req.body.description;

    Category.create({
        name: name,
        description: description
    })
        .then(result => {
            res.redirect('/');
        })
        .catch(err => {
            console.log(err);
        });
}

exports.getCategories = (req, res, next) => {

    Category.findAll()
        .then(categories => {
            console.log(req.query.action)
            res.render('admin/categories', {
                title: 'Categories',
                path: '/admin/categories',
                categories: categories,
                action: req.query.action// ne olduguna bakılacak
            });
        }).catch(err => console.log(err));
}


exports.getEditCategory = (req, res, next) => {
    Category.findByPk(req.params.categoryid)
        .then(category => {
            res.render('admin/edit-category', {
                title: 'Edit Category',
                path: '/admin/categories',
                category: category
            })
        })
        .catch(err => console.log(err));
}

exports.postEditCategory = (req, res, next) => {

    const id = req.body.id;
    const name = req.body.name;
    const description = req.body.description;

    Category.findByPk(id)
        .then(category => {
            category.name = name;
            category.description = description;
            return category.save();
        }).then(() => {
            res.redirect('/admin/categories?action=edit');
        })
        .catch(err => console.log(err));

}

exports.postDeleteCategory = (req, res, next) => {
    const id = req.body.categoryid;

    Category.findByPk(id)
        .then(category => {
            return category.destroy();
        })
        .then(() => {
            res.redirect('/admin/categories?action=delete');
        })
        .catch(err => {
            console.log(err);
        })
}