import {formatCurrency} from '../../scripts/utils/money.js';

// Like before we are going to create tests for 'formatCurrency', therefore we need to import that function at the top

// Next ------> 
// we are going to create a test suite and name the test suite

// In jasmine to create a test suite, we are going to use a function called 'describe()'

/*
************************************************************************************
describe(description, specDefinitions) --->

Create a group of specs (often called a suite).
Calls to 'describe' can be nested within other calls to compose your suite as a tree.

*/

/*
***********************************************************************************
it(description, testFunction(optional), timeout(optional)) --->

Define a single spec. 
A spec should contain one or more [expectations] that test the state of the code.


A spec whose expectations all succeed will be passing and a spec with any failures will fail.
The name [it] is a pronoun for the test target, not an abbreviation of anything.
It makes the spec more readable by connecting the function name [it] and the argument [description] as a complete sentence.


*/


/*
************************************************************************************
expect(actual) --> {matchers}

Create an expectation for a spec(test).

Parameters:
Name   |    Type     |  Description
actual |    Object   |  Actual computed value to test expectations against.
*/



describe('test suite: formatCurrency', () => {
  //inside here we are going to create tests and give the test a name
  it('converts cents into dollars', () => {
    // So this is the code inside the test
    expect(formatCurrency(2095)).toEqual('20.95');
  });

  it('works with 0', () => {
    expect(formatCurrency(0)).toEqual('0.00');
  });

  it('rounds up to the nearest cent', () => {
    expect(formatCurrency(2000.5)).toEqual('20.01');
  });

});


// There is one more thing I want to mention which is we can use 'describe()' inside another 'describe()' --> this helps us organize our tests further

/*

describe('test suite: formatCurrency', () => {
  describe('rounding', () => {

  })
})

*/