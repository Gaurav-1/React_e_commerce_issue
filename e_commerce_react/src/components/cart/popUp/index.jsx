import style from "./style.module.css"

export default function PopUp({props,closePopUp, AddToCart}){
    return(
        <div className={style.popup} key={props.product_id}>
            <span className={style.closePopUp} onClick={()=>closePopUp()}>&times;</span>
            <div className={style.img_div}>
                <img src={props.image} alt="Product image"/>
            </div>
            <div className={style.right}>
                <div className={style.details}>
                    <h1>{props.name}</h1>
                    <h3>$ {props.price}</h3>
                    <p>{props.description}</p>
                </div>
            </div>
        </div>
    )
}