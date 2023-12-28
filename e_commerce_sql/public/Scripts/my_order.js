const display_products = document.getElementById('orders');
const cancel_orderdiv = document.getElementById('cancel_order');
const cancelorderBtn = document.querySelector('.cancelorderBtn');
cancelorderBtn.addEventListener('click',cancel_my_order);

cancel_orderdiv.style.visibility = 'hidden';

function my_order(){
    let data;
    fetch('/product/my_order',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: null
    })
    .then(res=>{
        return res.json();
    })
    .then(res=>{
        if(res.message){
            alert(res.message)
            display_products.innerHTML = ''
        }
        else{
        display_products.innerHTML = ''
            if(!data)
            data = res.orders
            else
                data = data.concat(res.orders);
            res.orders.forEach(ele=>{
                show_orders(ele);
            })
        }
    })
}

function show_orders(res){
    const text = res.image.split('/');
    const alt = text[text.length - 1];

    const div = document.createElement('div')
    div.setAttribute('class','container')
    div.setAttribute('id','M'+res.order_id)
    div.innerHTML=`
    <div>
        <img src='${res.image}' alt='${alt}' class='thumbnail'>
    </div>
    <div class='product_details'>
        <h2>Product Details</h2>
        <p>ID: <span>${res.product_id}</span></p>
        <p class='product-name'>Name: <span>${res.name}</span></p>
        <p>Description: <span>${res.description}</span></p>
        <p>Ordered Quantity: <span>${res.order_quantity}</span></p>
    </div>
    <div class='order_details'>
        <h2>Order Details</h2>
        <p>ID: <span>${res.order_id}</span></p>
        <p>Status: <span>${res.order_status}</span></p>
        <p>Order Date: <span>${new Date(res.order_date).toUTCString()}</span></p>
        <p>Expected to Deliver: <span>${new Date(res.delivery_date).toUTCString()}</span></p>
        <p>Order Bill: <span>$ ${res.order_bill}</span></p>
    </div>`
    
    if(res.order_status!=='recived' && res.order_status!=='cancel'){
        div.innerHTML += `
            <div class='buttons'>
                <button id='B${res.order_id}' class='cancelBtn btn' onclick='cancel_order("${res.order_id}")'>Cancel</button>
            </div>`;
    }
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

function cancel_order(id){
    cancel_orderdiv.style.visibility = 'visible'
    cancelorderBtn.setAttribute('id',id);
}

function cancel_my_order(){
    const reason = document.getElementById('cancel_reason').value;

    if(reason.trim() == '' || reason.length<15){
        alert('Cancel reason should be 10 character long')
        return;
    }

    const id = this.id;

    fetch('/product/cancel_my_order',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id, reason})
    })
    .then(res=>{ return res.json() })
    .then(res=>{
        alert(res.message)
        if(res.status=='canceled'){
            document.getElementById('B'+id).remove();
        }
        cancel_orderdiv.style.visibility = 'hidden';
    })
    .catch(err=>{
        alert('An error Occured')
        console.log(err);
    })
}

my_order();