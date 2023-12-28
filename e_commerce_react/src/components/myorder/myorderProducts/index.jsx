import style from "./style.module.css"


export default function MyorderProduct({ props, openTrackMyOrder, openCancelOrder }) {
    return (
        <>
            <div className={style.img_div}>
                <img alt="Product Image" src={props.image} />
            </div>
            <div className={style.details_container}>
                <div className={style.details}>
                    <div className={style.product_details}>
                        <h3>{props.name}</h3>
                        <label>$ {props.order_bill}</label>
                    </div>
                    <div className={style.order_details}>
                        <h4>Order ID: <span>{props.order_id}</span></h4>
                        <p>Quantity:<span> {props.order_quantity}</span></p>
                        <p>Order Date:<span> {props.order_date}</span></p>
                        <p>Expected Delivery Date:<span> {props.delivery_date}</span></p>
                    </div>
                </div>
                <div className={style.btn_div}>
                    {(props.order_status!="cancel" && props.order_status!="recived") ? <button type="button" className={style.cancel} onClick={(e)=>openCancelOrder(props.order_id)}>Cancel</button> : <></> }
                    {(props.order_status!="cancel" && props.order_status!="recived") ? <button type="button" className={style.track_order} onClick={(e)=>{openTrackMyOrder(props.order_id)}}>Track Order</button> : <></>}
                </div>
            </div>
        </>
    )
}