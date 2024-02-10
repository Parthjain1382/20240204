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
	let num1Array = [1,2,3], num2Array = ["r"]
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


/**This function is for dividing the number present in the array.
 * @param {Array} divident It takes input num1 which is divident
 * @param {Array} divisor It takes input num2 which is divisor
 * @return {Array} quotientArray It returns the quotient array
 * @returns {Array} remainderArray It return the remainder array
 */

// function dividing(divisor,divident){

// 	let maxLength = Math.max(divisor.length, divident.length);
	
// 	while(divident,)

// }

