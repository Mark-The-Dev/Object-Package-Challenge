/*


Object repackage test.



*/

//inputs (non static):
// can change these for a test case :)

let boxes = {
  boxSet1: [
    { averageBox: 10 },
    { bigBox: 19 },
    { specialBox: 7 },
    { oddBox: 15 },
  ],
  boxSet2: [{ otherBox: 4 }, { somethingBox: 11 }, { anotherOne: 21 }],
  boxSet3: [{ shoeBox: 5 }, { smallBox: 1 }],
};

let orders = {
  customer1: [
    { productName1: 7 },
    { productName2: 18 },
    { productName3: 47 },
    { productName4: 11 },
  ],
  customer2: [
    { productName1: 15 },
    { productName2: 73 },
    { productName3: 12 },
    { productName4: 3 },
  ],
};

function orderFulfillment(boxes, orders) {
  // step 1: organize boxes into a single list with names and values.

  // set boses into a single area of objects
  let sortedBoxs = [];
  Object.entries(boxes).forEach(([key, value]) => {
    Object.values(value).forEach((item) => {
      sortedBoxs.push(item);
    });
  });

  // sort array of objects by highest value first.
  sortedBoxs.sort((a, b) => {
    return Object.values(b) - Object.values(a);
  });

  let packagedObject = {};

  //loop through orders to generate packaged object

  //grab each object within orders
  Object.entries(orders).forEach(([key, value]) => {
    // create a new customer object
    let customerObject = {};

    //set customer name
    let customerName = key;

    // loop through the products
    for (let j = 0; j < value.length; j++) {
      // set variables for product name and quantity
      let amountOfProduct = Object.values(value[j]).pop();
      let productName = Object.keys(value[j]).pop();

      // generate customer object
      customerObject[productName] = {
        // helper function to generate minimum boxes and names for pack
        packs: findMinimumBoxCount(amountOfProduct, sortedBoxs),
        quantity: amountOfProduct,
      };
      //can use this console.log to verify the packages for product!
      console.log(productName);
      console.table(findMinimumBoxCount(amountOfProduct, sortedBoxs));
    }

    packagedObject[customerName] = customerObject;
  });

  return packagedObject;
}

// helper function to find the minimum boxs, takes an array of objects
// this takes a sorted array with highest value first (done in above function)
function findMinimumBoxCount(targetValue, objectArray) {
  // final return array
  let items = [];

  // current array of items
  let currentItems = [];

  // value for smallest array that meets criteria
  let smallest = Infinity;

  //tracks running sum
  let currentSum = 0;

  // counter for tracking array size. (I could use array.length for refactor)
  let counter = 0;

  // loop through array
  for (let i = 0; i < objectArray.length; i++) {
    // set a variable for the value at index
    let thisVal = Object.values(objectArray[i]).pop();

    // inner loop that adds values to a current items array based on conditons
    while (thisVal <= targetValue && currentSum + thisVal <= targetValue) {
      // sets current array tracks running sum and counter
      currentSum += thisVal;
      currentItems.push(objectArray[i]);
      counter++;
    }

    // if the target value is hit do this
    if (currentSum === targetValue) {
      // if the new value is a smaller array then previous one
      if (counter < smallest) {
        // adjust variables and replace items array
        smallest = counter;
        items = currentItems;
        currentItems = [];
        counter = 0;
        currentSum = 0;
      }
    }
  }

  return items;
}

function main() {
  console.log(orderFulfillment(boxes, orders));

  // simple Object array below to test the helper function

  // let objArr = [
  //   { anotherOne: 21 },
  //   { bigBox: 19 },
  //   { oddBox: 15 },
  //   { somethingBox: 11 },
  //   { averageBox: 10 },
  //   { specialBox: 7 },
  //   { shoeBox: 5 },
  //   { otherBox: 4 },
  //   { smallBox: 1 },
  // ];

  //findMinimumBoxCount(20, objArr);
}

main();
