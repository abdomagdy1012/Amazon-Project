function loadOrders() {
  try {
    const stored = localStorage.getItem('order');
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.warn("Corrupted order data removed");
    localStorage.removeItem('order');
    return [];
  }
}


export const orders = loadOrders();

export function sendOrder(order){
    orders.unshift(order)
    saveToStorage();
}

function saveToStorage(){
    localStorage.setItem('order' , JSON.stringify(orders));
}

