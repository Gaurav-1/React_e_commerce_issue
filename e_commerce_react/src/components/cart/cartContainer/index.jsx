import { useEffect, useState } from "react";
import React from "react";
import {path} from '../../../constants/global';
import UserAuthContext from "../../../context/userAuthContext";
import {message} from "antd"

import style from "./style.module.css"
import CartProductCard from "../cartProductCard"
import PopUp from "../popUp"
import CartBill from "../cartBill"
import BuyNow from "../buyNow";

export default function Cart(){

    const { cartBill, setCartBill } = React.useContext(UserAuthContext)

    const [cartProducts,setCartProducts] = useState([])
    const [errorMsg, setErrorMsg] = useState('')
    const [isshowPopUp,setIsShowPopUp] = useState(false)
    const [popUpContent, setPopUpContent]  = useState([])
    const [buyNow, setBuyNow] = useState(false)

    function LoadCart(){
        let sums = 0;
        fetch(`${path}/product/cart`,{
            method: 'GET',
            credentials: 'include',
            headers:{
                'content-type': 'application/json'
            } 
        })
        .then((res) => res.json())
        .then((res) => {
            console.log(res);
            if(res.message)
                setErrorMsg(res.message)
            else{
                res.map(ele => sums += ele.bill);
                const billObj = {
                    totalMRP: sums,
                    discount: 0,
                    subTotal: sums,
                    total: sums,
                }
                setCartBill(billObj)
                setCartProducts(res)
            }
        })
        .catch((err) => {
            console.log(err);
        });
    }

    useEffect(()=>{LoadCart()},[])

    function removeProduct(id,price){
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
            message.success('product removed');
            setCartProducts(cartProducts.filter(item=> item.product_id != id))
            const cartBillObj = {
                totalMRP: cartBill.totalMRP-price,
                discount: 0,
                subTotal: cartBill.subTotal-price,
                total: cartBill.total-price,
            }
            setCartBill(cartBillObj)
            return;
          }
    
          alert(res.message)
        })
        .catch((err) => console.log(err) );
    }

    function showPopUp(id){
        cartProducts.filter(val =>{(val.product_id==id)? setPopUpContent(val) : null })
        setIsShowPopUp(true)
    }
    
    function closePopUp(){
        setIsShowPopUp(false)
    }

    function showBuyNow(){
        setBuyNow(true)
    }
    function closeBuyNow(){
        setBuyNow(false)
    }

    if(cartProducts.length<1){
        return (
            <div className={style.errorMsg}>
                <h1>{errorMsg}</h1>
            </div>
        )
    }
    else
    return(
        <div className={style.container}>
            <div className={style.products}>
                <div>
                    <h2>Shopping Cart</h2>
                </div>
                { cartProducts.map(item=><CartProductCard props={item} removeProduct = {removeProduct} showPopUp={showPopUp} key={item.product_id}/>)}
                
            </div>
            <div>
                {(isshowPopUp) ? <PopUp props={popUpContent} closePopUp={closePopUp} /> : null}
            </div>
            <div className={style.left}>
                <CartBill showBuyNow={showBuyNow} />
                {buyNow ? <BuyNow /> : null}
            </div>
        </div>
    )
}