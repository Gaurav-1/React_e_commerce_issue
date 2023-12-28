import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import UserAuthContext from "../../context/userAuthContext"
import {message} from "antd"

import style from "./style.module.css";
import { path } from "../../constants/global"
export default function ChangePassword() {


    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const { user, setUser } = React.useContext(UserAuthContext)


    async function ChangePassword() {
        if (password.trim() == "" || password.length<8) {
            alert("Password must be atleast 8 character long")
            return;
        }
        if(password !== confirmPassword){
            alert("Password and Confirm Password doesn't matched")
            return;
        }

        fetch(`${path}/user/change_password`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ password }),
        })
        .then(res => {
            if(res.ok)
                message.success("Password Updated")
            else if(res.status==304)
                    message.warning("Failed to update password")
        })
        .catch((err) => {
            console.log(err);
            message.error(err);
        });
    }

    return (

        <div className={style.container}>
            <div className={style.card}>
                <div className={style.top}>
                    <h2>Change Password</h2>
                </div>
                <div className={style.middle}>
                    <div className={style.labels}>
                        <label htmlFor='password'>Password</label>
                        <input type="password" name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className={style.labels}>
                        <label htmlFor='confirmPassword'>Confirm Password</label>
                        <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} />
                    </div>
                </div>
                <div className={style.bottom}>
                    <button type="button" className={style.signinBtn} onClick={(e) => ChangePassword()} >Change Password</button>
                </div>
            </div>
        </div>
    )
}