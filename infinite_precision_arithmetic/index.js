class InfiniteNumber {

  /** An internal member Array to contain the digits of the Infinite Integer
   * @type {Array<Number>}
   */
  _internalArray = [];
  constructor(inputObject) {

    //if the InputObject is a number
    if (typeof inputObject === "number") {
      console.log("You sent a number");

      if (Number.isInteger(inputObject) && inputObject >= 0 && inputObject % 1 === 0) {
        // initialize the member array
        let temp = 0;
        while (inputObject != 0) {
          temp = inputObject % 10;
          this._internalArray.unshift(temp);
          inputObject = Math.floor(inputObject / 10);
        }
      }
      else
        throw new Error(`The number ${inputObject} is not an integer between 0 and 9`);
    }

    //If the InputObject is a String
    else if (typeof inputObject === "string") {
      console.log("You sent a String");

      // TODO validate the String and only then initialize the _internalArray
      if (!isNaN(inputObject) && inputObject.trim() !== '') {
        throw new Error(`The string ${inputObject} is not a number`);
      }
      // initialize the member array
      inputObject = parseInt(inputObject);
      while (inputObject != 0) {
        let temp = inputObject % 10;
        this._internalArray.unshift(temp);
        inputObject = Math.floor(inputObject / 10);
      }
    }

    //If the Input Object is a Array
    else if (Array.isArray(inputObject)) {
      console.log("You sent an Array");

      // TODO validate the individual elements of the inputArray and initialize
      for (let index = 0; index < inputObject.length; index++) {
        if (Number.isInteger(inputObject[index]) && inputObject[index] >= 0 && inputObject[index] % 1 === 0) {
          this._internalArray.push(inputObject[index]);
        }
      }
    }

    //If the Input Object is an Object 
    else if (typeof inputObject === "object") {
      console.log("You sent an Object");

      if (inputObject.getInternalArray && typeof inputObject.getInternalArray === 'function') {
        this._internalArray = inputObject.getInternalArray().slice();
      } else {
        throw new Error(`Object does not have the required method getInternalArray()`);
      }
    }
    // None of the input data matches the datatype
    else {
      console.log("None of the datatype matches your input");
      throw new Error(`Constructor of InfiniteNumber does not support this data type ${typeof inputObject}`);
    }
  }

  /** Helper method to return the _internalArray variable which contains the
  * Infinite precision Integer.
     * @returns {Array<Number>} the internal array representing individual digits
     */
  getInternalArray() {
    return this._internalArray;
  }

  /** Helper method to return the representation of this Infinite Precision
   * @returns {string} the internal array representing indiviidual array
   */
  getNumberAsString() {
    return this._internalArray.join('');
  }

  addition(num1Array) {
    console.log(num1Array)
    console.log(this._internalArray)

    let sumArray = []    //summation array 
    let carry = 0;       // carry for forward propogation in addition
    // max length use for padding the shorter length array with 0
    let maxLength = Math.max(num1Array.length, this._internalArray.length);

    // Ensure both arrays have the same length by padding zeros to the front
    while (num1Array.length < maxLength) {
      num1Array.unshift(0);
    }
    while (this._internalArray.length < maxLength) {
      this._internalArray.unshift(0);
    }

    for (let index = num1Array.length - 1; index >= 0; index--) {
      //condtion for addition of two number
      let sum = num1Array[index] + this._internalArray[index] + carry;
      // Add digits along with carry
      sumArray.unshift(sum % 10) // Store the least significant digit of sum
      carry = sum >= 10 ? 1 : 0; // Update carry for next iteration
    }
    if (carry > 0) {
      sumArray.unshift(carry);
    }

    return sumArray
  }

  subtraction(num1Array) {
    let subArray = [];
    // checking the condition for which is greater number based on first digit.
    if (num1Array[0] > this._internalArray[0]) {
      subArray = this.minusDigit(num1Array, this._internalArray)
      subArray.unshift('-')
    }
    else {
      subArray = this.minusDigit(this._internalArray, num1Array)

    }
    return subArray;
  }

  minusDigit(max_array, min_array) {
    let subArray = [];  // subtracted array
    let borrowCount = 0;  // count keeps up the borrow number
    // temporary variable 

    for (let index = max_array.length - 1; index >= 0; index--) {
      let temp
      //checks the difference between each digit in the array
      //if the digits difference is smaller than 
      if (max_array[index] - min_array[index] < 0) {
        // if any borrow is not taken then count is zero
        if (borrowCount === 0) {
          max_array[index] += 10
          temp = max_array[index] - min_array[index]
          subArray.push(temp)
          borrowCount++;
        }
        else {
          // 1 is substracted from adding than 10 as borrow is taken. 
          max_array[index] += 9
          subArray.push(max_array[index] - min_array[index])
        }
      }
      //normal case when max_number's digit is greater than the min_number's digit
      else {
        //if borrow is taken than -1 is done
        if (borrowCount > 0) {
          temp = max_array[index] - min_array[index] - 1
          borrowCount--;
        }
        //borrow is not taken so normal subtraction
        else {
          temp = max_array[index] - min_array[index]
        }
        subArray.push(temp)
      }
    }
    return subArray.reverse()
  }


  multiplication(num1Array) {
    let mulArray = []; // Initialize the result array

    // Iterate through each digit of the second number in reverse order
    for (let index2 = this._internalArray.length - 1; index2 >= 0; index2--) {
        let carry = 0;
        let tempResult = new Array(this._internalArray.length - 1 - index2).fill(0); // Add appropriate number of leading zeros

        // Multiply current digit of the second number with each digit of the first number
        for (let index = num1Array.length - 1; index >= 0; index--) {
            let product = num1Array[index] * this._internalArray[index2] + carry;
            tempResult.unshift(product % 10); // Add the least significant digit to the temporary result
            carry = Math.floor(product / 10); // Update the carry
        }

        // If there's any remaining carry after multiplying all digits of the first number
        if (carry > 0) {
            tempResult.unshift(carry);
        }

        // Add the temporary result to the final result
        mulArray = this.addition2(mulArray,tempResult);
    }
    console.log(mulArray)
    return mulArray;
}

/**Addition of the two element
 * @param {Array} num1Array This is the first number
 * @param {Array} num2Array this is the second number  
 */
addition2(num1Array, num2Array) {
	let sumArray = []    //summation array 
	let carry = 0;       // carry for forward propogation in addition
	// max length use for padding the shorter length array with 0
	let maxLength = Math.max(num1Array.length, num2Array.length);

    // Ensure both arrays have the same length by padding zeros to the front
    while (num1Array.length < maxLength) {
        num1Array.unshift(0);
    }
    while (num2Array.length < maxLength) {
        num2Array.unshift(0);
    }
	
	for (let index = num1Array.length - 1; index >= 0; index--){
		//condtion for addition of two number
		let sum = num1Array[index] + num2Array[index] + carry; 
		// Add digits along with carry
		sumArray.unshift(sum % 10) // Store the least significant digit of sum
		carry = sum >= 10 ? 1 : 0; // Update carry for next iteration
		}
		if (carry > 0) {
			sumArray.unshift(carry);	
	}	
	return sumArray
}

dividing(divisor) {
  // Ensure divisor and this._internalArray are not empty
  if (divisor.length === 0 || this._internalArray.length === 0) {
    throw new Error("Divisor or this._internalArray cannot be empty.");
  }
  // Handle division by zero
  if (this.isEqual(divisor, [0])) {
    throw new Error("Division by zero error.");
  }

  // Initialize quotient and remainder arrays
  let quotientArray = [];
  let remainderArray = [];

  // Iterate through each digit of the this._internalArray
  for (let i = 0; i < this._internalArray.length; i++) {
    // Bring down the next digit from the this._internalArray
    remainderArray.push(this._internalArray[i]);

    // Perform division
    let quotientDigit = 0;

    while (this.isGreaterOrEqual(remainderArray, divisor)) {
      remainderArray = this.subtract(remainderArray, divisor);
      quotientDigit++;
    }
    quotientArray.push(quotientDigit);
  }


  // Remove leading zeros from quotient
  quotientArray = this.removeLeadingZeros(quotientArray);

  // Return quotient and remainder
  console.log(quotientArray);
  console.log(remainderArray.reverse());

}


// Function to check if array a is greater than or equal to array b
 isGreaterOrEqual(num1, num2) {
  if (num1.length > num2.length) return true;
  if (num1.length < num2.length) return false;
  for (let i = 0; i < num1.length; i++) {
    if (num1[i] > num2[i]) return true;
    if (num1[i] < num2[i]) return false;
  }
  return true;
}

// Function to subtract array b from array a
subtract(num1, num2) {
  let result = [];
  let borrow = 0;
  for (let i = num1.length - 1; i >= 0; i--) {
    let diff = num1[i] - (num2[i] || 0) - borrow;
    if (diff < 0) {
      diff += 10;
      borrow = 1;
    } else {
      borrow = 0;
    }
    result.unshift(diff);
  }
  return result;
}

// Function to remove leading zeros from an array
 removeLeadingZeros(array) {
  let i = 0;
  while (i < array.length - 1 && array[i] === 0) {
    i++;
  }
  return array.slice(i);
}

// Function to check if two arrays are equal
isEqual(array1, array2) {
  if (array1.length !== array2.length) return false;
  for (let i = 0; i < array1.length; i++) {
    if (array1[i] !== array2[i]) return false;
  }
  return true;
}


}

let numArray2 = [2, 4]
const num2ArrayPass = new InfiniteNumber(numArray2)
num2ArrayPass.getNumberAsString() // Corrected this line

let num1Array = [1, 2]
console.log(`The addition is ${num2ArrayPass.addition(num1Array)}`)
console.log(`The subtraction is ${num2ArrayPass.subtraction(num1Array)}`)
console.log(`The multiplication is ${num2ArrayPass.multiplication(num1Array)}`)
num2ArrayPass.dividing(num1Array)


