import { useState, useEffect } from "react"
import { path } from "../../../constants/global"

import Products from "./products";

import style from "./style.module.css"

export default function () {
    alert('Got To the seller dashboard');
    const [sellerProducts, setSellerProducts] = useState([]);
    const [Tproduct, setTproduct] = useState(0);

    function TotalProducts() {
        fetch(`${path}/seller/total_products`, {
            method: 'GET',
            credentials: "include",
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(res => {
                setTproduct(res[0].total)
                    paginations(Tproduct, 20)
            })
            .catch(err => { console.log("An Error occur: ", err); })
    }

    function paginations(Tproduct, max) {
        load_product(0, max);
        console.log(Tproduct, max);
        $('#pagination').pagination({
            items: Tproduct,
            itemsOnPage: max,
            onPageClick: function (page) {
                display_products.innerHTML = ""
                load_product(page, max)
            }
        });
    }

    function load_product(pages, max) {
        fetch(`${path}/seller/dashboard`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ pages, max })
        })
            .then(res => {
                if (res.status === 200)
                    return res.json();
            })
            .then(res => {
                if (res.message) {
                    alert(res.message)
                    return;
                }
                setSellerProducts(res);
                setPages(pages + max)
            })
            .catch(err => console.log(err))
    }


    useEffect(() =>{ TotalProducts()}, [])

    return (
        <>
            <div className={style.container}>
                {sellerProducts.map((val) => <Products props={val} />)}
            </div>

            <div className={style.limit}>
                <label for="max">Select result count</label>
                <select name="max" id="max" onInput={(e)=>paginations(Tproduct,e.target.value)}>
                    <option value="20">20</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
                <div id="pagination"></div>
            </div>
        </>
    )
}