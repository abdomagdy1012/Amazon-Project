import { cart } from "../../data/cart.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { getProduct } from "../../data/products.js";
import {formatCurrency} from "../shared/shared.js";
import {sendOrder} from '../../data/order.js';

export function renderPaymentSummary(){
        let cost = 0;
        let shippingCost = 0;
        let orderHtml;
    cart.forEach((cartItem)=>{
        let deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
        let product = getProduct(cartItem.productId);
        cost += cartItem.quantity *  product.priceCents
        shippingCost = deliveryOption.deliveryPriceCent
    })
    let totalBeforeTax = cost + shippingCost;
    let tax = totalBeforeTax *0.1;
    let totalAfterTax = tax + totalBeforeTax;

 orderHtml = 
`
        <div class="payment-summary-title">
                    Order Summary
                </div>

          <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">$${formatCurrency(cost)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(shippingCost)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totalBeforeTax)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(tax)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(totalAfterTax)}</div>
          </div>

          <button class="js-click-button place-order-button button-primary">
            Place your order
          </button>

`

document.querySelector('.js-payment-summary').innerHTML = orderHtml;

    document.querySelector('.js-click-button')
    .addEventListener('click' , async ()=>{
      try{
        const response = await fetch('https://supersimplebackend.dev/orders' , {
        method: 'post' ,
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          cart:cart
        })
      })
      
      const orders =  await response.json();
      sendOrder(orders);   
    } catch(err){
      console.log('error ... try again later')
    }
     window.location.href = 'orders.html'
  })
 
}