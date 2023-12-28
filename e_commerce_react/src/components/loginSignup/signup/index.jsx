import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";

import style from "./style.module.css";
import person from '../../../assets/signup_person2.png';
import { path } from "../../../constants/global"

export default function Signin() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signuped, setSignuped] = useState(false);
  const [url, setUrl] = useState('');
  const [msg, setMsg] = useState('');

  function signup() {
    if (name.trim() == "") { alert("Name is required"); return; }
    else if (email.trim() == "") { alert("Email is required"); return; }
    else if (password !== confirmPassword || password.trim() == "") {
      alert("Password doesn't matched");
      return;
    }
    fetch(`${path}/user/signup`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ name: name, email: email, password: password }),
    })
      .then((res) => res.json())
      .then(res => {
        setUrl("/signin")
        setSignuped(true);
        setMsg(res.message)
      })
      .catch((err) => {
        alert(err.message)
      });
  }

  return (
    (signuped) ? <> {alert(msg)} <Navigate to={url} /> </> : (
      <div className={style.container}>
        <img src={person} alt="signup_person" className={style.person} />
        <div className={style.card}>
          <div className={style.top}>
            <h2>Sign Up</h2>
          </div>
          <div className={style.middle}>
            <div className={style.labels}>
              <label>Name</label>
              <input type="text" name="username" placeholder="Name" onChange={(e) => setName(e.target.value)} />
            </div>

            <div className={style.labels}>
              <label>Email</label>
              <input type="email" name="useremail" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className={style.labels}>
              <label>Password</label>
              <input type="password" name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            </div>

            <div className={style.labels}>
              <label>Confirm Password</label>
              <input type="password" name="password" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>
          </div>

          <div className={style.bottom}>
            <button type="button" className={style.signinBtn} onClick={(e) => signup()}>Sign Up</button>
            <p>Already have account? <Link to="/signin" >Sign in</Link></p>
          </div>
        </div>
      </div>
    )
  );
}
