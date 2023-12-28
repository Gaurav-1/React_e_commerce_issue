import { useState } from "react"

import style from "./style.module.css"

export default function ({ props }) {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [quantity, setQuantity] = useState("")

    function update_product(id) {

        const update_product = {
            id,
            name,
            description,
            price,
            quantity,
        }

        fetch('/seller/update_product', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(update_product)
        })
            .then(res => {
                return res.json();
            })
            .then(res => {
                setId(res.product_id)
            })
            .catch(err => {
                alert(err);
            })
    }

    function delete_product(id) {
        fetch('/seller/delete', {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        })
            .then(res => res.json())
            .then(res => {
                alert(res.message)
                if (res.message === 'Sucessfully deleted') console.log("please remove the element");
                //remove that element
            })
            .catch(err => {
                alert('An error occured\n view console for more');
                console.log(err);
            })
    }

    return (
        <div className={style.card}>
            <img src={props.image} className={style.thumbnail} />
            <div className={style.details}>
                <div className={style.labels} >
                    <label>Name</label>
                    <label>Description</label>
                    <label>Price</label>
                    <label>Quantity</label>
                </div>
                <div className={style.inputs} >
                    <input type='text' className={style.input} value={props.name} onChange={(e) => setName(e.target.value)} />
                    <input type='text' className={style.input} value={props.description} onChange={(e) => setDescription(e.target.value)} />
                    <input type='text' className={style.input} value={props.price} onChange={(e) => setPrice(e.target.value)} />
                    <input type='text' className={style.input} value={props.quantity} onChange={(e) => setQuantity(e.target.value)} />
                </div>
            </div>
            <div className={style.operations} >
                <button className={style.updateBtn} onClick={()=>update_product(props.product_id)}>UPDATE</button>
                <button className={style.deleteBtn} onClick={()=>delete_product(props.product_id)}>DELETE</button>
            </div>
        </div>
    )
}