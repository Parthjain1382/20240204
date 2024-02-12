/**Addition, substraction, Multiplication and division of two numbers 
 * where each digit is stored as an element in array  
 * @author Pranay
 */

//function for input of number array
inputNumbers()

/**Addition of the two element
 * @param {Array} num1Array This is the first number
 * @param {Array} num2Array this is the second number  
 */
function addition(num1Array, num2Array) {
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


/**Substraction of the two array elements
 * @param {Array} num1Array Take as an input array of num1
 * @param {Array} num2Array Take as an input array of num2
 * @returns {Array} subArray Gives return of substracted array
 */
function subtraction(num1Array, num2Array) {
	let subArray = [];

	// checking the condition for which is greater number based on first digit.
	if (num1Array[0] > num2Array[0]) {
		subArray = minusDigit(num1Array, num2Array)
		subArray.unshift('-')
	}
	else {
		subArray = minusDigit(num2Array, num1Array)
		
	}
	return subArray;
}


/**Multiplying the two numbers 
 * @param {Array} num1Array It takes num1 (array) as input
 * @param {Array} num2Array It takes num2 (array) as input 
 * @returns {Array} subArray It return the calculated array 
 */
function multiplying(num1Array, num2Array) {
    let mulArray = [0]; // Initialize the result array with 0

    // Iterate through each digit of the second number
    for (let index2 = num2Array.length - 1; index2 >= 0; index2--) {
        let carry = 0;
        let tempResult = []; // Temporary result for current digit multiplication

        // Multiply current digit of the second number with each digit of the first number
        for (let index = num1Array.length - 1; index >= 0; index--) {
            let product = num1Array[index] * num2Array[index2] + carry;
            tempResult.unshift(product % 10); // Add the least significant digit to the temporary result
            carry = Math.floor(product / 10); // Update the carry
        }
        // If there's any remaining carry after multiplying all digits of the first number
        if (carry > 0) {
            tempResult.unshift(carry);
        }
		// Add appropriate number of zeros to the end of temporary result based on position
        for (let k = num2Array.length - 1; k > index2; k--) {
            tempResult.push(0);
        }
		
        // Add the temporary result to the final result
        mulArray = addition(mulArray, tempResult);
    }
    return mulArray;
}



/**substracting the individual digits and passed acc to their max and min
 * @param {Array} max_array The greater number in either of two 
 * @param {Array} min_array The smaller number in either of two 
 * @returns {Array} It return num1-num2 as subArray
 * */
function minusDigit(max_array, min_array) {
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


/**This function is Accessing the numbers and size of array from the user
 * @throws {Error} when 1. both array is empty,
 *                      2. another data type than number is present
 * 						which is tested by the testing function 
 */
function inputNumbers() {
	//intialize the number array 
	let num1Array = [2,0], num2Array = [5,0,0]
	//printing the numbers
	console.log("The number1 is " + num1Array)
	console.log("The number2 is " + num2Array)

	// Testing the number provided by passing number to function
	// This also checks whether the array is empty or not 
	if (testingNumber(num1Array) && testingNumber(num2Array) && num1Array.length>0 && num2Array.length>0) {
		// summation, addition, multiplying the number calls in console 
		console.log("The sum of the two numbers is ")
		console.log(addition(num1Array, num2Array))
		console.log(`The subtrction of the two numbers is num2-num1 is `)
		console.log(subtraction(num1Array, num2Array))
		console.log("the multiplied array is")
		console.log(multiplying(num1Array, num2Array))
		console.log("the quotient and remainder are")
		dividing(num1Array,num2Array)
	}
	else{
		throw new Error("Testing case failed or length is smaller than 0");
	}
}



/** This function is testing the element of the array
 * @param {Array} num1Array Takes first number array
 * @returns {true} If both the number element are integer
 * @throws {Error} when 1. another data type than number is present
 *                      2. digit is smaller to 0 or greater than 9
 */
function testingNumber(numArray) {
	for (let index = 0; index < numArray.length; index++) {
	if (!Number.isInteger(numArray[index]) || numArray[index] < 0 || numArray[index] > 9) {
		throw new Error(`The number ${numArray[index]} is not an integer between 0 and 9`);
		}
	}
	return true
}



/**This Function is responsible for checking if passed parameter is greater or 
* smaller than other
* @param {Array} array1 first array 
* @param {Array} array2 second array 
*/
function dividing(divisor,dividend) {
    // Ensure divisor and dividend are not empty
    if (divisor.length === 0 || dividend.length === 0) {
			throw new Error("Divisor or dividend cannot be empty.");
	}

	// Handle division by zero
	if (isEqual(divisor, [0])) {
			throw new Error("Division by zero error.");
	}

	// Initialize quotient and remainder arrays
	let quotientArray = [];
	let remainderArray = [];

	// Iterate through each digit of the dividend
	for (let i = 0; i < dividend.length; i++) {
			// Bring down the next digit from the dividend
			remainderArray.push(dividend[i]);

			// Perform division
			let quotientDigit = 0;

			while (isGreaterOrEqual(remainderArray, divisor)) {
					remainderArray = subtract(remainderArray, divisor);
					quotientDigit++;
			}

			quotientArray.push(quotientDigit);

	}
	

	// Remove leading zeros from quotient
	quotientArray = removeLeadingZeros(quotientArray);

	// Return quotient and remainder
	console.log(quotientArray);

	console.log(remainderArray.reverse());

}

// Function to check if array a is greater than or equal to array b
function isGreaterOrEqual(a, b) {
	if (a.length > b.length) return true;
	if (a.length < b.length) return false;
	for (let i = 0; i < a.length; i++) {
			if (a[i] > b[i]) return true;
			if (a[i] < b[i]) return false;
	}
	return true;
}

// Function to subtract array b from array a
function subtract(a, b) {
	let result = [];
	let borrow = 0;
	for (let i = a.length - 1; i >= 0; i--) {
			let diff = a[i] - (b[i] || 0) - borrow;
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
function removeLeadingZeros(array) {
	let i = 0;
	while (i < array.length - 1 && array[i] === 0) {
			i++;
	}
	return array.slice(i);
}

// Function to check if two arrays are equal
function isEqual(array1, array2) {
	if (array1.length !== array2.length) return false;
	for (let i = 0; i < array1.length; i++) {
			if (array1[i] !== array2[i]) return false;
	}
	return true;
}
