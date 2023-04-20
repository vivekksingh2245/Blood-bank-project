// form loading animation

const form = [...document.querySelector('.form').children];

form.forEach((item, i) => {
    setTimeout(() => {
        item.style.opacity = 1;
    }, i*100);
})

window.onload = () => {
    if(sessionStorage.user){
        console.log(sessionStorage.user);
        if(JSON.parse(sessionStorage.getItem('user')).userType=="Admin")
        location.href = '/adminhome';
        else if(JSON.parse(sessionStorage.getItem('user')).userType=="Blood Bank")
        location.href = '/bloodbankhome';
        else
        location.href = '/donarhome';
    }
}

//form validation

const name = document.querySelector('.name') ||null;
const mobileusername = document.querySelector('.mobile-number');
const aadhar = document.querySelector('.aadhar');
const password = document.querySelector('.password');
const bloodgroup = document.querySelector('.bloodgroup');
const usertype= document.querySelector('.usertype');

const submitBtn = document.querySelector('.submit-btn');

setTimeout(()=>{
    const id =1;
    const name = "rohit"
   fetch(`/api/users?id=${id}&name=${name}`,{
    method:'get',
    headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }),

   })
   .then(res=> res.json())
   .then(res => console.log(res))
},5000);
//User Registration
function signup(){
    fetch('/api/users/register-user', {
        method: 'post',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify({
            name: name.value,
            mobilenumber: mobileusername.value,
            password: password.value,
            aadhar: aadhar.value,
            bloodgroup: bloodgroup.value,
            
        })
    })
    .then(res => res.json())
    .then(data => {

    alert(data.message||data.err)
    console.log(data)
    })
}


//Login 
function signin(){
    fetch('/api/users/login-user',{
        method: 'post',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify({
            mobileusername: mobileusername.value,
            password: password.value,
            usertype: usertype.options[usertype.selectedIndex].value,

        })
    })
    .then(res => res.json())
    .then(data => {
        alert(data.message|| data.err)
        console.log(data.data)
        validateData(data)
    })

}

const validateData = (data) => {
    if(!data.data){
        alertBox(data.message||data.err);
    } else{
        sessionStorage.setItem("user",JSON.stringify(data.data))
        if(data.data.userType=="Admin")
           location.href = '/adminhome';
        else if(data.data.userType=="Blood Bank")
        location.href = '/bloodbankhome';
        else
        location.href = '/donarhome';
    }
}

const alertBox = (data) => {
    const alertContainer = document.querySelector('.alert-box');
    const alertMsg = document.querySelector('.alert');
    alertMsg.innerHTML = data;

    alertContainer.style.top = `5%`;
    setTimeout(() => {
        alertContainer.style.top = null;
    }, 5000);

}