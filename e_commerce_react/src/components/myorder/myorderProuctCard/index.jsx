import style from "./style.module.css"

import MyorderProduct from "../myorderProducts"

export default function MyorderProductCard({ props, openTrackMyOrder, openCancelOrder }) {
    return (
        <div className={style.card} key={props.order_id}>
            <MyorderProduct props={props} openTrackMyOrder={openTrackMyOrder} openCancelOrder={openCancelOrder}/>
        </div>
    )
}