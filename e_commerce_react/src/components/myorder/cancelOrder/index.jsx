import React, {useState} from "react"

import style from "./style.module.css"
import { path } from "../../../constants/global"


export default function PopUp({ props, closeCancelOrder }) {
    
    const [cancelReason,setCancelReason] = useState("");

    function cancelMyOrder(id){
        fetch(`${path}/product/cancel_my_order`,{
            method: 'POST',
            credentials: 'include',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({id,reason: cancelReason})
        })
        .then((res) => res.json())
        .then(res=>{
            alert(res.message)
        })
        .catch((err) => {
            
        });
    }

    return (
        <div className={style.blur_bg}>
            <div className={style.popup}>
                <span className={style.closePopUp} onClick={() => closeCancelOrder()}>&times;</span>
                <div className={style.heading}>
                    <h1>Cancel of Sure?</h1>
                </div>
                <div className={style.cancel_form}>
                    <select className={style.cancel_type} >
                        <option value="" selected disabled hidden>Cancel Type</option>
                        <option value="damage product">Damaged Product</option>
                        <option value="wrong size">Wrong Size</option>
                        <option value="does not want anymore">Doesn't want anymore</option>
                    </select>
                    <textarea placeholder="Cancel Reason" className={style.cancel_reason} onChange={(e)=>setCancelReason(e.target.value)} />
                </div>
                <div className={style.operation}>
                    <button className={style.cancelBtn} onClick={(e)=>cancelMyOrder(props)}>Cancel</button>
                </div>
            </div>
        </div>
    )
}