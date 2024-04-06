function formValidation(){
    const isOnlyLetters = /^[a-zA-Z]+$/;
    const isEmail = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    let valid = true;
    let inputFirstName = document.querySelector(".fname").value;
    let inputLastName = document.querySelector(".lname").value;   
    let inputEmail = document.querySelector(".email").value;
    let message = "Required:<br />";
    if(isOnlyLetters.test(inputFirstName)){
       // alert("true");
    }
    else{
        message += "<strong>First Name</strong> must not be empty and cannot contain numbers <br /> <br />";
        valid = false;
    }
    if(isOnlyLetters.test(inputLastName)){
        
        //alert("true");
    }
    else{
        message += "<strong>Last Name</strong> must not be empty and cannot contain numbers <br /> <br />";
        valid = false;
    }
    if(isEmail.test(inputEmail)){
       // alert("true");
    }
    else{
        message += "<strong>Email field</strong> must contain a valid email <br /> <br />";
        valid = false;
    }
    if(!valid){
        document.querySelector(".contact").innerHTML += '<div class = "tempDialog">'+message+'<div class="button-container"><div class = "btn" onclick="closeDialog()">OK</div></div></div>';
        
        
    }
    
}
function closeDialog(){
    document.querySelector(".tempDialog").remove();
}