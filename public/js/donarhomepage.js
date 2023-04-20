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

setTimeout(() => {
    mydonation();
}, 1000);



//Blood  Registration
const username = document.querySelector('.username');
const password = document.querySelector('.password');
const bloodbankname = document.querySelector('.name');
const address = document.querySelector('.address');




//Get List od Blood BANK
let bloodbanklist = document.getElementById('bloodbanklist');
let bloodbankO = "";
let donationlist = document.getElementById('donationlist');





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
            bbutton.innerHTML="Donate";
          
            function bloodbankClickhandler(event){
                var bbbuton = event.target;
                var bbdiv = bbbuton.parentNode;
                var taskText = bbdiv.children[0].innerHTML;
                displaybankfordonation(bb);
                console.log("Checking" ,taskText,"DATA", bb);
            }
            
            bbutton.addEventListener("click",bloodbankClickhandler)
     
    })
        
    })
}





function displaybankfordonation(bloodbankObject){
    const donationBox= document.getElementById('donation-box')
    donationBox.style.display="block";
const bbname = document.getElementById('bbname');
const bbaddress = document.getElementById('bbaddress');
const isdonationdone = document.getElementById('isdonationdone');
const verifed= document.getElementById('verifed')
bbname.innerHTML=bloodbankObject.name;
bbaddress.innerHTML=bloodbankObject.address;
isdonationdone.checked=false;
verifed.style.display="none";
bloodbankO=bloodbankObject;
}


 function creatingDonation(){
    const verifed= document.getElementById('verifed')
    const isdonationdone = document.getElementById('isdonationdone');

    if(isdonationdone.checked == true){
        verifed.style.display = "block";
    } else {
        verifed.style.display = "none";
    }
    var retrievedObject = JSON.parse(sessionStorage.getItem('user'));
   console.log(bloodbankO._id,retrievedObject._id);
    fetch('/api/donations/create-donation', {
        method: 'post',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify({
            donarID: retrievedObject._id,
            bloodbankID: bloodbankO._id,
            address: bloodbankO.address,
            isVerified:false,
        })
    })
    .then(res => res.json())
    .then(data => {
        alert(data.message|| data.err.name)
        console.log(data)
        // donateduserlist.innerHTML="";
        // setTimeout(() => {
            
        //     mydonation();
        // }, 1000);
    })
    
        

 }


 function mydonation(){
    var retrievedObject = JSON.parse(sessionStorage.getItem('user'));
  console.log("userid: ",retrievedObject._id);
    fetch('/api/donations/mydonation', {
        method: 'post',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify({
            donarID:retrievedObject._id,
            
        })
    })
    .then(res => res.json())
    .then(data => {
    
    alert(data.message|| data.err.message)
    console.log(data.data)
    
    //For Populating Donated list
    data.data.forEach(bb=>{
            console.log("data elemet",bb)
            let donation = document.createElement("div");
            let generate=document.createElement("button");
            let bankname = document.createElement("p");
            let donationtime= document.createElement("p");
            let bankaddress= document.createElement("p")
            let status= document.createElement("p");
    
            donation.setAttribute("class", "donation");
            generate.setAttribute("class", "generate");
            bankname.setAttribute("class", "bankname");
            status.setAttribute("class", "status");
            donationtime.setAttribute("class", "donationtime");
            bankaddress.setAttribute("class", "bankaddress");
    
    
            donation.appendChild(bankname)
            donation.appendChild(donationtime)
            donation.appendChild(bankaddress)
            donation.appendChild(status)
            donation.appendChild(generate)
        
            donationlist.appendChild(donation);
            console.log("Checking :",bb.bloodBankID[0].name)
            bankname.innerHTML=bb.bloodBankID[0].name;
            bankaddress.innerHTML=bb.address;
            generate.innerHTML="Download Blood Donation Receipt";
           
        const timestamp = bb.createdAt;
        const dateTime = new Date(timestamp);
        const date = dateTime.toLocaleDateString();
        const time = dateTime.toLocaleTimeString();
     
        donationtime.innerHTML=`Date: ${date} Time: ${time}`;
            if(bb.isVerified){
                status.innerHTML="Status: verified";
                
                generate.disabled=false;
            }else{
                status.innerHTML="Status: Not Verified";
              
            generate.disabled=true;
            }


            ///Generating pdf call
            generate.addEventListener("click",generatePdfHandler);

           function generatePdfHandler(event){
            fetch('/api/donations/download', {
                method: 'post',
                headers: new Headers({'Content-Type': 'application/json'}),
                body: JSON.stringify({
                    donationID:bb._id,
                    
                })
            })
            .then(res => res.blob())
            .then(data => {
                const blob = new Blob([data], { type: 'application/pdf' });
                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = `${retrievedObject.name}-${date}-${time}.pdf`;
                link.click();
               
           })
        }
        
        
        })
     })
 }



const logOut = document.querySelector('.logout');

logOut.onclick = () => {
    sessionStorage.clear();
    location.reload();
}