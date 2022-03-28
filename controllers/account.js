const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.getLogin = (req, res, next) => {
    res.render('account/login', {
        path: '/login',
        title: 'Login',
        isAuthenticated: req.session.isAuthenticated,
        isAdmin: req.session.isAdmin
    });
}

exports.postLogin = (req, res, next) => {

    const email = req.body.email;
    const password = req.body.password;

    // User.findAll({where:{ email: email, password: password}})
    // .then((user) => {
    //     if(user){
    //         console.log('Giriş başarılı');
    //         return res.redirect('/register');
    //     }
        
    // });
    if ((email == 'ziya@gmail.com') && (password == '1234')) {
        // res.cookie('isAuthenticated', true);
        // res.cookie('isAdmin', true);
        req.session.isAuthenticated = true;
        req.session.isAdmin = true;
        res.redirect('/');
    } else {
        // res.cookie('isAuthenticated', false);
        // res.cookie('isAdmin', false);
        // req.session.isAuthenticated = false;
        // req.session.isAdmin = false;
        res.redirect('/login');
    }
    res.redirect('/');
}

exports.getRegister = (req, res, next) => {
    res.render('account/register', {
        path: '/register',
        title: 'Register',
        isAuthenticated: req.session.isAuthenticated,
        isAdmin: req.session.isAdmin
    });
}

exports.postRegister = (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({where:{ email: email}})
                .then((user) => {
                    if(user){
                        console.log('Bu mail adresi kullanılmış');
                        return res.redirect('/register');
                    }
                    console.log('Email1')
                    return bcrypt.hash(password, 10);
                    
                })
                .then((hashedPassword) => {
                    console.log('Email2')
                    console.log(hashedPassword);
                    User.create({
        
                        name: name,
                        email: email,
                        password: hashedPassword
                
                        })
                        .then(user => {
                            _user = user;
                            return user.getCart();
                        }).then(cart => {
                            if (!cart) {
                                return _user.createCart();
                            }
                            return cart;
                        })
                        .then(() => {
                            res.redirect('/login');
                        })
                        .catch(err => {
                            console.log(err);
                        });
                })
                .catch(err => {
                    console.log(err);
                });
}

exports.getReset = (req, res, next) => {
    res.render('account/reset', {
        path: '/reset',
        title: 'Reset'
    });
}

exports.postReset = (req, res, next) => {
    res.redirect('/login');
}