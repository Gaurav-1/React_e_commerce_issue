import React, { useEffect, useState } from 'react';
import UserAuthContext from '../context/userAuthContext';

export default function UserAuthState(props){
    const [user,setUser] = React.useState({
        isLoggedin: (sessionStorage.getItem('user')) ? true : false ,
        userRole: (sessionStorage.getItem('user')) ? JSON.parse(sessionStorage.getItem('user')).userRole : 'guest',
        userName: (sessionStorage.getItem('user')) ? JSON.parse(sessionStorage.getItem('user')).userName : 'Guest'
    })

    useEffect(() => {
        console.log('User Updated', user);
    }, [user]);

    const [cartBill, setCartBill] = React.useState({
        totalMRP: 0,
        discount: 0,
        subTotal: 0,
        total: 0,
    })
    return(
        <UserAuthContext.Provider value={{user,setUser,cartBill,setCartBill}}>
            {
                props.children
            }
        </UserAuthContext.Provider>
    )
}