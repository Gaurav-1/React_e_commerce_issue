import React from "react";
import style from "./style.module.css"
import UserAuthContext from "../../../context/userAuthContext";


export default function CartBill({showBuyNow}){
    const {cartBill} = React.useContext(UserAuthContext)
    return(
        <div className={style.container}>
            <div className={style.heading}>
                <h3>Price Summary</h3>
            </div>
            <div className={style.amount_container}>
                <div className={style.labels}>
                    <p>Total MRP</p>
                    <p>Discount</p>
                    <h3>Subtotal</h3>
                </div>
                <div className={style.amounts}>
                    <p>$ {cartBill.totalMRP}</p>
                    <p>-$ {cartBill.discount}</p>
                    <p>$ {cartBill.subTotal}</p>
                </div>
            </div>
            <div className={style.total_container}>
                <div className={style.total}>
                    <p>Total</p>
                    <p>$ {cartBill.total}</p>
                </div>
                <div className={style.btn}>
                    <button type="button" onClick={()=>showBuyNow()}>Buy Now</button>
                </div>
            </div>
        </div>
    )
}