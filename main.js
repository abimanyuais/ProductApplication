const form = document.querySelector("form")

var userDetails = JSON.parse(localStorage.getItem("UserDB"));

LogIn=[];
form.addEventListener("submit",(e)=>{
    e.preventDefault()
    

    const username = form.username.value
    const password = form.password.value
    if(username == "admin@gislen.com" && password == "password")
    {
        window.location.replace("ProductPage.html");
    }
    console.log(userDetails[0].emaiID);
    for(var i=0;i<userDetails.length;i++)
    {
        
        if(userDetails[i].userRole == "Customer")
        {
            if(userDetails[i].emaiID == username && userDetails[i].password == password)
            {
                LogIn.push(userDetails[i].emaiID);
                localStorage.setItem("NowLogIn",JSON.stringify(LogIn));

                window.location.replace("customer.html");
            }
        }
        else if(userDetails[i].userRole == "Employee")
        {
            if(userDetails[i].emaiID == username && userDetails[i].password == password)
            {
                window.location.replace("order.html");
            }
        }
        
    }

    // const authenticated = authentication(username,password)

    // if(authenticated){
    //     window.location.replace("product.html");
    // }
    // else if(username == "customer@gmail.com" && password=="password")
    // {
    //     window.location.replace("customer.html");
    // }
    // else{
    //     alert("wrong")
    // }
})

// function for checking username and password

function authentication(username,password){
    for(var i=0;i<usersDetails.length;i++){
        if(usersDetails[i].role == "Customer")
        {
            if(usersDetails[i].name == username && usersDetails[i].password == password)
            {
                window.location.replace("customer.html");
            }
        }
    }
}
