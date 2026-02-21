import { orders } from "../data/order.js";
import { loadProductFetch, getProduct } from "../data/products.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { formatCurrency } from "./shared/shared.js";
import { getDeliveryOption } from "../data/deliveryOptions.js";

async function renderOrder(){
    await loadProductFetch();
    let orderHtml='';

    orders.forEach((order)=>{
        const orderDate = dayjs(order.orderTime).format('MMMM D')

        orderHtml += 
        `
        <div class="order-container">
          
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${orderDate}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${formatCurrency(order.totalCostCents)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${order.id}</div>
            </div>
          </div>

        <div class="order-details-grid">
            ${productList(order)}
        </div>
        `
    });

    function productList(order){
        let productListHtml='';
        
        order.products.forEach((details)=>{
            let productId = details.productId
            let  productDetails = getProduct(productId)
            let deliverydate = dayjs(details.estimatedDeliveryTime).format('MMMM D');
        
            productListHtml +=
        `
        <div class="product-image-container">
            <img src="${productDetails.image}">
            </div>

        <div class="product-details">
                <div class="product-name">
                ${productDetails.name}
                 </div>
                <div class="product-delivery-date">
                Arriving on: ${deliverydate}
                </div>
                <div class="product-quantity">
                Quantity: ${details.quantity}
                </div>
                <button class="buy-again-button button-primary">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
                </button>
        </div>

         <div class="product-actions">
          <a href="tracking.html?orderId=${order.id}&productId=${productId}">
            <button class="track-package-button button-secondary">
              Track package
            </button>
          </a>
        </div>
      `;
        })
        console.log(order.id)
        return productListHtml
       
    }
document.querySelector('.js-display-order').innerHTML = orderHtml;


}
renderOrder()
