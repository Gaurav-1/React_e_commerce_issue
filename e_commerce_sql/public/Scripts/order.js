document.getElementById('orderBtn').addEventListener('click',(e)=>{
    e.preventDefault();

    const form_data = new FormData(document.getElementById('order_form'));
    console.log(JSON.stringify(Object.fromEntries(form_data)))
    fetch('/product/order',{
        method: 'POST',
        headers:{
            'content-type':'application/json'
        },
        body: JSON.stringify(Object.fromEntries(form_data))
    })
    .then(res=>{
        if(res.ok)
        alert('Order Placed')
        else{
            res = res.json()
            alert(res.message)
        }

        const inp = document.querySelectorAll('input');
        inp.forEach(ele=>{ ele.value = '' });
    })
    .catch(err=>{
        alert('An error occured see console for more');
        console.log(err);
    })
})

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