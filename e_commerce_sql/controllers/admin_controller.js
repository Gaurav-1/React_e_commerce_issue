const express = require('express');
const session = require('express-session');
const fs = require('fs');
const path = require('path');
const {v4:uuid} = require('uuid');
const {
    findUser,
    findNewSeller,
    approveSeller,
    rejectSeller,
    findSellerProducts,
    updateProduct,
    addProduct,
    deleteProduct,
    approveProduct,
    rejectProduct,
    cityExpoter,
    stateExpoter,
    deliveryPerson,
} = require('../utils/dbqueries')

function show_dashboard(req,res){
    if(!req.session.userid || req.session.role!='admin')
        res.redirect('/')
    else
        res.render('admin/dashboard',{username: req.session.username})
}

async function send_products(req,res){
    findAllProduct()
    .then((products)=>{
        if(products.length>0){
            const send_products = products.slice(req.body.pages,req.body.pages+5);
            res.status(200).json(send_products);
        }
        else{
            re.send(301).json({message:'No product available right now'})
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

function show_add_product(req,res){
    if(!req.session.userid || req.session.role!='admin')
        res.redirect('/user')
    else
        res.render('admin/add_product',{username: req.session.username})
}

function add_product(req,res){ 
    const newProduct = {
        seller_id: req.session.userid,
        name: req.body.names,
        description: req.body.desc,
        price: req.body.price,
        quantity: req.body.quantity,
        image: '/uploads/product_images/'+req.file.filename,
    }

    addProduct(newProduct)
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
            res.json({message: 'Sucessfully deleted'})
        else
            res.json({message: 'Failed to delete'})
    })
    .catch(err=>{ res.json({message: err.message}) })
    // await productSchema.findById({_id: req.body.id})
    // .then(res=>{
    //     const imgdeleted = fs.unlinkSync(path.join(__dirname,'..','/public/'+res.image));
    //     (imgdeleted)?res.json({message: "Unable to delete image"}):'';
    // })
    // const isdeleted = await productSchema.deleteOne({_id: req.body.id});

    // if(isdeleted.deletedCount==1)
    //     res.json({message: ''})
}

async function show_seller(req,res){
    if(!req.session.userid || req.session.role!='admin')
        res.redirect('/user')
    else
        res.render('admin/new_sellers',{username: req.session.username})
}

async function send_seller(req,res){
    findNewSeller()
    .then((response)=>{
        if(response.length<1){
            res.json({message: 'No new seller',sellers: null})
            return;
        }
            res.json({message: null,sellers: response});
    })
}

async function approve_seller(req,res){
    approveSeller({id: req.body.id})
    .then((response)=>{
        if(response.affectedRows>0){
            res.json({message: 'Seller application approved'})
        }
        else{
            res.json({message: 'Unable to approve seller'})
            return;
        }
    })
    .catch((err)=>{
        res.json({message: 'An Error occured'})
    })
}

async function reject_seller(req,res){
    rejectSeller({id: req.body.id})
    .then((response)=>{
        if(response.affectedRows>0){
            res.json({message: 'Seller application rejected'})
        }
        else{
            res.json({message: 'Unable to reject seller'})
            return;
        }
    })
    .catch((err)=>{
        res.json({message: 'An Error occured'})
    })
}

async function show_seller_products(req,res){
    if(!req.session.userid || req.session.role!='admin')
        res.redirect('/user')
    else
        res.render('admin/new_products',{username: req.session.username})
}

async function send_seller_products(req,res){
    findSellerProducts({start: req.body.pages, limit: req.body.max})
    .then((response)=>{
        if(response.length<1){
            res.json({message: 'No new seller product',sellers: null})
            return;
        }
            res.json({message: null,sellers: response});
    })
    .catch(err=>{ res.json({message: err,sellers: null}) })
}

function approve_product(req,res){
    approveProduct({id: req.session.userid,product_id: req.body.id})
    .then((response)=>{
        if(response.affectedRows>0){
            res.json({message: 'Seller product approved'})
        }
        else{
            res.json({message: 'Unable to approve product'})
            return;
        }
    })
    .catch((err)=>{
        res.json({message: 'An Error Occured'})
    })
}

function reject_product(req,res){
    rejectProduct({id: req.body.id})
    .then((response)=>{
        if(response.affectedRows>0){
            res.json({message: 'Seller product rejected'})
        }
        else{
            res.json({message: 'Unable to rejecte product'})
            return;
        }
    })
    .catch((err)=>{
        res.json({message: 'An Error occured'})
    })
}

function show_transpoter(req,res){
    if(!req.session.userid || req.session.role!='admin')
        res.redirect('/')
    else
        res.render('admin/add_transpoter',{username: req.session.username})
}

function add_transpoter(req,res){
    if(!req.session.userid && req.session.role!=='admin'){
        res.json({message: 'NOT AUTHORISED'})
        return;
    }
        findUser({mail: req.body.mail})
        .then((user)=>{
            if(user.length>0){
                res.json({message: 'User already exist'});
                return;
            }
            const id = uuid();
            const values = {
                            user_id: id,
                            name: req.body.names,
                            mail: req.body.mail,
                            password: req.body.password,
                            isVerified: true,
                        };
            
            if(req.body.type.toLowerCase() == 'city' || req.body.type.toLowerCase() == 'state')
                values.role = req.body.type+'expoter';
            else if(req.body.type.toLowerCase() == 'deliveryperson')
                values.role = req.body.type;
            else{
                res.json({message: 'Invalid user type'});
                return;
            }
                        

            const qry = `INSERT INTO user SET ?`;
            const sql = conn.query(qry,values,(err,result)=>{
                if(err)
                    res.json({message: `Signup failed`, url: ''})
                else{
                    let tb;
                    if(req.body.type.toLowerCase() == 'city'){
                        cityExpoter({expoter_id: id,city: req.body.city.toLowerCase(), pincode: req.body.pincode,state: req.body.state.toLowerCase(),warehouse: req.body.warehouse})
                        .then(response=>{
                            if(response.affectedRows<1){
                                res.json({message: 'Unable to save Expoter Details'})
                            }
                        })
                        .catch(err=>{
                            res.json({err: err})
                        })
                    }
                    else if(req.body.type.toLowerCase() == 'state'){
                        stateExpoter({expoter_id: id,state: req.body.state.toLowerCase(),warehouse: req.body.warehouse})
                        .then(response=>{
                            if(response.affectedRows<1){
                                res.json({message: 'Unable to save Expoter Details'})
                            }
                        })
                        .catch(err=>{
                            res.json({err: err})
                        })
                    }
                    else if(req.body.type.toLowerCase() == 'deliveryperson'){
                        deliveryPerson({expoter_id: id,city: req.body.city.toLowerCase(), pincode: req.body.pincode,state: req.body.state.toLowerCase(),warehouse: req.body.warehouse})
                        .then(response=>{
                            if(response.affectedRows<1){
                                res.json({message: 'Unable to save Delivery Person Details'})
                            }
                        })
                        .catch(err=>{
                            res.json({err: err})
                        })
                    }
                    else{   throw new Error({err: 'Invalid choice'}); }

                    res.json({message: 'Expoters saved sucessfully'})
                }
            })
        })
        .catch((err)=>{
            res.json({err: err});
        })
}


module.exports = {
    show_dashboard,
    send_products,
    update_product,
    show_add_product,
    add_product,
    delete_product,
    show_seller,
    send_seller,
    approve_seller,
    reject_seller,
    show_seller_products,
    send_seller_products,
    approve_product,
    reject_product,
    show_transpoter,
    add_transpoter,
}