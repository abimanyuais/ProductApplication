const form = document.querySelector("form");
const tableBody = document.getElementById("tbody");
const tableCart = document.getElementById("tableCard");
const table = document.querySelector("table");

data = JSON.parse(localStorage.getItem("Basket")) || [];
var products =  [];
var LogIn = JSON.parse(localStorage.getItem("NowLogIn")) || [];
email = LogIn[0];
var totalProducts=0;
var totalAmount=0;

function OpenProduct()
{
    window.location.replace("product.html");
}
function OpenLogOut()
{
    window.location.replace("login.html");
}
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
      <td><i class="fa-solid fa-minus deleteBtn bg-danger text-white"></i></td>
      <td><i class="fa-solid fa-plus AddBtn bg-success text-white"></i></td>
    </tr>`
    }).join(""));};
    generateitem();


}
console.log(data);
let generateitems = () => {
    var count = 1;
    return (tableBody.innerHTML=data.map((x) => {
        return`<tr>
      <td>${x.productName}</td>
      <td>${x.productQuantity}</td>
      <td>${x.productPrice}</td>
      <td><i class="fa-solid fa-minus deleteBtn bg-danger text-white"></i></td>
      <td><i class="fa-solid fa-plus AddBtn bg-success text-white" id="AddBtn"></i></td>
    </tr>`
    }).join(""));
    
}
generateitems();



let addproduct = (e) => 
{
    if (!e.target.classList.contains("AddBtn")) {
        return;
    }
    const btn = e.target;
    btn.closest("tr").remove();
    var a = (e.target.parentNode.parentNode).innerHTML;
    var array = a.split("<td>");
    var product = array[1].replace('</td>','').trim();
    var quantity = 1;
    var price = array[3].replace('</td>','').trim();

    var index = 1;
    for(var i = 0; i < data.length; i++)
    {
        console.log("Quantity : "+data[i].quantity)

        if(data[i].product === product && data[i].quantity > 0)
        {
            let search = products.find((x) => x.product === product)
            if(search === undefined) {
                total = price;
                products.push({email,product,quantity,price,total});
                console.log(email,product,quantity,price,total)
                totalProducts+=1;
                totalAmount+=Number(price);
            } else {
                search.quantity +=1;
                search.total = search.price * search.quantity;
                totalProducts+=1;
                totalAmount+=Number(price);
            }
            console.log(data[i].quantity);
            if(data[i].quantity == 0)
            {
                console.log("Overloaded product")
                document.getElementById("AddBtn").disabled = true;
            }
            data[i].quantity -=1;
            
            console.log("Index = " + index);
            localStorage.setItem("Basket",JSON.stringify(data));
            break;

        }

    }
    


    var perProduct = price / quantity;

    

    
    let generateitem = () => {return (tableCart.innerHTML=products.map((x) => {
        return`<tr>
      <td>${x.product}</td>
      <td>${x.quantity}</td>
      <td>${x.price}</td>
      <td>${x.total}</td>
    </tr>`
    }).join(""));};
    generateitem();
    generateitems();
    document.getElementById("totalAmount").innerHTML = totalAmount;
    document.getElementById("totalProduct").innerHTML = totalProducts;
}

var deleteProduces = [];
let removeProduct = (e) => 
{
    if (!e.target.classList.contains("deleteBtn")) {
        return;
    }
    const btn = e.target;
    btn.closest("tr").remove();
    var a = (e.target.parentNode.parentNode).innerHTML;
    var array = a.split("<td>");
    var product = array[1].replace('</td>','').trim();
    var quantity = 1;
    var price = array[3].replace('</td>','').trim();

    for(var i = 0; i < data.length; i++)
    {
        // if(data[i].quantity == 0)
        //     index = 0;
        if(data[i].product === product)
        {
            let search = products.find((x) => x.product === product)
            if(search === undefined) 
            {

            } else 
            {
                console.log("Search quantity  "+search.quantity);
                if(search.quantity >0)
                {
                    search.quantity -=1;
                    search.total = search.price * search.quantity;
                    totalProducts-=1;
                    totalAmount-=Number(price);

                    console.log(search.quantity);

                    console.log(data[i].quantity);
                    data[i].quantity +=1;
                    
                    localStorage.setItem("Basket",JSON.stringify(data));
                }
            }
            break;

        }

    }
    let generateitem = () => {return (tableCart.innerHTML=products.map((x) => {
        return`<tr>
      <td>${x.product}</td>
      <td>${x.quantity}</td>
      <td>${x.price}</td>
      <td>${x.total}</td>
    </tr>`
    }).join(""));};
    generateitem();
    generateitems();
    document.getElementById("totalAmount").innerHTML = totalAmount;
    document.getElementById("totalProduct").innerHTML = totalProducts;
    generateitems();

}

function navigateToCart()
{
    var OrderItems = JSON.parse(localStorage.getItem("totalOrderItems")) || [];
    var UserDetails = JSON.parse(localStorage.getItem("UserDB")) || [];
    var customerName;
    var emailAddress;

    var arr = JSON.parse(localStorage.getItem("Orders")) || [];
    produc = products.concat(arr);
    localStorage.setItem("Orders",JSON.stringify(produc));

    orderId = OrderItems.length + 1;
    for (var i = 0; i < UserDetails.length; i++)
    {
        if (UserDetails[i].email == LogIn[0])
        {
            customerName = UserDetails[i].name;
            emailAddress = UserDetails[i].email;
        }
    }
    var totalOrderItems = [];


    totalOrderItems.push({orderId,customerName,emailAddress,totalProducts,totalAmount})

    totalOrder = OrderItems.concat(totalOrderItems);
    localStorage.setItem("totalOrderItems",JSON.stringify(totalOrder));
    window.location.href = 'final.html';
}

table.addEventListener("click", addproduct);
table.addEventListener("click", removeProduct);


