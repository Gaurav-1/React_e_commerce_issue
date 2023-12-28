import { useState } from "react"
import {path} from "../../../constants/global"
import { message } from "antd"

import style from "./style.module.css"

export default function () {

    const [name,setName] = useState("")
    const [description,setDescription] = useState("")
    const [price,setPrice] = useState("")
    const [quantity,setQuantity] = useState("")
    const [productImage,setProductImage] = useState(null)

    function addProduct(){

        const form_data = new FormData();
        form_data.append('name',name);
        form_data.append('description',description);
        form_data.append('price',price);
        form_data.append('quantity',quantity);
        form_data.append('productImage',productImage);
        
        fetch(`${path}/seller/add_product`,{
            method: 'POST',
            credentials: 'include',
            body: form_data
        })
        .then(res=>res.json())
        .then(res=>message.info(res.message))
        .catch(err=>{
            message.error('An Error occured')
            console.log(err)
        })
    }
    return (
        <div className={style.container} >
            <h1>Add Product</h1>
            <div className={style.sub_container}>
                <div className={style.fields}>
                    <label>Product Name</label>
                    <label>Product Description</label>
                    <label>Product Price</label>
                    <label>Product Quantity</label>
                    <label>Product Image</label>
                </div>
                <div className={style.sub_container}>
                    <div className={style.fields}>
                        <input type="text" onChange={(e)=>setName(e.target.value)} />
                        <input type="text" onChange={(e)=>setDescription(e.target.value)}/>
                        <input type="number" onChange={(e)=>setPrice(e.target.value)} />
                        <input type="number" onChange={(e)=>setQuantity(e.target.value)}/>
                        <input type="file" onChange={(e)=>setProductImage(e.target.files[0])} />
                    </div>
                </div>
            </div>
            <div>
                <button id={style.add_productBtn} onClick={()=>addProduct()}>Add Product</button>
            </div>
        </div>
    )
}