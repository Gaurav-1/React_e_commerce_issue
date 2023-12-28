const express = require('express');
const session = require('express-session');
const fs = require('fs');
const path = require('path');
const {
    showExpoterOrder,
    updateOrderStatus,
} = require('../utils/dbqueries')


function show_dashboard(req,res){
    if(!req.session.userid || req.session.role != 'deliveryperson')
        res.redirect('/')
    else
        res.render('deliveryperson/dashboard',{username: req.session.username})
}

function send_order(req,res){
    console.log('here');
    if(!req.session.userid || req.session.role != 'deliveryperson'){
        res.redirect('/')
        return;
    }
    console.log('here2');
    console.log(req.body);
    let statuss;
    if(req.body.type.toLowerCase()==='outfordelivery' && req.session.role == 'deliveryperson')
        statuss = 'OutForDelivery'
    else if(req.body.type.toLowerCase()==='delivered' && req.session.role == 'deliveryperson')
        statuss = 'recived'
    else{
        res.json({message: 'No Orders Details Found For '+req.body.type,orders: null})
        return;
    }
    console.log(statuss);
    showExpoterOrder({id: req.session.userid, status: statuss})
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
    if(!req.session.userid || req.session.role != 'deliveryperson'){
        res.redirect('/')
        return;
    }
    // console.log(req.body);
    // let statuss;
    // if(req.body.status.toLowerCase()==='received' && req.session.role == 'stateexpoter'){
    //     statuss = 'InState'
    // }
    // else if(req.body.status.toLowerCase()==='dispatch' && req.session.role == 'stateexpoter'){
    //         statuss = 'OutForCity'
    // }
    // else if(req.body.status.toLowerCase()==='received' && req.session.role == 'cityexpoter'){
    //         statuss = 'InCity'
    // }
    // else if(req.body.status.toLowerCase()==='dispatch' && req.session.role == 'cityexpoter'){
    //         statuss = 'OutForDelivery'
    // }
    // else{
    //     res.status(403).json({message: 'Product status updation failed'})
    //     return;
    // }
    const ob = {
        order_id: req.body.id,
        status: 'recived',
        expoter_id: req.session.userid
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