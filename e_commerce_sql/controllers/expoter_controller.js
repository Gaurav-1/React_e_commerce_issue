const express = require('express');
const session = require('express-session');
const {v4:uuid} = require('uuid');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const {
    showExpoterOrder,
    updateOrderStatus,
} = require('../utils/dbqueries')


function show_dashboard(req,res){
    if(!req.session.userid || !req.session.role.includes('expoter'))
        res.redirect('/')
    else
        res.render('expoter/dashboard',{username: req.session.username})
}

function send_order(req,res){
    if(!req.session.userid || !req.session.role.includes('expoter')){
        res.redirect('/')
        return;
    }
    console.log(req.body);
    let statuss;
    let tb;
    if(req.body.type.toLowerCase()==='arriving' && req.session.role == 'stateexpoter')
        statuss = 'dispatch'
    else if(req.body.type.toLowerCase()==='arrived' && req.session.role == 'stateexpoter'){
        statuss = 'InState'
        tb='cityexpoter'
    }
    else if(req.body.type.toLowerCase()==='arriving' && req.session.role == 'cityexpoter')
        statuss = 'OutForCity'
    else if(req.body.type.toLowerCase()==='arrived' && req.session.role == 'cityexpoter'){
        statuss = 'InCity'
        tb = 'deliverypersons'
    }
    else{
        res.json({message: 'No Orders Details Found For '+req.body.type,orders: null})
        return;
    }
    console.log(statuss);
    showExpoterOrder({id: req.session.userid, status: statuss,tb: tb})
    .then(response=>{
        console.log(response);
        if(response.length<1){
            res.json({message: 'No orders details found for '+req.body.type,orders: null})
            return;
        }
        res.json({message: null,orders: response})
    })
    .catch(err=>{
        res.json({message: err})
    })
}

function approve_order(req,res){
    if(!req.session.userid || !req.session.role.includes('expoter')){
        res.redirect('/')
        return;
    }
    console.log(req.body);
    let statuss;
    if(req.body.status.toLowerCase()==='received' && req.session.role == 'stateexpoter'){
        statuss = 'InState'
    }
    else if(req.body.status.toLowerCase()==='dispatch' && req.session.role == 'stateexpoter'){
            statuss = 'OutForCity'
    }
    else if(req.body.status.toLowerCase()==='received' && req.session.role == 'cityexpoter'){
            statuss = 'InCity'
    }
    else if(req.body.status.toLowerCase()==='dispatch' && req.session.role == 'cityexpoter'){
            statuss = 'OutForDelivery'
    }
    else{
        res.status(403).json({message: 'Product status updation failed'})
        return;
    }
    const ob = {
        order_id: req.body.id,
        status: statuss,
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

module.exports = {
    show_dashboard,
    send_order,
    approve_order,
}