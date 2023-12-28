import style from "./style.module.css"

import Product from "../product"

export default function Card({props, AddToCart, showPopUp}){
    return(
        <div className={style.card} key={props.product_id} >
            <Product props = {props} AddToCart={AddToCart} showPopUp = {showPopUp} />
        </div>
    )
}