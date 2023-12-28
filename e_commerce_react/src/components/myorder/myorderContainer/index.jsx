import { Navigate } from "react-router-dom"
import React, { useEffect, useState } from "react"

import style from "./style.module.css"
import MyorderProductCard from "../myorderProuctCard"
import { path } from "../../../constants/global"
import UserAuthContext from "../../../context/userAuthContext"
import TrackOrder from "../trackOrder"
import CancelOrder from "../cancelOrder"

export default function myorder() {

    const [myOrders, setMyOrders] = useState([]);
    const [isTrackMyOrder, setIsTrackMyOrder] = useState(false);
    const [trackOrderContent, setTrackOrderConent] = useState([]);
    const [isCancelOrder, setIsCancelOrder] = useState(false);
    const [cancelOrderContent, setCancelOrderConent] = useState("");

    const { user } = React.useContext(UserAuthContext)

    function loadOrders() {
        if(!user.isLoggedin) return;
        
        fetch(`${path}/product/my_order`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                "content-type": "application/json"
            },
        })
            .then((res) => res.json())
            .then(res => {
                if (res.message) {
                    alert(res.message)
                }
                else {
                    setMyOrders(res.orders)
                }
            })
            .catch((err) => {
                alert(err.message)
            });
    }

    function openTrackMyOrder(id) {
        myOrders.map(val => { (val.order_id == id) ? setTrackOrderConent(val) : null })
        setIsTrackMyOrder(true)
    }

    function closeTrackMyOrder() {
        setIsTrackMyOrder([])
        setIsTrackMyOrder(false)
    }

    function openCancelOrder(id) {
        myOrders.map(val=>{ (val.order_id == id) ? setCancelOrderConent(val.order_id) : null })
        setIsCancelOrder(true)
    }

    function closeCancelOrder() {
        setIsCancelOrder(false)
    }

    useEffect(() => { loadOrders() }, [])

    return (
        (!user.isLoggedin) ? <Navigate to='/signin' /> : (
            <>
                <div className={style.container}>
                    <div className={style.products}>
                        <div>
                            <h2>My Orders</h2>
                        </div>
                        {myOrders.map(val => <MyorderProductCard props={val} openTrackMyOrder={openTrackMyOrder} openCancelOrder={openCancelOrder} />)}
                    </div>
                </div>
                    {(isTrackMyOrder) ? <TrackOrder props={trackOrderContent} closeTrackMyOrder={closeTrackMyOrder} /> : null}

                    {(isCancelOrder) ? <CancelOrder props={cancelOrderContent} closeCancelOrder={closeCancelOrder} /> : null}

            </>
        )
    )
}