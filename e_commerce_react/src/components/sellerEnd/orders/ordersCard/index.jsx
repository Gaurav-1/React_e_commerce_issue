import { useState } from "react"
import { path } from "../../../../constants/global"

import style from "./style.module.css"
import { message } from "antd"

export default function ({props}) {

    const [something, setit] = useState("")

    function approveOrder(){
        fetch(`${path}/seller/approve_order`,{
            method: 'POST',
            credentials: 'include',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify(ob)
        })
        .then(res=>{
            if(res.ok){}
                // document.getElementById('M'+this.id).remove();
            return res.json();
        })
        .then(res=>{
            message.info(res.message)
        })
        .catch(err=>{
            console.log(err);
            message.error('An Error Occured check console')
        })
    }

    return (
        <div className={style.card}>
            <div>
                <img src={props.image} alt={props.name} class='thumbnail' />
            </div>
            <div class='product_details'>
                <h2>Product Details</h2>
                <p>ID: <span>{props.product_id}</span></p>
                <p class='product-name'>Name: <span>{props.name}</span></p>
                <p>Description: <span>{props.description}</span></p>
                <p>Ordered Quantity: <span>{props.order_quantity}</span></p>
            </div>
            <div class='order_details'>
                <h2>Order Details</h2>
                <p>ID: <span>{props.order_id}</span></p>
                <p>Date: <span>{new Date(props.order_date).toUTCString()}</span></p>
                <p>Shipping Address: <span>{props.shipping_address}</span></p>
                <p>Landmark: <span>{props.landmark}</span></p>
                <p>Order Bill: <span>$ {props.order_bill}</span></p>
            </div>
            <div class='payment_details'>
                <h2>Payment Details</h2>
                <p>Mode: <span>{props.payment_mode}</span></p>
                <p>Status: <span>{props.payment_status}</span></p>
                <p>1 - paid  ||  0 - Unpaid</p>
            </div>
        </div>
    )
}