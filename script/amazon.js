import {cart , addToCart} from '../data/cart.js';
import {products , loadProductFetch} from '../data/products.js';


async function loadPage() {
    await loadProductFetch()
    reloadPage();
}

loadPage();


function reloadPage(){
let htmlContainer='';
products.forEach((product) => {
    htmlContainer += `
    
        <div class="border">
            <div class="product">
                <div class="img-container">
                    <img class="Athelitic" src="${product.image}" alt="">
                </div>
                <p>${product.name}</p>
                <div class="rating">
                    <img src="${product.getProductRating()}" alt="">
                    <span>${product.rating.count}</span>
                </div>
                <div class="product-cost">$${(product.priceCents /100).toFixed(2)}</div>
                <div class="select-number">
                    <select name="cars" id="cars">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>
                 ${product.getInfoDetails()}
                </div>
               
                <button class="add-to-cart" data-product-id = ${product.id}>Add to Cart</button>
            
            </div>
        </div>

`;
});

function updateTheCart(){
        let  cartQuantity = 0;
            cart.forEach((item) =>{
                cartQuantity += item.quantity;
            })
            document.querySelector('.cart-num').innerHTML =cartQuantity;
}
document.querySelector('.container').innerHTML = htmlContainer

document.querySelectorAll('.add-to-cart').forEach((button) => {
    button.addEventListener('click' , () => {
        let productId = button.dataset.productId;
        
        addToCart(productId);
        updateTheCart();
    })

})




}
