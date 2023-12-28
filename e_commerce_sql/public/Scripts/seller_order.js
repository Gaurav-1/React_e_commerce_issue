const display_products = document.getElementById('orders');

document.getElementById('search').addEventListener('click',()=>{
    const type = document.getElementById('orderStatus').value;
    let data;
    fetch('/seller/orders',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({type})
    })
    .then(res=>{
        return res.json();
    })
    .then(res=>{
        display_products.innerHTML = ''
        if(res.message){
            alert(res.message)
        }
        else{
            if(!data)
            data = res.orders
            else
                data = data.concat(res.orders);
            console.log(res.orders);
                let i=0;
                res.orders.forEach((ele,key)=>{
                    
                    if(key < res.orders.length && type != 'approve')
                        show_orders(ele);
                    else if(key < res.orders.length-1)
                        show_orders(ele)
                    else{
                        document.querySelectorAll('.expoters').forEach(items=>{
                            ele.forEach(eles=>{
                                options = document.createElement('option');
                                options.setAttribute('value',eles.expoter_id)
                                options.innerHTML = eles.name+','+eles.expoter_state
                                items.appendChild(options)
                            })
                            i++;
                        })
                    }
            })
            
            document.querySelectorAll('.approveBtn').forEach(items=>{items.addEventListener('click',approve_order)})
            

        }
    })
})


function show_orders(res){
    let  btn=null;
    const type = document.getElementById('orderStatus').value;
    if(type == 'waiting')
        btn = 'Approve'
    else if(type == 'approve')
        btn = 'Dispatch';

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
        <p>Date: <span>${new Date(res.order_date).toUTCString()}</span></p>
        <p>Shipping Address: <span>${res.shipping_address}</span></p>
        <p>Landmark: <span>${res.landmark}</span></p>
        <p>Order Bill: <span>$ ${res.order_bill}</span></p>
    </div>
    <div class='payment_details'>
        <h2>Payment Details</h2>
        <p>Mode: <span>${res.payment_mode}</span></p>
        <p>Status: <span>${res.payment_status}</span></p>
        <p>1 - paid  ||  0 - Unpaid</p>
    </div>`

    if(btn!=null){
    div.innerHTML +=`
        <div class='buttons'>`;
    if(type === 'approve'){
        div.innerHTML+=`<select name='expoters' class='expoters' id='O${res.order_id}'></select>`
    }
    div.innerHTML+=`
            <button id='${res.order_id}' class='approveBtn btn'>${btn}</button>
            <button id='${res.order_id}' class='cancelBtn btn'>Cancel</button>
        </div>`
    }
    display_products.appendChild(div);
}

function approve_order(){
    let order;
    if(this.innerHTML=='Approve')
        order = 'approve'
    else if(this.innerHTML=='Dispatch')
            order = 'dispatch'
    else if(this.innerHTML == 'Cancel')
            order = 'cancel'
    const ob = {
        id: this.id,
        status: order,
    }
    if(order == 'dispatch'){
        const expoter_id = document.getElementById('O'+this.id).value;
        ob.expoter_id= expoter_id
    }
    console.log(ob);
    fetch('/seller/approve_order',{
        method: 'POST',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify(ob)
    })
    .then(res=>{
        if(res.ok)
            document.getElementById('M'+this.id).remove();
        return res.json();
    })
    .then(res=>{
        alert(res.message)
    })
    .catch(err=>{
        console.log(err);
        alert('An Error Occured check console')
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