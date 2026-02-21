class Cart{
    cartItems = undefined;
    localStorageKey= undefined;
    
    constructor(localStorageKey){
        this.localStorageKey = localStorageKey
        this.loadFromStorage();
    }

    loadFromStorage(){
    this.cartItems =    
       [ {
            productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity: 2,
            deliveryOptionId: '1'
            },
            {
            productId:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
            quantity:1,
            deliveryOptionId: '2'
            }
        ]
    
    try{
    const stored = localStorage.getItem(this.localStorageKey)
    if (stored) {this.cartItems = JSON.parse(stored)}
    } catch (e) {
    console.warn('Invalid cart data, resetting', e)
    localStorage.removeItem(this.localStorageKey)
    }
    };

    saveToStorage(){
    localStorage.setItem(this.localStorageKey , JSON.stringify(this.cartItems))
    };

    addToCart(productId){
    let matchingItems = '';
        this.cartItems.forEach((cartItem)=>{
            if (productId === cartItem.productId) {
                matchingItems = cartItem
            }
            })
            if(matchingItems){
                matchingItems.quantity += 1
            } else{
                this.cartItems.push({
                    productId : productId,
                    quantity : 1,
                    deliveryOptionId: '1'
            })
            }
        this.saveToStorage();
        };
        


    removeFromCart(productId){
    let newCart = []; 
        this.cartItems.forEach((cartItem) =>{
        if(cartItem.productId !== productId){
            newCart.push(cartItem);
        }
        
    })
        this.cartItems = newCart;
        this.saveToStorage();
    };

    updateToDate(productId,deliveryOptionId){
     let matchingItems = '';
        this.cartItems.forEach((cartItem)=>{
            if (productId === cartItem.productId) {
                matchingItems = cartItem
            }
            })
        matchingItems.deliveryOptionId = deliveryOptionId;

        this.saveToStorage();
    };

    updateDeliveryOption(productId , deliveryOptionId){
     let matchingItems;
        this.cartItems.forEach((cartItem) =>{
        if(productId === cartItem.productId){
            matchingItems = cartItem
        }
    })
    matchingItems.deliveryOptionId = deliveryOptionId;
    this.saveToStorage();
    }

}

const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');

console.log(cart)
console.log(businessCart)
