const express = require('express');
const path = require('path');

function usertb(req,res){
    const qry = `CREATE TABLE user(
                    user_id varchar(50),
                    name varchar(50),
                    mail varchar(50),
                    password varchar(15),
                    isVerified boolean,
                    role varchar(5),
                    PRIMARY KEY (user_id));`;
    conn.query(qry,(err,result)=>{
        if(err)
            res.send(err)
        else
            res.send(result)
    })
}

function producttb(req,res){
    const qry = `CREATE TABLE product(
                    product_id varchar(50),
                    seller_id varchar(50),
                    name varchar(50),
                    description varchar(255),
                    price integer,
                    quantity integer,
                    image varchar(255),
                    PRIMARY KEY (product_id));`;
                    
    conn.query(qry,(err,result)=>{
        if(err)
            res.send(err)
        else
            res.send(result)
    })
}

function carttb(req,res){
    const qry = `CREATE TABLE cart(
                    cart_id varchar(50),
                    user_id varchar(50),
                    product_id varchar(50),
                    quantity varchar(15),
                    bill int,
                    PRIMARY KEY (cart_id));`;
    conn.query(qry,(err,result)=>{
        if(err)
            res.send(err)
        else
            res.send(result)
    })
}

function billingtb(req,res){
    const qry = `CREATE TABLE billing(
                    billing_id varchar(50),
                    user_id varchar(50),
                    product_ids varchar(255),
                    total int,
                    PRIMARY KEY (cart_id));`;
    conn.query(qry,(err,result)=>{
        if(err)
            res.send(err)
        else
            res.send(result)
    })
}

function sellertb(req,res){
    const qry = `CREATE TABLE seller(
                    seller_id varchar(50) PRIMARY KEY,
                    business_name varchar(50),
                    business_address varchar(150),
                    store_image varchar(150),
                    profile_image varchar(150),
                    gst_number varchar(50),
                    aadhar_id varchar(50),
                    aadhar_image varchar(150),
                    pan_id varchar(50),
                    pan_image varchar(150),
                    FOREIGN KEY (seller_id) REFERENCES user(user_id));`
}


module.exports = {
    usertb,
    producttb,
    carttb,
    billingtb,
    sellertb,
}