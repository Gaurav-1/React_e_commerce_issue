import React from "react"
import { Link } from "react-router-dom"
import UserAuthContext from "../../context/userAuthContext"

import style from './style.module.css'

export default function Header() {
    const { user } = React.useContext(UserAuthContext)

    return (
        <div className={style.header}>
            <div className={style.nav}>
                <div className={style.logo}>
                    <h2>Paridhana</h2>
                </div>
                <div className={style.links}>
                    <ul className={style.nav_list}>
                        {(user.userRole === 'guest' || user.userRole === 'user') ? (<>
                            <li className={style.nav_items}><Link to="/" >Home</Link></li>
                        </>
                        ) : <></>}

                        {(!user.isLoggedin) ? <li className={style.nav_items} ><Link to="/becomeSeller">Become Seller</Link> </li> : <></>}
                        {
                            (user.userRole == 'user') ? (
                                <>
                                    <li className={style.nav_items} ><Link to="/cart" >Cart</Link></li>
                                    <li className={style.nav_items} ><Link to="/myorder" >My Order</Link></li>
                                    <li className={style.nav_items} ><Link to="/changePassword" >Change Password</Link> </li>
                                </>
                            ) : <></>
                        }

                        {
                            (user.userRole === 'seller') ? (
                                <>
                                    <li className={style.nav_items} ><Link to="/seller" >Dashboard</Link></li>
                                    <li className={style.nav_items} ><Link to="/addProducts" >Add Products</Link></li>
                                    <li className={style.nav_items} ><Link to="/orders" >Orders</Link></li>
                                    <li className={style.nav_items} ><Link to="" >Report</Link> </li>
                                </>
                            ) : <></>
                        }

                        {
                            (user.userRole === "admin") ? (
                                <>
                                    <li className={style.nav_items} ><Link to="" >Approve Seller</Link></li>
                                    <li className={style.nav_items} ><Link to="" >Approve Product</Link> </li>
                                    <li className={style.nav_items} ><Link to="" >Add Transpoter</Link></li>
                                </>
                            ) : <></>
                        }


                        <li className={style.nav_items} ><span id={style.userName}>{user.userName}</span>{(user.isLoggedin) ? <Link to="/signout" >, Sign out</Link> : <Link to="/signin" >, Sign in</Link>}</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}