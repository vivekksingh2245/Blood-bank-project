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


var reterivedObject = JSON.parse(sessionStorage.getItem('user'));

const name = document.getElementById("bbname")

const address = document.getElementById("bbaddress")

name.innerHTML= "Name:- "+ reterivedObject.name;
address.innerHTML= "Address:- " +reterivedObject.address;
findDonar();

let donateduserlist = document.getElementById('donateduserlist');


function findDonar(){
fetch('/api/donations/donarlist', {
    method: 'post',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify({
        bloodBankID:reterivedObject._id,
        
    })
})
.then(res => res.json())
.then(data => {

alert(data.message|| data.err.message)
console.log(data.data)

//For Populating Donated user list
data.data.forEach(bb=>{
        console.log("data elemet",bb)
        let donateduser = document.createElement("div");
        let dverifybutton=document.createElement("button");
        let dname = document.createElement("p");
        let dtime= document.createElement("p");

        donateduser.setAttribute("class", "donateduser");
        dverifybutton.setAttribute("class", "dverifybutton");
        dname.setAttribute("class", "dname");
        dtime.setAttribute("class", "dtime");


        donateduser.appendChild(dname)
        donateduser.appendChild(dtime)
        donateduser.appendChild(dverifybutton)
        donateduserlist.appendChild(donateduser);

        dname.innerHTML=bb.donarID[0].name;
 
        const timestamp = bb.createdAt;
        const dateTime = new Date(timestamp);
        const date = dateTime.toLocaleDateString();
        const time = dateTime.toLocaleTimeString();
     

        dtime.innerHTML=`Date: ${date} Time: ${time}`;
        if(bb.isVerified){
            dverifybutton.innerHTML="Verified"
            dverifybutton.disabled=true;
        }else{
            dverifybutton.innerHTML="Please Verify "
            dverifybutton.disabled=false;
        }
        function verifyClickhandler(event){
        
            if(bb.isVerified){
                dverifybutton.innerHTML="Verified";
                dverifybutton.disabled=true;
            }else{
                verifydonar(bb._id,dverifybutton);
            }
        }
        dverifybutton.addEventListener("click",verifyClickhandler)


})

})
}

function verifydonar(donationId,dverifybutton){
    fetch('/api/donations/verifydonar', {
        method: 'post',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify({
            donationId:donationId,
            
        })
    })
    .then(res => res.json())
    .then(data => {
    
    alert(data.message|| data.err.message)
    console.log(data)
    if(data.message==="Donar verified"){
        dverifybutton.innerHTML="Verified";
                dverifybutton.disabled=true;
    }
    })
}







const logOut = document.querySelector('.logout');

logOut.onclick = () => {
    sessionStorage.clear();
    location.reload();
}