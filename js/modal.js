$(document).ready(function () {
    $("#phone2").inputmask({"mask": "+38 (999) 999-99-99"});
});
$(document).ready(function () {
    $("#phone3").inputmask({"mask": "+38 (999) 999-99-99"});
});
$(document).ready(function () {
    $("#phone").inputmask({mask: "+38 (999) 999-99-99",
    definitions: {
        '*': {
          validator: "^[0-9a-f]"
        }
      },
    onincomplete: function() {
        isvalid = false
      },
      oncomplete: function() {
        isvalid = true
      }});
    
});
let insertedPhone = document.querySelector('#insertedPhone');
let insertedSecondPhone = document.querySelector('#insertedSecondPhone');
let btn3 = document.getElementById("sendBtn");

function validation(phone) {
    let btn1 = document.getElementById("btnInVideoBlock");
    let btn2 = document.getElementById("clickBtnFormBlock");
    if (phone.includes("_")){

        btn1.setAttribute("onclick","");
        btn1.setAttribute("href","#btnInVideoBlock");
        btn2.setAttribute("onclick","");
        btn2.setAttribute("href","#clickBtnFormBlock");

        insertedPhone.innerText = insertedPhone.innerText +" -> щось не так з номером :("
        insertedPhone.style.color = "red";

        insertedSecondPhone.innerText = insertedSecondPhone.innerText +" -> щось не так з номером :("
        insertedSecondPhone.style.color = "red";
        return false;
    }else {
        btn1.setAttribute("onclick","sendMail('name2','phone2')");
        btn1.setAttribute("href","thank-you.html");
        btn2.setAttribute("onclick","sendMail('name3','phone3')");
        btn2.setAttribute("href","thank-you.html");
        insertedSecondPhone.style.color = "green";
        insertedPhone.style.color = "green";
    }
    return true
}

function insertPhone(thisis) {
    insertedPhone.innerText = document.querySelector('#phone2').value;
    validation(document.querySelector('#phone2').value)
}
function insertSecondPhone(thisis) {
    insertedSecondPhone.innerText = document.querySelector('#phone3').value
    validation(document.querySelector('#phone3').value)
}
btn3.addEventListener("click", (event) => {
    if(isvalid===false){
        document.querySelector('#phone').style.border='3px solid red';
        
        }
        
    else{
        sendMail('name','phone');
        window.location = 'thank-you.html';
    }
})