import { useEffect, useState } from "react";
import React from "react";
import {path} from '../../constants/global';
import UserAuthContext from "../../context/userAuthContext";
import {message} from "antd"

import style from "./style.module.css";

import Card from "../productCard";
import Product from "../product";
import PopUp from "../popUp";

export default function Home() {
    const [allProducts, setProducts] = useState([]);
    const [errorMsg, setError] = useState('');
    const [pages,setPages] = useState(0);
    const [isLoading,setIsLoading] = useState(false);
    const [isshowPopUp,setIsShowPopUp] = useState(false);
    const [popUpContent, setPopUpContent]  = useState([]);
    const { user, setUser } = React.useContext(UserAuthContext)

    function LoadProduts() {

        setIsLoading(true)

        fetch(`${path}/product/get_products?pages=${pages}`, {
            method: "GET",
            credentials: "include",
            headers: {
                "content-type": "application/json",
            },
        })
        .then((res) => res.json())
        .then((res) => {
            if(res.message){
                setError(res.message)
            }
            else{
                setProducts(prevProducts=>[...prevProducts,...res])
                setPages(prevPages=>prevPages+1)
            }
            
        })
        .catch((err) => {
            console.log(err);
        });
        setIsLoading(false)
    }

    function AddToCart(e){
        
        if(!user.isLoggedin){
            alert("Please login first");
            return;
        }
        
        fetch(`${path}/product/add_cart`,{
            method: 'POST',
            credentials: 'include',
            headers:{
                'content-type':'application/json'
            },
            body: JSON.stringify({id: e})
        })
        .then((res) =>res.json())
        .then(res=>{
            message.success(res.message)
        })
        .catch((err) => {
            console.log(err);
        });
    }

    const handleScroll = ()=>{
        if(window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isLoading)
        return
        LoadProduts()
    }

    function showPopUp(id){
        allProducts.filter(val =>{(val.product_id==id)? setPopUpContent(val) : null })
        setIsShowPopUp(true)
    }
    
    function closePopUp(){
        setIsShowPopUp(false)
    }


    useEffect(()=>{ LoadProduts() },[])
    
    const val = useEffect(() => {   
        window.addEventListener('scroll',handleScroll)
        return ()=> window.removeEventListener('scroll',handleScroll)
    }, [isLoading, pages])

    return (
        <>
            <div className={style.container}>
                {allProducts.map(val=><Card props = {val} showPopUp={showPopUp} AddToCart={AddToCart} />)}
            </div>
            <div className={style.msg}>
                <h4>{errorMsg}</h4>
            </div>
            <div>
                {(isshowPopUp) ? <PopUp props={popUpContent} closePopUp={closePopUp} AddToCart={AddToCart} /> : null}
            </div>
        </>
    );
}
