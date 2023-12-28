const password = document.querySelector('#password');
const mailid = document.querySelector('#mail');
const username = document.querySelector('#name');

function dis_user(){
    const regex = /^(?!.*\s)/;
    if(username.value.length<3 || !regex.test(username.value)){
        alert(`Error:\nUsername must be 3 char long\nUsername can't have space`)
        return false;
    }
}

function mail(){
    const regex = /^[a-zA-Z0-9._%-+]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?!.*\s)$/;
    if(!regex.test(mailid.value)){
        alert('Error:\nEnter a valid e-mail address')
        return false;
    }
}

function pass(){
    if(password.value.length<8){
        alert('Error:\nPassword must be 8-15 charcter long')
        return false;
    }
}

function city(){
    const cityName = document.querySelector('#city');
    if(cityName.value.length<3 || cityName.value.trim()==''){
        alert(`Error:\n City must be 3 char long`)
        return false;
    }
}

function pincode(){
    const cityName = document.querySelector('#pincode');
    if(cityName.value.length<5 || cityName.value.trim()==''){
        alert(`Error:\n Pincode must be 5 char long`)
        return false;
    }
}

function state(){
    const cityName = document.querySelector('#state');
    if(cityName.value.length<3 || cityName.value.trim()==''){
        alert(`Error:\n State must be 3 char long`)
        return false;
    }
}

function warehouse(){
    const cityName = document.querySelector('#warehouse');
    if(cityName.value.length<3 || cityName.value.trim()==''){
        alert(`Error:\n Warehouse must be 3 char long`)
        return false;
    }
}


document.querySelector('#add-transpoterBtn').addEventListener('click',(event)=>{
event.preventDefault();

    if(dis_user()===false || username.value.trim()===''){
        return;
    }

    if(mail()===false || mailid.value.trim()===''){
        return;
    }

    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\|])(?!.*\s).{8,15}$/;
    if(pass()===false || password.value.trim()==='' || !regex.test(password.value)){
        alert(`Password requires:
        1. 8-15 character long
        2. Uppercase letter
        3. Lowercase letter
        4. A number
        5. A special letter
        6. Spaces are not allowed`
        );
        return;
    }

    const form = new FormData(document.querySelector('#transpoter-form'))

    if(form.get('type')==='city'){
        if(city()==false)
            return;
        if(pincode()==false)
            return;
    }

    if(state()==false)
        return;
    if(warehouse()==false)
        return;

    fetch('/admin/transpoter',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(Object.fromEntries(form))
    }).then(res=>{
            return res.json();
    }).then(res=>{
        if(res.message)
            alert(res.message)
        else
            console.log(res.err)
        const inp = document.querySelectorAll('input');
        inp.forEach(ele=>{ ele.value = '' });
    }).catch(err=>{
        alert('An Error Occured')
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