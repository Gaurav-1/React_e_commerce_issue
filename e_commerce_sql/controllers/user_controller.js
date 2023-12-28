const session = require('express-session');
const {
    findUser,
    findUserById,
    findSellerById,
} = require('../utils/dbqueries');
const nodemailer = require("nodemailer");
const { v4: uuid } = require('uuid');

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "kohligaurav845@gmail.com",
        pass: "rcrg amgd kjwk fifw"
    },
});

function show_login(req, res) {
    // if(!req.session.userid)
    //     res.render('login')
    // else if(req.session.role=='user')
    //     res.redirect('/product/dashboard')
    // else if(req.session.role=='admin')
    //     res.redirect('/admin/dashboard')
    // else if(req.session.role=='seller')
    //     res.redirect('/seller/dashboard')
}

function login_user(req, res) {

    findUser({ mail: req.body.email })
        .then((user) => {
            if (user.length > 0) {
                if (user[0].isVerified === 0) {
                    res.json({ message: 'Please Verify yourself first', url: null });
                    return;
                }
                // console.log(user[0].user_id);
                if (user[0].role == 'seller') {
                    findSellerById({ user_id: user[0].user_id })
                        .then((response) => {
                            // console.log(response[0].isApproved);
                            if (response[0].isApproved === 0) {
                                res.json({ message: 'please wait for your application approval', url: null })
                            }
                            else if (user[0].password === req.body.password) {
                                req.session.username = user[0].name;
                                req.session.userid = user[0].user_id;
                                req.session.role = user[0].role;
                                const userObj = { userMail: user[0].mail, userName: user[0].name, userRole: user[0].role, isVerified: user[0].isVerified }
                                res.json({ message: null, url: '/seller', userObj })//seller/dashboard
                            }
                            else {
                                res.json({ message: 'Invalid Mail/Password', url: null })
                            }
                        })
                        .catch((err) => {
                            res.json({ message: 'An error occured' });
                            return;
                        })
                }
                else if (user[0].password === req.body.password) {
                    req.session.username = user[0].name;
                    req.session.userid = user[0].user_id;
                    req.session.role = user[0].role;

                    const userObj = { userMail: user[0].mail, userName: user[0].name, userRole: user[0].role, isVerified: user[0].isVerified }
                    if (user[0].role === 'user') {
                        res.json({ message: null, url: '/', userObj })//product/dashboard
                    }
                    else if (user[0].role === 'admin') {
                        res.json({ message: null, url: '/', userObj })
                    }//admin/dashboard
                    else if (user[0].role === 'stateexpoter' || user[0].role === 'cityexpoter')
                        res.json({ message: null, url: '/', userObj })//expoter/dashboard
                    else if (user[0].role === 'deliveryperson')
                        res.json({ message: null, url: '/', userObj })//deliveryperson/dashboard
                }
                else {
                    res.json({ message: 'Invalid Mail/Password', url: null })
                }
            }
            else {
                res.json({ message: 'User Not Exist', url: null })
            }
        })
}

function show_signup(req, res) {
    if (!req.session.uerid)
        res.render('signup');
    else if (req.session.role == 'user')
        res.redirect('/product/dashboard')
    else if (req.session.role == 'admin')
        res.redirect('/admin/dashboard')
    else if (req.session.role == 'seller')
        res.redirect('/seller/dashboard')
}

async function signup_user(req, res) {
    findUser({ mail: req.body.usermail })
        .then((user) => {
            if (user.length > 0) {
                res.json({ message: 'User already exist' });
                return;
            }
            const values = {
                user_id: uuid(),
                name: req.body.name,
                mail: req.body.email,
                password: req.body.password,
                isVerified: false,
                role: 'user'
            };
            const qry = `INSERT INTO user SET ?`;
            const sql = conn.query(qry, values, (err, result) => {
                if (err)
                    res.json({ message: `Signup failed` })
                else {
                    send_mail(req.body.email);
                    res.json({ message: 'Verification mail has been send\nPlease verify your mail' });
                }
            })
        })
        .catch((err) => {
            res.json({ message: 'Internal Server Error' });
        })
}

function logout_user(req, res) {
    req.session.destroy();
    if (req.session === undefined)
        res.status(200).json({ message: 'Successfully logged out' });
    else
        res.status(404).json({ message: 'Failed to logout' })
}

async function send_mail(mail) {
    findUser({ mail: mail })
        .then((user) => {
            if (user.length > 0) {
                const msg = `<p> Please verify your mail</p>`;

                const mail_content = {
                    from: 'Procduct Cart', // sender address
                    to: mail, // list of receivers
                    subject: "Verification mail", // Subject line
                    text: "Verify your mail", // plain text body
                    html: `Hello ${user[0].name},\n ${msg} ----  http://localhost:3000/user/verify/${user[0].user_id} \n Thanks for joining us.`, // html body
                }
                transporter.sendMail(mail_content, (err) => {
                    if (err)
                        throw new Error(err);
                    console.log('Mail send successfully');
                })
            }
        })
}

async function verify_mail(req, res) {
    findUserById({ user_id: req.params.id })
        .then((user) => {
            if (user.length > 0) {
                const sql = conn.query(`UPDATE user SET isVerified=${true} WHERE user_id="${req.params.id}";`)
                req.session.username = user[0].name;
                req.session.userid = user[0].user_id;
                req.session.role = user[0].role;
                if (user[0].role === 'user')
                    res.redirect('/product/dashboard')
                if (user[0].role === 'admin')
                    res.redirect('/admin/dashboard')
            }
        })
        .catch((err) => {
            res.json({ message: 'Verification Failed' });
        })
}

function change_password(req, res) {
    if (req.session.userid || req.params.id) {
        res.render('change_password', { username: req.session.username });
        return;
    }
    res.redirect('/user');
}

async function update_password(req, res) {
    const idd = req.session.userid || req.params.id;
    findUserById({ user_id: idd })
        .then((user) => {
            if (user.length > 0) {
                const sql = conn.query(`UPDATE user SET password="${req.body.password}" WHERE user_id="${idd}";`, (err, result) => {
                    if (err)
                        res.status(304).end();
                    else
                        res.status(200).end();
                })
            }
        })
        .catch((err) => {
            res.status(500).send(err.message);
        })
}

async function send_forget_mail(req, res) {
    findUser({ mail: req.body.mail })
        .then((user) => {
            if (!user.length < 0) {
                res.status(404).json({ message: 'Invalid mail address' });
                return;
            }
            if (user.length > 0) {

                const msg = `<p>Click the link to change password</p>`;

                const mail_content = {
                    from: 'kohligaurav845@gmail.com',
                    to: user[0].mail,
                    subject: "Forget Password",
                    text: "Change Password",
                    html: `Hello ${user[0].name},<br> ${msg} <br>  http://localhost:3000/user/change_password/${user[0].user_id} <br> We are allways here to help you.`,
                }
                transporter.sendMail(mail_content, (err) => {
                    if (err)
                        throw new Error(err);
                    console.log('Mail send successfully');
                    res.status(200).json({ message: 'Link has been send please check your mail' })
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.send(500).send(err.message);
        })
}

function forget_password(req, res) {
    res.render('forget_password');
}

module.exports = {
    show_login,
    login_user,
    show_signup,
    signup_user,
    logout_user,
    verify_mail,
    change_password,
    update_password,
    send_forget_mail,
    forget_password,
}