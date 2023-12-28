import React,{ useEffect, useState } from 'react';
import {path} from '../../../constants/global'
import UserAuthContext from '../../../context/userAuthContext';

import style from "./style.module.css";

export default function CartProduct({ props }) {
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
      setQuanity(res.quantity)
      setPrice(props.bill)
    })
    .catch((err) => console.log(err) );
  }

  function removeProduct(id){
    fetch(`${path}/product/delete`,{
      method: 'POST',
      credentials: 'include',
      headers:{
        'content-type': 'application/json'
      },
      body: JSON.stringify({id})
    })
    .then((res) =>res.json())
    .then((res)=>{
      if(res.message === 'deleted'){
        alert('Product removed from the cart')
        return;
      }
      alert(res.message)
    })
    .catch((err) => console.log(err) );
  }


  return (
    <>
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
          <button type="button" id={props.product_id} className={style.remove} onClick={(e)=>removeProduct(e.target.id)}>Remove</button>
          <button type="button" className={style.view_product}>View Product</button>
        </div>
      </div>
    </>
  );
}
