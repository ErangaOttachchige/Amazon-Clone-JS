// to contain all of our orders
export const orders = JSON.parse(localStorage.getItem('orders')) || [];  // in the beginning we are not gonna have any orders saved in localStorage, 
// therefore we can give this a default value as well --> [], so if there nothing in localStorage, it is going to use this empty array as a default

// For adding an order to this above array
export function addOrder(order) {                                                  // we will give this function an 'order' object and we gonna add it to the above array
  orders.unshift(order);                                     // for orders we usually want the most recent order at the top, so we gonna add this 'order' to the front of this array
  // this will add the 'order' to the front of the array instead of the back

  // when we modify this array we are going to save this in localStorage
  saveToStorage();
}

// Finally lets save our orders into localStorage
function saveToStorage() {
  localStorage.setItem('orders', JSON.stringify(orders));
}