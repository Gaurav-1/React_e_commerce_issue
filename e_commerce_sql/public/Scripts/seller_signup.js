const password = document.querySelector('#password');
const mailid = document.querySelector('#usermail');
const username = document.querySelector('#username');
const Cpass=document.querySelector('#confirm_password');

function dis_user(){
    const regex = /^(?!.*\s)/;
    if(username.value.length<3 || !regex.test(username.value)){
        document.querySelector('#UsrErr').innerHTML=`Username must be 3 char long<br>&nbsp&nbsp Username can't have space`
        return false;
    }
    document.querySelector('#UsrErr').innerHTML=''
}

function mail(){
    const regex = /^[a-zA-Z0-9._%-+]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?!.*\s)$/;
    if(!regex.test(mailid.value)){
        document.querySelector('#MailErr').innerHTML='Enter a valid e-mail address'
        return false;
    }
    document.querySelector('#MailErr').innerHTML=''
}

function pass(){
    if(password.value.length<8){
        document.querySelector('#PassErr').innerHTML='Password must be 8-15 charcter long'
        return false;
    }
    document.querySelector('#PassErr').innerHTML=''
}

function confpass(){
    if(Cpass.value!==password.value || Cpass.value.trim()===''){
        document.querySelector('#CPassErr').innerHTML='Password not matched'
        return false;
    }
    document.querySelector('#CPassErr').innerHTML=''
}

document.querySelector('#signupBtn').addEventListener('click',(event)=>{
    event.preventDefault();

    if(dis_user()===false || username.value.trim()===''){
        alert('Please enter a valid username')
        return;
    }

    if(mail()===false || mailid.value.trim()===''){
        alert('Please enter a valid email address')
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

    if(confpass()===false){
        alert(`Password and Confrim Password doesn't match`)
        return;
    }

    const form = new FormData(document.querySelector('#signup_form'))
    console.log(form);

    fetch('/seller/signup',{
        method: 'POST',
        body: form
    }).then(res=>{
            return res.json();
    }).then(res=>{
        if(res.message)
            alert(res.message)
        if(res.url)
            window.location.href = res.url;
    }).catch(err=>{
        alert(err);
    })
})