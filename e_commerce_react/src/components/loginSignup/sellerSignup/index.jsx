import { Link } from "react-router-dom";
import style from "./style.module.css";
import { useState } from "react";

export default function () {

    const [name, setName] = useState("")
    const [mail, setMail] = useState("")
    const [number, setNumber] = useState(0)
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [businessName, setBusinessName] = useState("")
    const [businessAddress, setBusinessAddress] = useState("")
    const [storeImage, setStoreImage] = useState("")
    const [profileImage, setProfileImage] = useState("")
    const [gstNumber, setGstNuber] = useState("")
    const [aadharId, setAadharId] = useState("")
    const [addharImage, setAadharImage] = useState("")
    const [panId, setPanId] = useState("")
    const [panImage, setAadhPanImage] = useState("")

    return (
        <div className={style.container}>
            <h1 className={style.center}>Seller Signup</h1>
            <form className={style.signup_form}>
                <div className={style.sections}>
                    <label className={style.fields} htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" placeholder="Username" oninput="dis_user()" />
                    <label id="UsrErr" class="err"></label>

                    <label className={style.fields} htmlFor="usermail">Mail</label>
                    <input type="text" id="usermail" name="usermail" placeholder="example@example.com" oninput="mail()" />
                    <label id="MailErr" class="err"></label>

                    <label className={style.fields} htmlFor="usercontact">Contact Numer</label>
                    <input type="number" id="usercontact" name="usercontact" placeholder="0123456789" oninput="mail()" />
                    <label id="ContactErr" class="err"></label>

                    <label className={style.fields} htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" placeholder="********" oninput="pass()" />
                    <label id="PassErr" class="err"></label>

                    <label className={style.fields} htmlFor="confirm_password">Confirm Password</label>
                    <input type="password" id="confirm_password" name="confirm_password" placeholder="********" oninput="confpass()" />
                    <label id="CPassErr" class="err"></label>
                </div>
                <div className={style.sections}>
                    <label className={style.fields} >Business Name</label>
                    <input type="text" name="business_name" id="business_name" />
                    <label id="BNameErr" class="err"></label>

                    <label className={style.fields} >Business Address</label>
                    <input type="text" name="business_address" id="business_address" />
                    <label id="BAddressErr" class="err"></label>

                    <label className={style.fields} htmlFor="">Store Image</label>
                    <input type="file" name="store_image" id="store_image" />
                    <label id="StoreIErr" class="err"></label>

                    <label className={style.fields} htmlFor="">Profile Image</label>
                    <input type="file" name="profile_image" id="profile_image" />
                    <label id="ProfileIErr" class="err"></label>
                </div>
                <div className={style.sections}>
                    <label className={style.fields} htmlFor="">GST number</label>
                    <input type="text" name="gst_number" id="" />
                    <label id="GstErr" class="err"></label>

                    <label className={style.fields} htmlFor="">Aadhar ID</label>
                    <input type="number" name="aadhar_id" id="aadhar_id" />
                    <label id="AadharErr" class="err"></label>

                    <label className={style.fields} htmlFor="">Aadhar Image</label>
                    <input type="file" name="aadhar_image" id="aadhar_image" />
                    <label id="AadharIErr" class="err"></label>

                    <label className={style.fields} htmlFor="">Pan ID</label>
                    <input type="text" name="pan_id" id="pan_id" />
                    <label id="PanErr" class="err"></label>

                    <label className={style.fields} htmlFor="">Pan Image</label>
                    <input type="file" name="pan_image" id="pan_image" />
                    <label id="PanIErr" class="err"></label>

                </div>
            </form>
            <div className={style.center}>
                <button type="submit" className={style.signupBtn}>Sign up</button>
            </div>
            <p>Already have account goto <Link to="/signin">Login</Link></p>
        </div>
    )
}