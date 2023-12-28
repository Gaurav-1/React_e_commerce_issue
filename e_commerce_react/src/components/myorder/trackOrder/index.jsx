import style from "./style.module.css"

export default function PopUp({ props, closeTrackMyOrder }) {
    console.log(props);
    return (
        <div className={style.blur_bg}>
            <div className={style.popup} key={props.product_id}>
                <span className={style.closePopUp} onClick={() => closeTrackMyOrder()}>&times;</span>
                <div className={style.img_div}>
                    <img src={props.image} alt="Product image" />
                </div>
                <div className={style.right}>
                    <div className={style.details}>
                        <h1>{props.order_status}</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}