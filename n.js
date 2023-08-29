const form = document.querySelector("form");
const tableBody = document.querySelector("tbody");
const table = document.querySelector("table");

UserDetails = JSON.parse(localStorage.getItem("UserDB")) || [];
console.log("Length : "+UserDetails.length);
function Product()
{
    window.location.replace("product.html");
}
function logOut()
{
    window.location.replace("Login.html");
}
function Orders()
{
    window.location.replace("order.html");
}


var errorState = 0;
function isvalidName()
{
    var firstName = document.getElementById('userName').value;
    var nameRegex = /^[a-zA-Z\-]+$/;
    if(!nameRegex.test(firstName))
    {
        document.getElementById('userName').style.border = '1px solid red';
        document.getElementById('ErrorName').innerHTML = "Invalid Name";
        errorState = 0;

    }
    else{
        document.getElementById('ErrorName').style.display = 'none';
        document.getElementById('userName').style.border = '1px solid #563d7c';
        errorState = 1;
    }
}
function validEmail()
{
    
    var email = document.getElementById('email').value;
    var emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/; 
    if(!emailRegex.test(email))
    {
        document.getElementById('email').style.border = '1px solid red';
        document.getElementById('ErrorEmail').innerHTML = "Invalid Email Address";
        errorState = 0;

    }
    else{
        
        document.getElementById('ErrorEmail').style.display = 'none';
        document.getElementById('email').style.border = '1px solid #563d7c';
        errorState = 1;
    }
   

}
function validatePassword()
{
    var password = document.getElementById("password").value;
    var passwordRegex = /^(?=.*\d)(?=(.*\W){1})(?=.*[a-zA-Z])(?!.*\s).{1,15}$/;
    if(!passwordRegex.test(password))
    {
        document.getElementById('password').style.border = '1px solid red';
        document.getElementById('ErrorPassword').innerHTML = "Password must be at least 8 digits with alphanumeric characters";
        errorState = 0;

    }
    else{
        document.getElementById('ErrorPassword').style.display = 'none';
        document.getElementById('password').style.border = '1px solid #563d7c';
        errorState = 1;
    }

}

function validDOB() 
{
    var dob = document.getElementById("dateOfBirth").value;
    if(!passwordRegex.test(password))
    {
        document.getElementById('dateOfBirth').style.border = '1px solid red';
        document.getElementById('DOB').innerHTML = "Enter Date Of Birth";
        errorState = 0;

    }
    else{
        document.getElementById('DOB').style.display = 'none';
        document.getElementById('dateOfBirth').style.border = '1px solid #563d7c';
        errorState = 1;
    }

}

function isValidData()
{
    
}
var addUserDetails = () => 
{
    
    var name = document.getElementById("userName").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var dateOfBirth = document.getElementById("dateOfBirth").value;
    var genderValue = document.getElementById("Gender");
    var roleValue = document.getElementById("role");
    var gender = genderValue.options[genderValue.selectedIndex].text;
    var role = roleValue.options[roleValue.selectedIndex].text;

    var value = isValidData();
    console.log("Value "+value);
    for(var i = 0; i < UserDetails.length; i++)
    {
        if(UserDetails[i].email === email)
        {
            errorState = 0;
        }
        else 
        {
            errorState =1;
        }
    }
    if(errorState  == 1)
    {
        UserDetails.push({name, email, password, dateOfBirth, gender, role});
        console.log(UserDetails);
        localStorage.setItem("UserDB",JSON.stringify(UserDetails));
    }
    else{
        document.getElementById("alertBox").innerHTML = "Please Check befour Add";
        errorMessage();
    }
    
    
    generateUser();
}

let generateUser = () => {
   
    return (tableBody.innerHTML=UserDetails.map((x) => {
        return`<tr>
      <td>${x.name}</td>
      <td>${x.email}</td>
      <td>${x.dateOfBirth}</td>
      <td>${x.gender}</td>
      <td>${x.role}</td>
      <td><i class="fa-solid fa-pen-to-square UpdateBtn bg-success text-white"></i></td>
      <td><i class="fa-solid fa-trash-can deleteBtn bg-danger text-white"></i></td>
    </tr>`
    }).join(""));
    
}
generateUser();
form.addEventListener("submit", addUserDetails);

function updateUserDetails(e)
{
    if (!e.target.classList.contains("UpdateBtn")) {
        return;
      }
      UserDetails= JSON.parse(localStorage.getItem("UserDB"))||[];

    const btn = e.target;
    btn.closest("tr").remove();
    var a = (e.target.parentNode.parentNode).innerHTML;
    var array = a.split("<td>");
    console.log(array);
    var name = array[1].replace('</td>','').trim();
    var email = array[2].replace('</td>','').trim();
    var dob = array[3].replace('</td>','').trim();
    var gender = array[4].replace('</td>','').trim();
    var role = array[5].replace('</td>','').trim();
    console.log(name, email, dob, gender, role);

    document.getElementById("userName").value = name;
    document.getElementById("email").value = email;
    document.getElementById("role").value = role;
    document.getElementById("password").value = password
    document.getElementById("dateOfBirth").value = dob;
    document.getElementById("Gender").value = gender;

    document.getElementById("Gender").disabled = true;
    console.log(UserDetails);
    document.getElementById("AddProduct").style.display="none";
    document.getElementById("UpdateProduct").onclick = () => 
    {
       
        for(var i = 0; i < UserDetails.length; i++)
        {
            if(UserDetails[i].name == name)
            {
                UserDetails[i].name = document.getElementById("userName").value;
                UserDetails[i].email= document.getElementById("email").value ;
                UserDetails[i].password=document.getElementById("password").value;
                UserDetails[i].dateOfBirth = document.getElementById("dateOfBirth").value;
                UserDetails[i].role = document.getElementById("role").value;                
                localStorage.setItem("UserDB",JSON.stringify(UserDetails));
                break;

            }
        }
        console.log("Final array : "+UserDetails);
    }
    generateUser();

}
function Delete(b)
{
    alert();
    for(var i = 0; i<UserDetails.length;i++)
    {
        
        if(UserDetails[i].name == b)
        {
        
            let count=0;
            let oldProductList = [];
            let newProductList = [];

            oldProductList = localStorage.getItem("UserDB");
            newProductList = JSON.parse(oldProductList);
            console.log(newProductList);
            newProductList.forEach(element => {
             console.log(element.name);
                if(element.name == b)
                {
                    count++;
                    if(newProductList.length == 1)
                        count = 0;
                }
            });
            newProductList.splice(count,1);
            localStorage.setItem("UserDB",JSON.stringify(newProductList));
             
        }
    }
}




function onDeleteRow(e) 
{
    if (!e.target.classList.contains("deleteBtn")) {
      return;
    }

    const btn = e.target;
    btn.closest("tr").remove();
    var a = (e.target.parentNode.parentNode).innerHTML;
    a = a.split("<td>");
    a = a[1].replace('</td>','')
    a=a.trim();
    b= a.toString();
    Delete(b);
}
table.addEventListener("click", updateUserDetails);
table.addEventListener("click", onDeleteRow);
let errorMessage = () => 
{
    var nodify = document.getElementById("alertBox");
    console.log(nodify);
    nodify.style.display = "block";
    window.setTimeout(function()
    {
        nodify.style.display = "none";
    },5000
    )
}