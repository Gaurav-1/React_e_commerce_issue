import REACT from 'react';
import { path } from '../../constants/global';

import style from "./style.module.css"


export default function Product({props, showPopUp, AddToCart}){

    return(
        <>
            <div className={style.img_div}>
                <img alt="Product Image" src={props.image}/>
            </div>
            <div className={style.details}>
                <h3>{props.name}</h3>
                <label>$ {props.price}</label>
            </div>
            <div className={style.btn_div}>
                <button type="button" id={props.product_id} className={style.add_to_cart} onClick={(e)=>AddToCart(e.target.id)}>Add To Cart</button>
                <button type="button" id={props.product_id} className={style.view_product} onClick={(e)=>showPopUp(e.target.id)}>View Product</button>
            </div>
        </>
    )

}