const display_products = document.querySelector('#display_product');
let data;

function load_product(){
    let sum=0;
    fetch('/product/cart',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(res=>{
        return res.json();
    })
    .then(res=>{
        console.log(res);
        if(res.message){
            alert(res.message);
            return;
        }
        if(!data)
            data =res
        else
            data = data.concat(res);
        res.forEach(ele=>{
            show_products(ele);
            sum += ele.bill;
        })

        const tb = document.querySelector('#total')
        const tr = document.createElement('tr');
        const td = document.createElement('td');
        const td_sum = document.createElement('td');
        td.innerHTML = 'Total'
        td_sum.innerHTML = '$ '+sum;
        td_sum.colSpan = 2;
        tr.appendChild(td)
        tr.appendChild(td_sum)
        tb.appendChild(tr);

        document.querySelectorAll('.increase').forEach(items=>items.addEventListener('click',inc_product))
        document.querySelectorAll('.decrease').forEach(items=>items.addEventListener('click',dec_product))
        document.querySelectorAll('.deleteBtn').forEach(items=>items.addEventListener('click',delete_product))
    })
}

function show_products(res){
    const div = document.createElement('div')
    div.setAttribute('class','products')
    div.setAttribute('id','M'+res.product_id)
    div.innerHTML=`
    <img src='${res.image}' class='thumbnail'>
    <p>${res.name}</p>
    <div>
        <div class='pro-inc-dec'>
            <div class='increase' id='${res.product_id}'>+</div>
            <div class='quantity' id='Q${res.product_id}'>${res.quantity}</div>
            <div class='decrease' id='${res.product_id}'>-</div>
        </div>
        <div>
            <label id='P${res.product_id}'>$ ${res.bill} </label>
        </div>
    </div>
    <br>
    <div class='operations'>
        <button id='${res.product_id}' class='detailsBtn'>Details</button>
        <button id='${res.product_id}' class='deleteBtn'>Delete</button>
    </div>`
    display_products.appendChild(div);

    const tb = document.querySelector('#total')
    const tr = document.createElement('tr');
    const td_name = document.createElement('td');
    const td_quantity = document.createElement('td');
    const td_bill = document.createElement('td');
    td_name.innerHTML = res.name
    tr.appendChild(td_name);
    td_quantity.innerHTML = res.quantity
    tr.appendChild(td_quantity)
    td_bill.innerHTML = '$ '+res.bill
    tr.appendChild(td_bill)
    tb.appendChild(tr);
}

function inc_product(){
    console.log(this.id);
    fetch('/product/increase',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: this.id})
    })
    .then(res=>{return res.json()})
    .then(res=>{
        if(res.message==='updated'){
            document.querySelector('#Q'+this.id).innerHTML = res.quantity;
            document.querySelector('#P'+this.id).innerHTML = '$ '+res.price;
        }
        else
            alert(res.message);
    })
    .catch(err=>{
        alert(err);
    })
}

function dec_product(){
    console.log(this.id);
    fetch('/product/decrease',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: this.id})
    })
    .then(res=>{return res.json()})
    .then(res=>{
        if(res.message==='updated'){
            document.querySelector('#Q'+this.id).innerHTML = res.quantity;
            document.querySelector('#P'+this.id).innerHTML = '$ '+res.price;
        }
        else
            alert(res.message);
    })
    .catch(err=>{
        alert(err);
    })
}

function delete_product(){
    console.log(this.id);
    fetch('/product/delete',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: this.id})
    })
    .then(res=>{return res.json()})
    .then(res=>{
        if(res.message==='deleted'){
            document.querySelector('#M'+this.id).remove();
        }
        else
            alert(res.message);
    })
    .catch(err=>{
        alert(err);
})
}

document.querySelector('#logoutBtn').addEventListener('click',()=>{

    fetch('/user/logout',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(res=>{
        return res.json();
    })
    .then(res=>{
        window.location.href = res.url;
    })
})

document.querySelector('#buynowBtn').addEventListener('click',()=>{
    window.location.href = '/product/order'
})

load_product();