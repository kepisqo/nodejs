const Product = require('../models/product');
const Category = require('../models/category');
const Celikhane = require('../models/celikhane');
const Haddehane = require('../models/haddehane');
const Aba2 = require('../models/aba2');
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey('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');

exports.getIndex = (req, res, next) => {
    var today = new Date();
    var _celikhane;
    var _haddehane;
    var _aba2;
    var _aba2Dun;

    Aba2.findOne(
        {
            where: {tarih : today.toISOString().substring(0, 10)}, //tarih kontrolü yapılacak
        })
        .then(aba2 => {
            _aba2 = aba2;
            if(aba2 !== null){
                Aba2.findByPk(aba2.id-1)
                    .then(aba2 => {
                        _aba2Dun = aba2;
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
            
        })
        .catch((err) => {
            console.log(err);
        });

    Celikhane.findOne(
        {
            where: {tarih : today.toISOString().substring(0, 10)}, //tarih kontrolü yapılacak
        })
        .then(celikhane => {
            _celikhane = celikhane;

            Haddehane.findOne(
                {
                    where: {tarih : today.toISOString().substring(0, 10)}, //tarih kontrolü yapılacak
                })
                .then(haddehane => {
                    _haddehane = haddehane;
                    console.log(_celikhane);
                    console.log(_haddehane);
                    res.render('shop/index', {
                        title: 'Aba Çelik Rapor',
                        celikhane: celikhane,
                        haddehane: haddehane,
                        aba2: _aba2,
                        aba2Dun: _aba2Dun,
                        tarih: today.toISOString().substring(0, 10),
                        path: '/',
                        isAuthenticated: req.session.isAuthenticated,
                        isAdmin: req.session.isAdmin
                    });
                })
        })
        .catch((err) => {
            console.log(err);
        });
}

exports.postIndex = (req, res, next) => {
    kbara = req.body.kbara;
    tbara = req.body.tbara;
    hadde = req.body.hadde;
    vpsa = req.body.vpsa;
    _aba2 = req.body.aba2;
    var today = new Date();
    
    console.log(kbara);
    console.log(tbara);
    console.log(hadde);
    console.log(vpsa);
    console.log(_aba2);

    if(kbara){
        Celikhane.findOne(
            {
                where: {tarih : today.toISOString().substring(0, 10)}, //tarih kontrolü yapılacak
            })
            .then(celikhane => {
                if (celikhane == null){
                    Celikhane.create({
                        tbara : tbara,
                        kbara : kbara,
                        tarih : today.toISOString().substring(0, 10)
                    })
                    .then(result => {
                        res.redirect('/');
                    })
                    .catch(err => {
                        console.log(err);
                    });
                }else{
                    Celikhane.findByPk(celikhane.id)
                        .then(celikhane => {
                            celikhane.tbara = tbara;
                            celikhane.kbara = kbara;
                            return celikhane.save();
                        })
                        .then(result => {
                            console.log('updated');
                            res.redirect('/');
                        })
                        .catch(err => console.log(err));
                }
            })
            .catch((err) => {
                console.log(err);
            });
        
    }
    else if(hadde){
        Haddehane.findOne(
            {
                where: {tarih : today.toISOString().substring(0, 10)}, //tarih kontrolü yapılacak
            })
            .then(haddehane => {
                if (haddehane == null){
                    Haddehane.create({
                        hadde : hadde,
                        vpsa : vpsa,
                        tarih : today.toISOString().substring(0, 10)
                    })
                    .then(result => {
                        res.redirect('/');
                    })
                    .catch(err => {
                        console.log(err);
                    });
                }else{
                    Haddehane.findByPk(haddehane.id)
                        .then(haddehane => {
                            haddehane.hadde = hadde;
                            haddehane.vpsa = vpsa;
                            return haddehane.save();
                        })
                        .then(result => {
                            console.log('updated');
                            res.redirect('/');
                        })
                        .catch(err => console.log(err));
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }else if(_aba2){
        Aba2.findOne(
            {
                where: {tarih : today.toISOString().substring(0, 10)}, //tarih kontrolü yapılacak
            })
            .then(aba2 => {
                if (aba2 == null){
                    Aba2.create({
                        hadde : _aba2,
                        tarih : today.toISOString().substring(0, 10)
                    })
                    .then(result => {
                        res.redirect('/');
                    })
                    .catch(err => {
                        console.log(err);
                    });
                }else{
                    Aba2.findByPk(aba2.id)
                        .then(aba2 => {
                            aba2.hadde = _aba2;
                            return aba2.save();
                        })
                        .then(result => {
                            console.log('updated');
                            res.redirect('/');
                        })
                        .catch(err => console.log(err));
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }
}

exports.getMail = (req, res, next) => {

    var _celikhane;
    var _haddehane;
    var _aba2;
    var _aba2Dun;
    var today = new Date();
    var yesterday = new Date();
    var _today =  today.toISOString().substring(0, 10);
    var gun = today.getDate();
    yesterday.setDate(yesterday.getDate() - 1);
    dun = yesterday.getDate();

    var aylar = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
    ayT = aylar[today.getMonth()]
    ayY = aylar[yesterday.getMonth()]

    Celikhane.findOne(
        {
            where: {tarih : today.toISOString().substring(0, 10)}, //tarih kontrolü yapılacak
        })
        .then(celikhane => {
            _celikhane = celikhane;
            Haddehane.findOne(
                {
                    where: {tarih : today.toISOString().substring(0, 10)}, //tarih kontrolü yapılacak
                })
                .then(haddehane => {
                    _haddehane = haddehane;
                    Aba2.findOne(
                        {
                            where: {tarih : today.toISOString().substring(0, 10)}, //tarih kontrolü yapılacak
                        })
                        .then(aba2 => {
                            _aba2 = aba2;
                            if(_aba2 !== null){
                                Aba2.findByPk(_aba2.id-1)
                                    .then(aba2 => {
                                        _aba2Dun = aba2;
                                        if(_celikhane !== null && _haddehane !== null && _aba2 !== null){
                                            res.redirect('/');
            
                                            _haddehane.hadde = _haddehane.hadde - _haddehane.vpsa;
                                            _celikhane.tbara = _celikhane.tbara - _haddehane.hadde;
                                            _aba2.hadde = _aba2.hadde - _aba2Dun.hadde;
                                            _aba2.hadde = Math.round(_aba2.hadde* 9450);
                                            console.log(_haddehane.hadde);
                                            console.log(_celikhane.tbara);
                                            console.log(_aba2.hadde);
            
                                            const msg = {
                                                to: 'keleshmelih@gmail.com', // Change to your recipient
                                                from: 'ziya@payasosb.org.tr', // Change to your verified sender
                                                subject: _today + ' Günlük Elektrik Tüketim Raporu',
                                                //text: '',
                                                html: `<html>
                                                <head>
                                                <style>
                                                table, th, td {
                                                  border: 1px solid black;
                                                }
                                                </style>
                                                </head>
                                                <body>
                                                
                                                <h2> ${_today} Aba Çelik Demir Günlük Elektrik Tüketim Raporu</h2>
                                                
                                                <br><br>
                                                ${dun} ${ayY} (08:00) - ${gun} ${ayT} (08:00) arası kirli bara (eaf+lf) tüketim ${_celikhane.kbara} kwh
                                                <br><br>
                                                ${dun} ${ayY} (08:00) - ${gun} ${ayT} (08:00) arası çelikhane+oksijen temiz bara tüketim ${_celikhane.tbara} kwh
                                                <br><br>
                                                ${dun} ${ayY} (08:00) - ${gun} ${ayT} (08:00) arası haddehane tüketim ${_haddehane.hadde} kwh
                                                <br><br>
                                                ${dun} ${ayY} (08:00) - ${gun} ${ayT} (08:00) arası ABA-2 tüketim ${_aba2.hadde} kwh
                                                <br><br>
                                                
                                                </body>
                                                </html>`,
                                            }
                                            sgMail
                                                .send(msg)
                                                .then(() => {
                                                    
                                                    console.log('Email sent')
                                                    //res.redirect('/');
                                                })
                                                .catch((error) => {
                                                    //res.redirect('/a');
                                                    console.error(error)
                                                })

                                            // const msg2 = {
                                            //     to: 'ziyakeskin5@gmail.com', // Change to your recipient
                                            //     from: 'ziya@payasosb.org.tr', // Change to your verified sender
                                            //     subject: _today +'Günlük Elektrik Tüketim Raporu',
                                            //     //text: '',
                                            //     html: `<html>
                                            //     <head>
                                            //     <style>
                                            //     table, th, td {
                                            //       border: 1px solid black;
                                            //     }
                                            //     </style>
                                            //     </head>
                                            //     <body>
                                                
                                            //     <h2> ${_today} Aba Çelik Demir Günlük Elektrik Tüketim Raporu</h2>
                                                
                                            //     <br><br>
                                            //     ${dun} ${ayY} (08:00) - ${gun} ${ayT} (08:00) arası kirli bara (eaf+lf) tüketim ${_celikhane.kbara} kwh
                                            //     <br><br>
                                            //     ${dun} ${ayY} (08:00) - ${gun} ${ayT} (08:00) arası çelikhane+oksijen temiz bara tüketim ${_celikhane.tbara} kwh
                                            //     <br><br>
                                            //     ${dun} ${ayY} (08:00) - ${gun} ${ayT} (08:00) arası haddehane tüketim ${_haddehane.hadde} kwh
                                            //     <br><br>
                                            //     ${dun} ${ayY} (08:00) - ${gun} ${ayT} (08:00) arası ABA-2 tüketim ${_aba2.hadde} kwh
                                            //     <br><br>
                                                
                                            //     </body>
                                            //     </html>`,
                                            // }
                                            // sgMail
                                            //     .send(msg2)
                                            //     .then(() => {
                                            //     console.log('Email sent')
                                            //     })
                                            //     .catch((error) => {
                                            //     console.error(error)
                                            //     })


                                        }else{
                                            res.redirect('/a');
                                        }
                                    })
                                    .catch((err) => {
                                        console.log(err);
                                    });
                            }
                            
                        })
                        .catch((err) => {
                            console.log(err);
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

exports.getProducts = (req, res, next) => {

    Product.findAll({
        attributes: ['id', 'name', 'price', 'imageUrl'],
    })
        .then(products => {
           
            Category.findAll()
                .then(categories => {
                    res.render('shop/products', {
                        title: 'Products',
                        products: products,
                        categories: categories,
                        path: '/'
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

exports.getProductsByCategoryId = (req, res, next) => {
    const categoryid = req.params.categoryid;
    const model = [];

    Category.findAll()
        .then(categories => {
            model.categories = categories;
            const category = categories.find(i => i.id == categoryid);
            return category.getProducts();
        })
        .then(products => {
            res.render('shop/products', {
                title: 'Products',
                products: products,
                categories: model.categories,
                selectedCategory: categoryid,
                path: '/products'
            });
        })
        .catch((err) => {
            console.log(err);
        })
}

exports.getProduct = (req, res, next) => {

    Product.findAll(
        {
            attributes: ['id', 'name', 'price', 'imageUrl', 'description'],
            where: { id: req.params.productid }
        })
        .then(products => {
            res.render('shop/product-detail', {
                title: products[0].name,
                product: products[0],
                path: '/products'
            });
        })
        .catch((err) => {
            console.log(err);
        });
}


exports.getCart = (req, res, next) => {
    req.user
        .getCart()
        .then(cart => {

            return cart.getProducts()
                .then(products => {
                    console.log(products);

                    res.render('shop/cart', {
                        title: 'Cart',
                        path: '/cart',
                        products: products
                    });
                })
                .catch(err => { console.log(err); })

        }).catch(err => {
            console.log(err);
        });
}

exports.postCart = (req, res, next) => {

    const productId = req.body.productId;
    let quantity = 1;
    let userCart;

    req.user
        .getCart()
        .then(cart => {
            userCart = cart;
            return cart.getProducts({ where: { id: productId } });

        })
        .then(products => {
            let product;

            if (products.length > 0) {
                product = products[0];
            }

            if (product) {
                quantity += product.cartItem.quantity;
                return product;
            }
            return Product.findByPk(productId);

        })
        .then(product => {
            userCart.addProduct(product, {
                through: {
                    quantity: quantity
                }
            })
        })
        .then(() => {
            res.redirect('/cart');
        })
        .catch(err => {
            console.log(err);
        });
}

exports.postCartItemDelete = (req, res, next) => {
    const productid = req.body.productid;

    req.user
        .getCart()
        .then(cart => {
            return cart.getProducts({ where: { id: productid } });
        })
        .then(products => {
            const product = products[0];
            return product.cartItem.destroy();
        })
        .then(result => {
            res.redirect('/cart');
        });
}

exports.getOrders = (req, res, next) => {

    req.user
        .getOrders({ include: ['products'] })
        .then(orders => {
            console.log(orders);

            res.render('shop/orders', {
                title: 'Orders',
                path: '/orders',
                orders: orders
            });

        })
        .catch(err => console.log(err));


}

exports.postOrder = (req, res, next) => {
    let userCart;
    req.user
        .getCart()
        .then(cart => {
            userCart = cart;
            return cart.getProducts();
        })
        .then(products => {
            return req.user.createOrder()
                .then(order => {
                    order.addProducts(products.map(product => {
                        product.orderItem = {
                            quantity: product.cartItem.quantity,
                            price: product.price
                        }
                        return product;
                    }));
                })
                .catch(err => { console.log(err); });
        })
        .then(() => {
            userCart.setProducts(null);
        })
        .then(() => {
            res.redirect('/orders');
        })
        .catch(err => {
            console.log(err);
        });
}


