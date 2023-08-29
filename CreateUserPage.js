// ! Navigation Page
function openProductPage(){window.location.replace("product.html");}
function openlogOutpage(){window.location.replace("Login.html");}
function openOrdersPage(){window.location.replace("order.html");}

// ! Assign the valu to table
const form = document.querySelector("form");
const tableBody = document.getElementById("tbody");
const table = document.querySelector("table");

// ! Restore the array value
userInfo = JSON.parse(localStorage.getItem("UserDB")) || [];
// ! Class User
class User
{
    constructor(nameOfUser, emaiID, password, dateOfBirth, gender, userRole)
    {
        this.nameOfUser = nameOfUser;
        this.emaiID = emaiID;
        this.password = password;
        this.dateOfBirth = dateOfBirth;
        this.gender = gender;
        this.userRole = userRole;        
    }
}
function getValues()
{
    var nameOfUser = document.getElementById("userName").value;
    var emaiID = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var dateOfBirth = document.getElementById("dateOfBirth").value;
    var gender = document.getElementById("Gender").value;
    var userRole = document.getElementById("role").value;
    let userTransfer = new User(nameOfUser,emaiID,password,dateOfBirth,gender,userRole);
    return userTransfer;
}
function setValues(user)
{
    document.getElementById("userName").value = user.nameOfUser;
    document.getElementById("email").value = user.emaiID;
    document.getElementById("password").value = user.password;
    document.getElementById("dateOfBirth").value = user.dateOfBirth;
    document.getElementById("role").value = user.userRole;
}
function addNewUser()
{
    if(Validation()){
    user = getValues();
    userInfo.push(user);
    console.log(userInfo);
    localStorage.setItem("UserDB",JSON.stringify(userInfo));
    window.location.reload();
    }
}
// ! Validation part

const date = new Date();
console.log(date);
isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
isValidName = (name) => /^[a-zA-Z ]+$/.test(name);
isValidPassword = (password) => /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password);
isValidDateOfBirth = (dateOfBirth) => (dateOfBirth !== "");

function Validation()
{
    state = true;
    user = getValues();
    var searchForExistingEmailID = userInfo.find((x) => x.emaiID === user.emaiID)
    if(!isValidName(user.nameOfUser)){state = false;errorMessage("Invalid Name");}
    else if(!isValidEmail(user.emaiID)){errorMessage("Invalid Email"); state = false;}
    else if(!isValidPassword(user.password)){errorMessage("Invalid Password"); state = false;}
    else if(!isValidDateOfBirth(user.dateOfBirth)){errorMessage("Invalid Date Of Birth");state = false;}
    if(state == true){return true}
}
document.getElementById("AddUser").addEventListener("click",addNewUser);

function errorMessage(message)
{
    document.getElementById("alerting").innerHTML = message;
    var element = document.getElementById("myprogressBar");   
    var width = 1;
    var identity = setInterval(scene, 10);
    function scene() {
      if (width >= 100) {clearInterval(identity);}
      else {width++; element.style.width = width + '%';}
    }
    element.style.width = 0 + '%';
    var alertElement = document.getElementById('alertID');
    alertElement.style.display = 'block';
    window.setTimeout(function() {alertElement.style.display = 'none';}, 3000); 
}
document.getElementById("AddUser").addEventListener("click",Validation);
// !------------------------------------------------

// ! Generate the table
function generateUserList(listOfUsers)
{
    for (var i = 0; i < listOfUsers.length; i++)
    {
        let row = document.createElement('tr');// ! Create a new row dynamically
        // ! create a new column dynamically
        // ! -------------------------------------
        let col1 = document.createElement('td');
        let col2 = document.createElement('td');
        let col3 = document.createElement('td');
        let col4 = document.createElement('td');
        let col5 = document.createElement('td');
        let col6 = document.createElement('td');
        let col7 = document.createElement('td');
        // ! -------------------------------------
        // ! create a button and assign function to it
        col6.setAttribute('onclick', 'updateUserDetails(this)');
        col7.setAttribute('onclick', 'deleteUserDetail(this)');
        // ! -------------------------------------
        // ! Append value to column
        col1.append(document.createTextNode(listOfUsers[i].nameOfUser));
        col2.append(document.createTextNode(listOfUsers[i].emaiID));
        col3.append(document.createTextNode(listOfUsers[i].dateOfBirth));
        col4.append(document.createTextNode(listOfUsers[i].gender));
        col5.append(document.createTextNode(listOfUsers[i].userRole));
        col6.innerHTML = '<i class="fa-solid fa-pen-to-square UpdateBtn bg-success text-white"></i>';
        col7.innerHTML = '<i class="fa-solid fa-trash-can deleteBtn bg-danger text-white"></i>';
        // ! -------------------------------------
        // ! Append value to row
        row.append(col1);
        row.append(col2);
        row.append(col3);
        row.append(col4);
        row.append(col5);
        row.append(col6);
        row.append(col7);
        tableBody.append(row);
    }
}

function getRowValues(tableRow) 
{
    console.log(tableRow);
    let $row = $(tableRow).closest("tr"),
        $nameOfUserInJQ = $row.find("td:nth-child(1)"),
        $emaiIDInJQ = $row.find("td:nth-child(2)"),
        $dateOfBirthInJQ = $row.find("td:nth-child(3)"),
        $genderInJQ = $row.find("td:nth-child(4)"),
        $userRoleInJQ = $row.find("td:nth-child(5)");

    var nameOfUser,emaiID,dateOfBirth,gender,userRole;
    $.each($nameOfUserInJQ, function() {nameOfUser =$(this).text();});
    $.each($emaiIDInJQ, function() {emaiID =$(this).text();});
    $.each($dateOfBirthInJQ, function() {dateOfBirth =$(this).text();});
    $.each($genderInJQ, function() {gender =$(this).text();});
    $.each($userRoleInJQ, function() {userRole =$(this).text();});
    console.log(nameOfUser,emaiID,gender,userRole);
    var password = userInfo.find((x) => x.emaiID == emaiID);
    let user = new User(nameOfUser,emaiID,password.password,dateOfBirth,gender,userRole);
    return user;
}
function updateUserDetails(tableRow)
{
    let userInformation = getRowValues(tableRow);
    let index = userInfo.findIndex((person) => person.emaiID == userInformation.emaiID);
    let user = new User(userInformation.nameOfUser,userInformation.emaiID,password.password,userInformation.dateOfBirth,userInformation.gender,userInformation.userRole);
    setValues(user);
    console.log(user.userRole);
    document.getElementById("AddUser").style.display = "none";
    document.getElementById("Gender").style.display = "none";
    document.getElementById("UpdateUser").onclick = () =>
    {
        if(Validation()){
        let user = getValues();
        userInfo[index].nameOfUser = user.nameOfUser;
        userInfo[index].emaiID = user.emaiID;
        userInfo[index].password = user.password;
        userInfo[index].dateOfBirth = user.dateOfBirth;
        userInfo[index].userRole = user.userRole;
        localStorage.setItem('UserDB',JSON.stringify(userInfo));
        window.location.reload();
        }
    }

}
function deleteUserDetail(tableRow)
{
    let userInformation = getRowValues(tableRow);
    let index = userInfo.findIndex((person) => person.emaiID == userInformation.emaiID);
    userInfo.splice(index, 1);
    localStorage.setItem('UserDB',JSON.stringify(userInfo));
    window.location.reload();
}
generateUserList(userInfo);