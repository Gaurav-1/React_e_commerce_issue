import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import UserAuthContext from "../../context/userAuthContext"
import { notification } from "antd"

import style from "./style.module.css";
import { path } from "../../constants/global"
export default function ChangePassword() {

    const [mail, setMail] = useState("");

    async function ForgetPassword() {
        if (mail.trim() == "") {
            alert("Password must be atleast 8 character long")
            return;
        }

        fetch(`${path}/user/forget_password`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ mail }),
        })
        .then(res => {
            let msg=null;
            if(res.ok)
                    msg='Link has been send please check your mail'
            else if(res.status==304)
                    msg='mail not found'

            notification.info({
                placement: 'topRight',        
                bottom: 50,
                duration: 3,
                rtl: true,
                message: msg || 'An error occured',
            });
        })
        .catch((err) => {
            console.log(err);
        });
    }


    return (

        <div className={style.container}>
            <div className={style.card}>
                <div className={style.top}>
                    <h2>Forget Password?</h2>
                </div>
                <div className={style.middle}>
                    <div className={style.labels}>
                        <label htmlFor='email'>Email</label>
                        <input type="email" name="email" placeholder="Email" onChange={(e) => setMail(e.target.value)} />
                    </div>
                </div>
                <div className={style.bottom}>
                    <button type="button" className={style.sendLinkBtn} onClick={(e) => ForgetPassword()} >Send Link</button>
                </div>
            </div>
        </div>
    )
}