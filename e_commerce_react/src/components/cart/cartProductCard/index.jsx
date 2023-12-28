import React,{ useEffect, useState } from 'react';
import {path} from '../../../constants/global'
import UserAuthContext from '../../../context/userAuthContext';
import style from "./style.module.css"

// import CartProduct from "../cartProduct"

export default function CardProductCard({props,removeProduct,showPopUp}){
    const {cartBill, setCartBill} = React.useContext(UserAuthContext);
    const [quantity,setQuanity] = useState(props.quantity)
    const [price,setPrice] = useState(props.bill)
  
    function updateQuantity(id,op){
      fetch(`${path}/product/update_quantity`,{
        method: 'POST',
        credentials: 'include',
        headers:{
          'content-type': 'application/json'
        },
        body: JSON.stringify({id,op})
      })
      .then((res) =>res.json())
      .then(res=>{
        // console.log('Res',res,'Price',price,'Quant',quantity,'cart',cartBill);
        const cartBillObj = {
            totalMRP: cartBill.totalMRP+res.price-price,
            discount: 0,
            subTotal: cartBill.subTotal+res.price-price,
            total: cartBill.total+res.price-price,
        }
        setCartBill(cartBillObj)
        setQuanity(res.quantity)
        setPrice(res.price)
        if(res.message!='updated')
          alert(res.message)
      })
      .catch((err) => console.log(err) );
    }
  
  
  
    return(
        <div className={style.card}>
            <div className={style.img_div}>
                <img alt="Product Image" src={props.image} />
            </div>
            <div className={style.details_container}>
                <div className={style.details}>
                <h3>{props.name}</h3>
                <label>$ {price}</label>
                </div>
                <div className={style.quant_container}>
                <button type="button" id={props.product_id} className={style.quant_btn} onClick={(e)=>updateQuantity(e.target.id,'-')} >-</button>
                <label type="text" name="qunatity" id={'Q'+props.product_id} className={style.quantity}>{quantity}</label>
                <button type="button" id={props.product_id} className={style.quant_btn} onClick={(e)=>updateQuantity(e.target.id,'+')} >+</button>
                </div>
                <div className={style.btn_div}>
                <button type="button" id={props.product_id} className={style.remove} onClick={()=>removeProduct(props.product_id,price)}>Remove</button>
                <button type="button" className={style.view_product} onClick={()=>showPopUp(props.product_id)}>View Product</button>
                </div>
            </div>
        </div>
    )
}