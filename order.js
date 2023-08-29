const tableBody = document.querySelector("tbody");
const table = document.querySelector("table");
const productTable = document.getElementById("productTable");

function AddNewUser()
{
    window.location.replace("NewUser.html");
}
function logOut()
{
    window.location.replace("Login.html");
}
function Orders()
{
    window.location.replace("product.html");
}
var orderDetails = JSON.parse(localStorage.getItem("Orders")) || [];


orders = JSON.parse(localStorage.getItem("totalOrderItems")) || [];




let generateitems = () => {
    var count = 1;
    return (tableBody.innerHTML=orders.map((x) => {
        return`<tr>
      <td>${x.orderId}</td>
      <td>${x.customerName}</td>
      <td>${x.emailAddress}</td>
      <td>${x.totalProducts}</td>
      <td>${x.totalAmount}</td>
      <td><button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample"><i class="fa-solid fa-square-check UpdateBtn bg-primary text-white"></i></button></td>
    </tr>`
    }).join(""));
    
}
generateitems();
let generateProduct = () => {
    var count = 1;
    return (productTable.innerHTML=orderDetails.map((x) => {
        return`<tr>
      <td>${x.product}</td>
      <td>${x.quantity}</td>
      <td>${x.price}</td>
      <td>${x.total}</td>
    </tr>`
    }).join(""));;
    
}
generateProduct();
