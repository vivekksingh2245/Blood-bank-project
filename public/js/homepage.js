const greeting = document.querySelector('.greeting');

window.onload = () => {
    if(!sessionStorage.user){
        location.href = '/login';
    } else{
        var retrievedObject = sessionStorage.getItem('user');
        greeting.innerHTML = `hello ${JSON.parse(retrievedObject).name}`;
    }
}
console.log("Session storage object:" ,JSON.parse(sessionStorage.getItem("user")))
getBloodBankList();


//Blood  Registration
const username = document.querySelector('.username');
const password = document.querySelector('.password');
const bloodbankname = document.querySelector('.name');
const address = document.querySelector('.address');



function createBloodBank(){
    fetch('/api/bloodbanks/create-blood-bank', {
        method: 'post',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify({
            bloodbankname: bloodbankname.value,
            username: username.value,
            password: password.value,
            address: address.value,
            
        })
    })
    .then(res => res.json())
    .then(data => {

    alert(data.message|| data.err)
    console.log(data)
    getBloodBankList();
    bloodbanklist.innerHTML="";
    })
}

//Get List od Blood BANK
let bloodbanklist = document.getElementById('bloodbanklist');





function getBloodBankList(){
    fetch('/api/bloodbanks/bloodbanklist', {
        method: 'get',
        headers: new Headers({'Content-Type': 'application/json'}),
    })
    .then(res => res.json())
    .then(data => {
        alert(data.message|| data.err)
        console.log(data)
        
      //For Populating Blood Banks
      data.data.forEach(bb=>{
        console.log("data elemet",bb)
        let bloodbank = document.createElement("div");
        let bbutton=document.createElement("button");
        let bbpara = document.createElement("p");
      
        bloodbank.setAttribute("class", "bloodbank");
        bbutton.setAttribute("class", "bbbutton");
        bbpara.setAttribute("class", "bbpara");

         
        bloodbank.appendChild(bbpara)
        bloodbank.appendChild(bbutton)
        bloodbanklist.appendChild(bloodbank);

        bbpara.innerHTML=bb.name;
        bbutton.innerHTML="View";
      
        function bloodbankClickhandler(event){
            var bbbuton = event.target;
            var bbdiv = bbbuton.parentNode;
            var taskText = bbdiv.children[0].innerHTML;
            displaybank(bb);
            console.log("Checking" ,taskText,"DATA", bb);
        }
        
        bbutton.addEventListener("click",bloodbankClickhandler)
 
})
        
    })
}
function displaybank(bloodbankObject){
    const donationBox= document.getElementById('donation-box')
    
const bbname = document.getElementById('bbname');
const bbaddress = document.getElementById('bbaddress');
const usernamefield= document.getElementById('usernamefield');
const passwordfield= document.getElementById('passwordfield');
bbname.innerHTML=bloodbankObject.name;
bbaddress.innerHTML=bloodbankObject.address;
usernamefield.innerHTML="Username: "+bloodbankObject.username;
passwordfield.innerHTML="Password: "+bloodbankObject.password;
}












const logOut = document.querySelector('.logout');

logOut.onclick = () => {
    sessionStorage.clear();
    location.reload();
}