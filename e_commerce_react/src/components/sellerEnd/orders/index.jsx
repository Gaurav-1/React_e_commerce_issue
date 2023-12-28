import { useState } from "react";
import { message } from "antd";
import { path } from "../../../constants/global";

import OrdersCard from "./ordersCard";
import style from "./style.module.css"

export default function () {

    const [allOrders, setAllOrders] = useState([])
    const [type, setType] = useState("waiting")

    function orders() {
        fetch(`${path}/seller/orders`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ type })
        })
            .then(res => {
                return res.json();
            })
            .then(res => {
                if (res.message) {
                    message.info(res.message)
                }
                setAllOrders(res.orders||[])
            })
            .catch(err => {
                message.error("Something went wrong");
                console.log(err);
            })
    }

    return (
        <div id="sub_main">
            <div id="operation">
                <select name="orderStatus" id="orderStatus" onInput={(e)=>setType(e.target.value)}>
                    <option value="waiting">Waiting</option>
                    <option value="approve">Approved</option>
                    <option value="dispatch">Dispatched</option>
                    <option value="recived">Recived</option>
                    <option value="cancel">Canceled</option>
                </select>
                <button type="button" id="search" onClick={()=>orders()}>GO</button>
            </div>

            <div id="orders">
                {allOrders.map((val)=><OrdersCard props={val} />)}
            </div>
        </div>
    )
}