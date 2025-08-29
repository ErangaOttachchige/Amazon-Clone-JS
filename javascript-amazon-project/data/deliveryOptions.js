export const deliveryOptions = [{
  id: '1',
  deliveryDays: 7,
  priceCents: 0
}, {
  id: '2',
  deliveryDays: 3,
  priceCents: 499  
}, {
  id: '3',
  deliveryDays: 1,
  priceCents: 999  
}];


export function getDeliveryOption(deliveryOptionId) {

  let deliveryOption;  // this variable is for store the result

  deliveryOptions.forEach((option) => {
    if(option.id === deliveryOptionId) {
      deliveryOption = option;   // So Now we have the full delivery Option details for a one product including 'priceCents'
    }
  });

  // Just to be safe, lets also give this a default value if we dont find a delivery option, lets make the default value as the first delivery option
  // || --> default operator
  return deliveryOption || deliveryOptions[0];
  
  // because from 'return' we can use this 'deliveryOption' outside of this function

}

