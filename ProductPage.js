// ! Navigate page
function openAddNewUserPage(){window.location.replace("CreateUserPage.html");}
function openlogOutPage(){window.location.replace("Login.html");}
function openOrdersPage(){window.location.replace("order.html");}
function openProductPage(){window.location.replace("ProductPage.html");}
// ! Restore the array value
let productList = JSON.parse(localStorage.getItem('Basket')) || [];
let LogIn = JSON.parse(localStorage.getItem("NowLogIn")) || [];
// ! Value Calling
let tableBody = document.getElementById("tbody");

// ! Class Product
class Product
{
    constructor(productName,productQuantity,productPrice)
    {
        this.productName = productName;
        this.productQuantity = productQuantity;
        this.productPrice = productPrice;
    }
}

function generateItems(productList)  // ! To print item in a table format
{
    for (var i = 0; i < productList.length; i++)
    {
        let row = document.createElement('tr');// ! Create a new row dynamically
        // ! create a new column dynamically
        // ! -------------------------------------
        let col1 = document.createElement('td');
        let col2 = document.createElement('td');
        let col3 = document.createElement('td');
        let col4 = document.createElement('td');
        let col5 = document.createElement('td');
        // ! -------------------------------------
        // ! create a button and assign function to it
        col4.setAttribute('onclick', 'updateProduct(this)');
        col5.setAttribute('onclick', 'deleteProduct(this)');
        // ! -------------------------------------
        // ! Append value to column
        col1.append(document.createTextNode(productList[i].productName));
        col2.append(document.createTextNode(productList[i].productQuantity));
        col3.append(document.createTextNode(productList[i].productPrice));
        col4.innerHTML = '<i class="fa-solid fa-pen-to-square UpdateBtn bg-success text-white"></i>';
        col5.innerHTML = '<i class="fa-solid fa-trash-can deleteBtn bg-danger text-white"></i>';


        row.append(col1);
        row.append(col2);
        row.append(col3);
        row.append(col4);
        row.append(col5);
        tableBody.append(row);
    }
}
function search() // ! Searching the product list
{
    productSearch = document.getElementById("ProductSearch").value;
    quantitySearch = document.getElementById("QuantitySearch").value;
    priceSearch = document.getElementById("PriceSearch").value;

    var searchedItems = data.filter(x => x.product.includes(productSearch) && x.quantity.includes(quantitySearch) && x.price.includes(priceSearch));
    generateItems(searchedItems); // ! Passing the searched items to the generate Items function

}
function getRowValues(tableRow)
{
    let $row = $(tableRow).closest("tr"),
        $productInJQ = $row.find("td:nth-child(1)"),
        $quantityInJQ = $row.find("td:nth-child(2)"),
        $priceInJQ = $row.find("td:nth-child(3)");
    
    var product,quantity,price;
    $.each($productInJQ, function() {product =$(this).text();});
    $.each($quantityInJQ, function() {quantity =$(this).text();});
    $.each($priceInJQ, function() {price =$(this).text();});

    let productDetails = new Product(product,quantity,price);
    return productDetails;
}
function addProduct(product)
{
    if(productValidate(product))
    {
        let search = productList.filter(item => item.productName === product.productName)
        if(search.length == 0)
        {
            productList.push(product);
            console.log(productList)
            localStorage.setItem("Basket",JSON.stringify(productList));
            window.location.reload();
        }
        else
            errorMessage("Product already Exists");  
        
    }
}

function getForm()
{
    var product = document.getElementById("productName").value;
    var quantity = document.getElementById("quantity").value;
    var price = document.getElementById("price").value;
    let items = new Product(product,quantity,price);
    return items;
}
function setForm(items)
{
    document.getElementById("productName").value = items.productName;
    document.getElementById("quantity").value = items.productQuantity;
    document.getElementById("price").value = items.productPrice;
}
function updateProduct(tableRow)
{
    let productDetails = getRowValues(tableRow);
    let index = productList.findIndex(items => items.productName === productDetails.productName);
    let item = new Product(productDetails.productName,productDetails.productQuantity,productDetails.productPrice);
    setForm(item);
    document.getElementById("AddProduct").style.display="none";
    document.getElementById("UpdateProduct").onclick = () => 
    {
        let items = getForm();
        productList[index].productName = items.productName;
        productList[index].productQuantity = items.productQuantity;
        productList[index].productPrice = items.productPrice;
        localStorage.setItem("Basket",JSON.stringify(productList));
        window.location.reload();
    }
}
function deleteProduct(tableRow)
{
    document.getElementById("exampleModalCenter").style.display="block";
    let productDetails = getRowValues(tableRow);
    let index = productList.findIndex(items => items.productName === productDetails.productName);
    productList.splice(index, 1);
    localStorage.setItem("Basket",JSON.stringify(productList));
    window.location.reload();
}
var isValidProduct = (productName) => /^[a-zA-Z ]+$/.test(productName);
var isValidQuantity = (quantity) => /^\d+$/.test(quantity) && (Number(quantity) > 0);
var isValidPrice = (price) => /^[0-9.]+$/.test(price);
function productValidate(item)
{
    var state = true;
    if(!isValidProduct(item.productName)) { state = false;
        errorMessage("Invalid Product Name: " + item.productName);}
    else if(!isValidQuantity(item.productQuantity)) { state = false;
        errorMessage("Invalid Product Quantity: " + item.productQuantity);}
    else if(!isValidPrice(item.productPrice)) { state = false;
        errorMessage("Invalid Product Price: "+item.productPrice);}
    if(state == true)
        return true;
}
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
document.getElementById("AddProduct").addEventListener("click",()=>{
    var product = document.getElementById("productName").value;
    var quantity = document.getElementById("quantity").value;
    var price = document.getElementById("price").value;
    var a = new Product(product,quantity,price);
    addProduct(a);
});

generateItems(productList);

// let cart = [];
// var totalItemPurchased = 0;
// var totalPrice = 0;
// var individualTotalPrice = 0;
// function addProductToCart()
// {
//     var cartProduct = getRowValues(tableRow);
//     if(cartProduct.productQuantity >= 0)
//     {
//         let searchProduct = cart.find((item) => item.productName === cartProduct.productName);
//         if (searchProduct === undefined)
//         {
//             individualTotalPrice = cartProduct.productPrice;
//             let tempProduct = new Product(personsEmail,cartProduct.productName,cartProduct.productQuantity,cartProduct.productPrice,individualTotalPrice);
//             cart.push(tempProduct);
//             totalItemPurchased += 1;
//             totalPrice += Number(cartProduct.productPrice);
//         }
//         else{
//             searchProduct.productQuantity += 1;
//             sear
//         }
//     }
// }




