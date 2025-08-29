import {formatCurrency} from '../../scripts/utils/money.js';

// lets give this group of tests or the test suite, a name
console.log('test suite: formatCurrency');


// Test case 1 (Basic test case)
console.log('converts cents into dollars');

if (formatCurrency(2095) === '20.95'){
  console.log('passed');
} else {
  console.log('failed');
}

// That's it. This is our first automated test

// We cant run JavaScript files directly, we need to load this JavaScript file using an HTML file, So lets create a HTML file to run this test


// Test case 2 (Edge case)
console.log('works with 0');

if (formatCurrency(0) === '0.00'){
  console.log('passed');
} else {
  console.log('failed');
}
// That's how we test formatCurrency() in a different situation with the number of 0


// Test case 3 (Edge case)
console.log('rounds up to the nearest cent');

if (formatCurrency(2000.5) === '20.01'){
  console.log('passed');
} else {
  console.log('failed');
}





/* 
Disadvantages of Manual Testing

1. Hard to test in every situation 
2. Hard to re-test
 
Automated Testing = Using code to test code 

*/






// How many test cases should we have?

// 2 Types of Test Cases

// 1. Basic test cases ==> tests if the code is working or not
// 2. Edge cases ==> test the code with values that are little bit tricky (they are on the edge of what our code can handle)

// So when creating test cases, make sure to create basic test cases as well as edge cases, (if there are any adge cases)


// Group of related tests ===> called 'test suite'