
export let deliveryOptions = [
    {
        Id : 1,
        deliveryDay : 7,
        deliveryPriceCent : 0
    },
    {
        Id : 2,
        deliveryDay : 3,
        deliveryPriceCent : 499
    },
    {
        Id : 3,
        deliveryDay : 1,
        deliveryPriceCent : 999
    }
]
export function getDeliveryOption(deliveryOptionId){
    let deliveryOption;
    deliveryOptions.forEach((Option)=>{
        if(Option.Id == deliveryOptionId){
            deliveryOption = Option
        }
    })
    return deliveryOption  || deliveryOptions[0];
}

