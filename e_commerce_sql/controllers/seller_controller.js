const express = require('express');
const session = require('express-session');
const {v4:uuid} = require('uuid');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const {
    findUser,
    findUserById,
    insertSeller,
    findSellerProduct,
    updateProduct,
    addSellerProduct,
    deleteProduct,
    showSellerOrder,
    updateOrderStatus,
    getSellerReport,
    seller_total_products,
} = require('../utils/dbqueries')

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "kohligaurav845@gmail.com",
      pass: "frsgmprjbzbdcpwn"
    },
});
  

function show_signup(req,res){
    res.render('seller/signup')
}

function signup_seller(req,res){
    console.log(req.body);
    findUser({mail: req.body.usermail})
    .then((user)=>{
        if(user.length>0){
            res.json({message: 'User already exist', url: ''});
            return;
        }
        console.log(req.files[0].filename);
        const id = uuid();
        const values = {user_id: id,
                        name: req.body.username,
                        mail: req.body.usermail,
                        password: req.body.password,
                        isVerified: false,
                        role: 'seller'
                    };
        const qry = `INSERT INTO user SET ?`;
        const sql = conn.query(qry,values,(err,result)=>{
            if(err)
                res.json({message: `Signup failed`, url: ''})
            else if(result.affectedRows!=0){
                const seller_data = {
                    seller_id: id,
                    isApproved: 0,
                    contact: req.body.usercontact,
                    business_name: req.body.business_name,
                    business_address: req.body.business_address,
                    store_image: '/uploads/store_images/'+req.files[0].filename,
                    profile_image: '/uploads/profile_images/'+req.files[1].filename,
                    gst_number: req.body.gst_number,
                    aadhar_id: req.body.aadhar_id,
                    aadhar_image: '/uploads/aadhar_images/'+req.files[2].filename,
                    pan_id: req.body.pan_id,
                    pan_image: '/uploads/pan_images/'+req.files[3].filename
                };

                insertSeller(seller_data)
                .then((response)=>{
                    if(response.affectedRows==0){
                        res.json({message: "Signup failed"})
                        return;
                    }
                    send_mail(req.body.usermail);
                    res.json({message: 'Verification mail has been send\nPlease verify your mail',url: '/'});
                })
                }
        })
    })
    .catch((err)=>{
        res.json({message: 'Internal Server Error'});
    })
}

function show_dashboard(req,res){
    if(!req.session.userid || req.session.role!='seller')
        res.redirect('/')
    else
        res.render('seller/dashboard',{username: req.session.username})
}

async function send_products(req,res){
    findSellerProduct({seller_id: req.session.userid})
    .then((products)=>{
        if(products.length>0){
            const send_products = products.slice(req.body.pages,req.body.max);
            res.status(200).json(send_products);
        }
        else{
            res.json({message:'No product available right now'})
        }
    })
}

async function update_product(req,res){
    
    const newdata = {
        product_id: req.body.id,
        product_name: req.body.product_name,
        desc: req.body.desc,
        price: Number(req.body.price),
        quantity: Number(req.body.quantity)
    }
    updateProduct(newdata)
    .then((response)=>{
        if(response.affectedRows!=0){
            res.json({message: 'Product Updated'})
        }
        else
            res.json({message: "Can't update product"})
    })
}

function total_products(req,res){
    seller_total_products({seller_id: req.session.userid})
    .then((response)=>{
            res.json(response)
    })
    .catch(err=>{
        console.log(err);
        res.json(err);
    })
}

function show_add_product(req,res){
    if(!req.session.userid || req.session.role!='seller')
        res.redirect('/')
    else
        res.render('seller/add_product',{username: req.session.username})
}

async function send_mail(mail){
    findUser({mail: mail})
    .then((user)=>{
            if(user.length>0){
                const msg = `<p> Please verify your mail</p>`;
        
            const mail_content = {
            from: 'Product Cart', // sender address
            to: mail, // list of receivers
            subject: "Verification mail", // Subject line
            text: "Verify your mail", // plain text body
            html: `Hello ${user[0].name},\n ${msg} ----  http://localhost:3000/seller/verify/${user[0].user_id} \n Thanks for joining us.`, // html body
            }
            transporter.sendMail(mail_content,(err)=>{
                if(err)
                    throw new Error(err);
                console.log('Mail send successfully');
            })
        }
    })
}

async function verify_mail(req,res){
    findUserById({user_id: req.params.id})
    .then((user)=>{
        if(user.length>0){
            conn.query(`UPDATE user SET isVerified=${true} WHERE user_id="${req.params.id}";`,(err,result)=>{
                if(err)
                    res.json({message: 'An error occured'})
                else
                    res.json({message: 'Verification Success\n Please wait for your approval mail'})
            })

        }
    })
    .catch((err)=>{
        res.json({message: 'Verification Failed'});
    })
}

function add_product(req,res){
    console.log("Body :"+req.body);
    const newProduct = {
        seller_id: req.session.userid,
        name: req.body.names,
        description: req.body.description,
        price: req.body.price,
        quantity: req.body.quantity,
        image: '/uploads/product_images/'+req.files[0].filename,
    }

    addSellerProduct(newProduct)
    .then((response)=>{
        if(response.affectedRows!=0){
            res.json({message: 'Product added sucessfully'})
        }
        else
        res.json({message: 'Unable to add product'})
    })
    .catch(err=>{ res.json({message: err.message}) })
}

async function delete_product(req,res){
    deleteProduct({product_id: req.body.id})
    .then((response)=>{
        if(response.affectedRows!=0)
            // fs.unlinkSync()
            res.json({message: 'Sucessfully deleted'})
        else
            res.json({message: 'Failed to delete'})
    })
    .catch(err=>{ res.json({message: err.message}) })
}

function show_seller_order(req,res){
    if(!req.session.userid || req.session.role!='seller')
        res.redirect('/')
    else
        res.render('seller/orders',{username: req.session.username})
}

function send_seller_order(req,res){
    console.log("Body: "+req.body);
    let stat
    if(req.body.type.toLowerCase() === 'dispatch')
        stat = `'${req.body.type}','InState','OutForCity','InCity','OutForDelivery'`
    else
        stat = `'${req.body.type}'`
    console.log(stat);
    showSellerOrder({id: req.session.userid, status: stat})
    .then(response=>{
        console.log(response);
        if(response.length<1){
            res.json({message: 'No orders details found for '+req.body.type,orders: null})
            return;
        }
        res.json({message: null,orders: response})
    })
}

function approve_order(req,res){
    const ob = {
        order_id: req.body.id,
        status: req.body.status,
        expoter_id: req.body.expoter_id || req.session.userid
    }
    updateOrderStatus(ob)
    .then(response=>{
        if(response.affectedRows<1){
            res.status(403).json({message: 'Product status updation failed'})
            return;
        }
        res.json({message: 'Product status updated'})
    })
}

function show_report(req,res){
    if(!req.session.userid || req.session.role!='seller')
        res.redirect('/')
    else
        res.render("seller/report",{username: req.session.username})
}

function send_report(req,res){
    getSellerReport({id: req.session.userid,col: req.body.category})
    .then(response=>{
        if(response.length<1){
            res.json({message: 'No orders details found for '+req.body.type,orders: null})
            return;
        }
        res.json({message: null,orders: response})
    }).catch((err) => {
        res.json(err)
    });
}

module.exports = {
    show_signup,
    signup_seller,
    verify_mail,
    show_dashboard,
    send_products,
    update_product,
    show_add_product,
    add_product,
    delete_product,
    show_seller_order,
    send_seller_order,
    approve_order,
    show_report,
    send_report,
    total_products,
}