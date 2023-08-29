
const form = document.querySelector("form");
const tableBody = document.querySelector("tbody");
const table = document.querySelector("table");

data = JSON.parse(localStorage.getItem("Basket")) || [];

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
    window.location.replace("order.html");
}
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

var addproduct = () => 
{
    var ispush = 1;
    var product = document.getElementById("productName").value;
    var quantity = document.getElementById("quantity").value;
    var price = document.getElementById("price").value;
    console.log(product, quantity, price);

    if(product == "" || quantity == 0 || price == "")
    {
        document.getElementById("text2").innerHTML = "Invalid Add Function";
        errorMessage();
        ispush = 0;
    }

   
   
    if(ispush == 1)
    {
        let search = data.find((x) => x.product === product)
        if(search === undefined) {
            data.push({product,quantity,price});
        } else {
            search.quantity = Number(search.quantity)+Number(quantity);
        }
        console.log(data);
        localStorage.setItem("Basket",JSON.stringify(data));
    }
    generateitems();

};

let search = () => 
{
    product = document.getElementById("ProductSearch").value;
    quantity = document.getElementById("QuantitySearch").value;
    price = document.getElementById("PriceSearch").value;

    
    var array = data.filter(x => x.product.includes(product) && x.price.includes(price));



    console.log(array);
    let generateitem = () => {return (tableBody.innerHTML=array.map((x) => {
        return`<tr>
      <td>${x.product}</td>
      <td>${x.quantity}</td>
      <td>${x.price}</td>
      <td><i class="fa-solid fa-pen-to-square UpdateBtn bg-success text-white"></i></td>
      <td><i class="fa-solid fa-trash-can deleteBtn bg-danger text-white"></i></td>
    </tr>`
    }).join(""));};
    generateitem();


}

let generateitems = () => {
    var count = 1;
    return (tableBody.innerHTML=data.map((x) => {
        return`<tr>
      <td>${x.product}</td>
      <td>${x.quantity}</td>
      <td>${x.price}</td>
      <td><i class="fa-solid fa-pen-to-square UpdateBtn bg-success text-white"></i></td>
      <td><i class="fa-solid fa-trash-can deleteBtn bg-danger text-white"></i></td>      
    </tr>`
    }).join(""));
    
}
generateitems();


function Delete(b)
{
    for(var i = 0; i<data.length;i++)
    {
        
        if(data[i].product == b)
        {

            let count=0;
            let oldProductList = [];
            let newProductList = [];

            oldProductList = localStorage.getItem("Basket");
            newProductList = JSON.parse(oldProductList);
            console.log(newProductList);
            newProductList.forEach(element => {
             
                if(element.product == b)
                {
                    alert(element.product);
                    count++;
                    console.log(newProductList.length)
                    if(newProductList.length == 1)
                        count = 0;
                }
            });
            newProductList.splice(count,1);
            count = 0;
            localStorage.setItem("Basket",JSON.stringify(newProductList));
             
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
    console.log(a);
    a = a.split("<td>");
    a = a[1].replace('</td>','')
    a=a.trim();
    b= a.toString();
    console.log(b);
    Delete(b);
}

function updateProductList(e)
{
    if (!e.target.classList.contains("UpdateBtn")) {
        return;
    }
  
    data = JSON.parse(localStorage.getItem("Basket")) || [];

    const btn = e.target;
    btn.closest("tr").remove();
    var a = (e.target.parentNode.parentNode).innerHTML;
    var array = a.split("<td>");
    var product = array[1].replace('</td>','').trim();
    var quantity = array[2].replace('</td>','').trim();
    var price = array[3].replace('</td>','').trim();
    
    console.log(product +'  ' + quantity +'  '+ price);

    document.getElementById("productName").value = product;
    document.getElementById("quantity").value = quantity;
    document.getElementById("price").value = price;
    document.getElementById("AddProduct").style.display="none";
    document.getElementById("UpdateProduct").onclick = () => 
    {
        
        for(var i = 0; i < data.length; i++)

        {
            if(data[i].product  ==  product)
            {
                console.log(data[i].quantity);
                data[i].product = document.getElementById("productName").value;
                data[i].quantity = document.getElementById("quantity").value;
                data[i].price = document.getElementById("price").value;
                localStorage.setItem("Basket",JSON.stringify(data));
                break;
                
            }
        }
    }
    generateitems();

}


form.addEventListener("submit", addproduct);
table.addEventListener("click", onDeleteRow);
table.addEventListener("click", updateProductList);
generateitems();


// Validation

var isValidName = () => 
{
    var name = document.getElementById("productName").value;

    let regexForName = /^[a-zA-Z ]+$/;
    if(!regexForName.test(name))
    {
        document.getElementById("text2").innerHTML = "Product Name";
        errorMessage();
    }
}

var isValidQuantity = () => 
{
    var quantity = document.getElementById("quantity").value;

    let regexForQuantity = /[0-9]{1,9}/;
    if(!regexForQuantity.test(quantity))
    {
        document.getElementById("text2").innerHTML = "Quantity Name";
        errorMessage();
    }
}

var isValidPrice = () =>
{
    var price = document.getElementById("price").value;

    let regexForPrice = /[0-9]{1,9}/;
    if(!regexForPrice.test(price))
    {
        document.getElementById("text2").innerHTML = "Price";
        errorMessage();
    }
}







