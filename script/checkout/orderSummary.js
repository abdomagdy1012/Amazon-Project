import {cart , removeFromCart , updateDeliveryOption} from '../../data/cart.js';
import { getProduct } from '../../data/products.js';
import { formatCurrency } from '../shared/shared.js';
import dayJs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js'
import { deliveryOptions, getDeliveryOption } from '../../data/deliveryOptions.js';


export function renderOrderSummary(){
let checkHtml = '';

cart.forEach((cartItem) =>{
    const productId = cartItem.productId
    let matchingItems = getProduct(productId);

    let deliveryOptionId = cartItem.deliveryOptionId
    let deliveryOption = getDeliveryOption(deliveryOptionId);

        let today = dayJs();

        let deliveryDays = today.add(
        deliveryOption.deliveryDay,
        'days'
        );

        let formatedDate = deliveryDays.format('dddd, MMMM D');
        
   


    checkHtml += `
    <div class="cart-item-container js-container-${matchingItems.id}">
        <div class="delivery-date ">
            Delivery date: ${formatedDate}
        </div>

        <div class="cart-item-details-grid">
            <img class="product-image"
            src="${matchingItems.image}">

            <div class="cart-item-details">
            <div class="product-name">
                ${matchingItems.name}
            </div>
            <div class="product-price">
                $${matchingItems.getProductPrice()}
            </div>
            <div class="product-quantity">
                <span>
                Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary">
                Update
                </span>
                <span class="delete-quantity-link link-primary js-delete-button" data-product-id = "${matchingItems.id}">
                Delete
                </span>
            </div>
            </div>

            <div class="delivery-options">
            <div class="delivery-options-title">
                Choose a delivery option:
            </div>
                ${upToDate(matchingItems,cartItem)}
            </div>
        </div>
    </div>
    `
});

document.querySelector('.js-summary').innerHTML = checkHtml

document.querySelectorAll('.js-delete-button').forEach((link) =>{
    link.addEventListener('click' , ()=>{
        const productId = link.dataset.productId;
        removeFromCart(productId);

        let container = document.querySelector(`.js-container-${productId}`);
        container.remove();
    });
})


function upToDate(matchingItems, cartItem){
    let html = '';
    deliveryOptions.forEach((deliveryOption) =>{
        let today = dayJs();

        let deliveryDays = today.add(
        deliveryOption.deliveryDay,
        'days'
        );

        let formatedDate = deliveryDays.format('dddd, MMMM D');
        
        let deliveryPrice;
        if(deliveryPrice =deliveryOption.deliveryPriceCent === 0){
             deliveryPrice ='free'
        } else {
            deliveryPrice= `$${formatCurrency(deliveryOption.deliveryPriceCent)
        }`}

        const isChecked = deliveryOption.Id ==
        cartItem.deliveryOptionId;

       html += 
       `
        <div class="delivery-option
        js-delivery-option
        "
        data-product-id="${matchingItems.id}"
        data-delivery-option-id = "${deliveryOption.Id}">
            <input 
            type="radio" 
                class="delivery-option-input"
                name="delivery-option-1-${matchingItems.id}"
                ${isChecked ? "checked" : ""}>
            <div>
                <div class="delivery-option-date js-delivery-date">
                    ${formatedDate}
                </div>
                <div class="delivery-option-price">
                    ${deliveryPrice} Shipping
                </div>
            </div>
        </div>
       `
    })

    return  html;
}

document.querySelectorAll('.js-delivery-option').forEach((element)=>{
    element.addEventListener('click', ()=>{
        const {productId , deliveryOptionId} = element.dataset
        updateDeliveryOption(productId , deliveryOptionId)
        renderOrderSummary();
    })
    })

}