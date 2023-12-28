import {useState} from "react"
import {message} from "antd"
import { path } from "../../../constants/global";

import style from "./style.module.css"

export default function(){

    const [user_name,setName] = useState("");
    const [contact_no,setContact] = useState("");
    const [house_no,setHouseNo] = useState("");
    const [city,setCity] = useState("");
    const [state,setState] = useState("");
    const [landmark,setLandmark] = useState("");
    const [payment_option,setPaymentMode] = useState("");


    function placeOrder(){
        fetch(`${path}/product/order`,{
            method: 'POST',
            credentials: 'include',
            headers:{
                'content-type':'application/json'
            },
            body: JSON.stringify({user_name,contact_no,house_no,city,state,landmark,payment_option})
        })
        .then(res=>{
            if(res.ok)
                message.success('Order Placed')
            else{
                res = res.json()
                message.error(res.message)
            }
        })
        .catch(err=>{
            alert('An error occured see console for more');
            console.log(err);
        })
    }

    return(
        <div className={style.place_order}>
            <div className={style.heading}>
                <h4>Order Address</h4>
            </div>
            <div className={style.details}>
                <input type="text" placeholder="Reciver's Name" onChange={(e)=>setName(e.target.value)} />
                <input type="text" placeholder="Contact Number" onChange={(e)=>setContact(e.target.value)} />
                <input type="text" placeholder="House Number" onChange={(e)=>setHouseNo(e.target.value)} />
                <input type="text" placeholder="City" onChange={(e)=>setCity(e.target.value)} />
                <input type="text" placeholder="State" onChange={(e)=>setState(e.target.value)} />
                <input type="text" placeholder="Landmark (optional)" onChange={(e)=>setLandmark(e.target.value)} />
                <select name="payment_option" id="payment_option" onInput={(e)=>setPaymentMode(e.target.value)} >
                    <option value="" selected hidden disabled>Payment Mode</option>
                    <option value="cash_on_delivery">C.O.D</option>
                </select>
            </div>
            <div className={style.btn}>
                <button onClick={()=>placeOrder()}>Order Now</button>
            </div>
        </div>
    )
}