const display_products = document.querySelector('#display_product');
let pages = 0;
let data;

function load_product(){
    fetch('/admin/approve',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            pages: pages
        })
    })
    .then(res=>{
        if(res.status===200)
           return res.json();
    })
    .then(res=>{
        console.log(res.sellers);
        if(res.message){
            alert(res.message)
            return;
        }
        if(!data)
            data =res.sellers
        else
            data = data.concat(res.sellers);
        res.sellers.forEach(ele=>{
            show_products(ele);
        })
        display_products.scrollTop = display_products.scrollHeight;
        window.scrollTo(0,display_products.scrollHeight);
        pages+=5;
        document.querySelectorAll('.ApproveBtn').forEach(items=> items.addEventListener('click',approve_seller));
        document.querySelectorAll('.RejectBtn').forEach(items=> items.addEventListener('click',reject_seller));
    })
    .catch(err=>console.log(err))
}

function show_products(res){
    const div = document.createElement('div')
    div.setAttribute('class','products')
    div.setAttribute('id', 'M'+res.seller_id)
    div.innerHTML=`
    <img src='${res.profile_image}' class='thumbnail'>
    <div class='details'>
        <div class='labels'>
            <label>Name: ${res.name}</label>
            <label>Business: ${res.business_name}</label>
            <label>Address: ${res.business_address}</label>
            <label>Mail: ${res.mail}</label>
        </div>
    </div>
    <div class='operations'>
        <button id='${res.seller_id}' class='ApproveBtn'>Approve</button>
        <button id='${res.seller_id}' class='RejectBtn'>Reject</button>
    </div>`
    display_products.appendChild(div);
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

function approve_seller(){

    const id= this.id

    fetch('/admin/approve_seller',{
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
        alert(err);
    })
}

function reject_seller(){

    const id= this.id

    fetch('/admin/reject_seller',{
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
        document.getElementById('M'+id);
    })
    .catch(err=>{
        alert(err);
    })
}

load_product();