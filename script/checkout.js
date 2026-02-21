import {loadProductFetch } from '../data/products.js';
import { loadCartFetch } from '../data/cart.js';
import {renderOrderSummary} from './checkout/orderSummary.js'
import { renderPaymentSummary } from './checkout/paymentSummary.js';
//import '../data/backend-practice.js';



async function loadPage(){
  try{  
  await loadProductFetch();

    loadCartFetch();
  } catch(err){
    console.log('we catch an error. sorry try later')
  }
      renderOrderSummary();
      renderPaymentSummary();
}

loadPage()

// Promise.all([
//     loadProductFetch(),
//     new Promise((resolve)=>{
//         loadCart(()=>{
//             resolve();
//         });
//      })
// ]).then(()=>{
//     renderOrderSummary();
//     renderPaymentSummary();
// })




 //we use new promise here cause we are using
 //  httpRequest and we convert it to promise

// Promise.all([
//     new Promise((resolve)=>{
//         loadProducts(()=>{
//             resolve();
//         })
//     }),
//     new Promise((resolve)=>{
//         loadCart(()=>{
//             resolve();
//         });
//      })
// ]).then(()=>{
//     renderOrderSummary();
//     renderPaymentSummary();
// })



//using promises one by one

// new Promise((resolve)=>{
//     loadProducts(()=>{
//         resolve()
//     });
// }).then(()=>{
//      return new Promise((resolve)=>{
//         loadCart(()=>{
//             resolve();
//         });
//      });
// }).then(()=>{
//     renderOrderSummary();
//     renderPaymentSummary();
// })



//using callbacks Before Promises

// loadProducts(()=>{
//     loadCart(()=>{
//         renderOrderSummary();
//         renderPaymentSummary();
//     });
// })


