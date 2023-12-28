const display_products = document.querySelector('#display_product');
let pages = 0;
let data;
let flag = false;

function load_product(){
    const max = document.querySelector('#max').value;
    fetch('/admin/seller_product',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({pages: pages,max: max})
    })
    .then(res=>{
        if(res.status===200)
           return res.json();
    })
    .then(res=>{
        console.log(res.sellers);
        if(res.message){
            alert(res.message)
            console.log(res.message);
            return;
        }
        if(!data)
            data =res.sellers
        else
            data = data.concat(res.sellers);
        res.sellers.forEach(ele=>{
            show_products(ele);
        })
        pages=pages+Number(max);
        display_products.scrollTop = display_products.scrollHeight;
        window.scrollTo(0,display_products.scrollHeight);
        document.querySelectorAll('.ApproveBtn').forEach(items=> items.addEventListener('click',approve_product));
        document.querySelectorAll('.RejectBtn').forEach(items=> items.addEventListener('click',reject_product));
    })
    .catch(err=>console.log(err))
}

function show_products(res){
    const div = document.createElement('div')
    div.setAttribute('class','products')
    div.setAttribute('id', 'M'+res.product_id)
    div.innerHTML=`
    <img src='${res.image}' class='thumbnail'>
    <div class='details'>
        <div class='labels'>
            <label>Name: ${res.name}</label>
            <label>Business: ${res.business_name}</label>
            <label>Address: ${res.business_address}</label>
            <label>Mail: ${res.mail}</label>
        </div>
    </div>
    <div class='operations'>
        <button id='${res.product_id}' class='ApproveBtn'>Approve</button>
        <button id='${res.product_id}' class='RejectBtn'>Reject</button>
    </div>`
    display_products.appendChild(div);
}

document.querySelector('#load-moreBtn').addEventListener('click',chks);

function chks(){
    if(flag){
        pages = 0;
        display_products.innerHTML=''
        flag = false;
    }
    load_product();
}


document.querySelector('#max').addEventListener('change',()=>{flag=true})

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

function approve_product(){

    const id= this.id

    fetch('/admin/approve_product',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: id})
    })
    .then(res=>{
        return res.json();
    })
    .then(res=>{
        alert(res.message);
        document.getElementById('M'+id).remove();
    })
    .catch(err=>{
        alert(err);
    })
}

function reject_product(){

    const id= this.id

    fetch('/admin/reject_product',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: id})
    })
    .then(res=>{
        return res.json();
    })
    .then(res=>{
        alert(res.message);
        document.getElementById('M'+id)
    })
    .catch(err=>{
        console.log(err);
    })
}

load_product();