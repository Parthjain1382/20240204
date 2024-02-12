/** get 2's complement of a number 
 * 1.getSimple'sComplement(number,numLenght) of size 11,52
 * 2.getSimpleDecimal2'sComplement
 * 3.getJsNumberRepresentation(Number)  give array of lenght of 52
 * 4.getNumericFromJsRepresentation[<---52---->] 
 */


let binaryArray = [];
let twosarray = [];

/**Converting the number into binary 
 * Condititon 1: If the number is positive the normally convert into binary 
 *               return it.
 * Condition 2: If the number is negative the get the 2's complement and 
 *              return it.
 * @param {Number} num Takes number as an input for converting into binary
 * @param {Number} numLenght Take the total number of bits to represent the number
 * @return {Array} It returns the array 
 */
function getSimple2sComplement(num, numLength) {
    if (num >= 0) {
        number2binary(num, numLength);
    } else {
        number2binary(-num, numLength);
        binaryArray = binaryArray.reverse();
        for (let index = 0; index < binaryArray.length; index++) {
            if (binaryArray[index] == 1) {
                twosarray.push(0);
            } else {
                twosarray.push(1);
            }
        }
     
        get2sComplement(twosarray, numLength);
    }
}

/**It takes input as num and length and calculates binary number of number
 * It just convert given number into binary
 * @param {Array} num number passed as array 
 * @param {number} numLength length of the array 
 */
function number2binary(num, numLength) {
    let temp;
    for (let index = 0; index < numLength; index++) {
        temp = num % 2;
        binaryArray.push(temp);
        num = Math.floor(num / 2);
    }
}

/**Getting the 2's Complement of a number
 * @param {Array} twosarray 2's complement of an array
 * @param {number} numLength length of the number
 */
function get2sComplement(twosarray, numLength) {
    let carry = 1;
    for (let index = numLength - 1; index >= 1; index--) {
        // as 1+1 = 10 then carry becomes 1 again
        if (twosarray[index] + carry > 1) {
            twosarray[index] = 0;
            carry = 1;
        } else {  //1+0 case where carry becomes 0
            twosarray[index] = carry + twosarray[index];
            carry = 0;
        }
    }
    twosarray[numLength - 1] = 1; //condition for negative integer
    binaryArray = twosarray;
    console.log("The binary number in 2's form is");
    console.log(binaryArray)
    console.log('\n')
}

let num = -7, numLength = 8;
let binaryArrayPrint = [];

//condition to check which number is greater
if (num >= 0) {
    getSimple2sComplement(num, numLength);
} else {
    getSimple2sComplement(num, numLength);
}



/** This is function to give decimal from binary number
 * @param {Array} twosComplement binary number 
 * @returns {Number} converted decimal number
 * @throws {Error} if other input than 0 or 1
 */
function getSimpleDecimal(twosComplement) {

    for (let i = 0; i <= twosComplement - 1; i++) {
        if ( twosComplement[i] !== 0 || twosComplement[i] !== 1 ||
            !Number.isInteger(twosComplement[i])
        ) {
            throw new Error("not valid binary number");
        }
    }
    //carry variable to add to binary
    let carry = 0,number = 0, temp = 0;
    
    // if the first index is 0 the positive
    if (twosComplement[0] === 0) {
        for (let i = twosComplement.length - 1; i >= 1; i--) {
            power = Math.pow(2, temp);
            multiple = twosComplement[i] * power;
            number = number + multiple;
            temp++
        }
        return number;
    }

    // for case when 0th index is '1'
    else {
        number = number * -1;
        return number;
    }
}

let twosComplement= [0,1,1]
console.log(`The binarynumber as decimal is ${getSimpleDecimal(twosComplement)}`)




/** This function gives 64 - bit binary number
* @param { Number } number Number to convert
* @throws { Error } Invalid input
* @returns { String } output
*/

function getJsNumberRepresentation(number) {
    // Check if the input is a valid number
    if (typeof number !== 'number' || isNaN(number)) {
        throw new Error('Invalid input. Please provide a valid number.');
    }

    // Create a Float64Array with a single element
    var float64Array = new Float64Array(1);
    float64Array[0] = number;

    // Get the DataView of the array
    var dataView = new DataView(float64Array.buffer);

    // Extract the 64-bit binary representation as a string
    var binaryRepresentation = '';
    for (var i = 7; i >= 0; i--) {
        binaryRepresentation += ('00000000' + dataView.getUint8(i).toString(2)).slice(-8);
    }

    return binaryRepresentation;
}

console.log("The binary number in 64 bits is:");
console.log(getJsNumberRepresentation(8))


/**This is a function to give a number from the 64-bit representation
 * @param {number} input the input to convert in decimal
 * @throws {Error} when there is some issue while converting
 * @returns {Number} the number representation of the 64-bit binary
 */
function getNumericFromJsRepresentation(input) {
    let binaryRepresentation;

    // Check if the input is a number and convert it to a binary string
    if (typeof input === 'number') {
        binaryRepresentation = input.toString(2);
        // Pad with zeros to ensure it's 64 bits long
        binaryRepresentation = '0'.repeat(64 - binaryRepresentation.length) + binaryRepresentation;
    } else if (Array.isArray(input)) {
        // Check if the input is an array of binary digits
        if (!input.every(bit => bit === 0 || bit === 1)) {
            throw new Error('Invalid input. Please provide a valid array of binary digits (0 or 1).');
        }
        // Join the array into a string
        binaryRepresentation = input.join('');
        // Pad with zeros to ensure it's 64 bits long
        binaryRepresentation = '0'.repeat(64 - binaryRepresentation.length) + binaryRepresentation;
    } else if (typeof input === 'string') {
        // Check if the input is a valid binary string
        if (!/^[01]+$/.test(input)) {
            throw new Error('Invalid input. Please provide a valid binary string.');
        }
        // Pad with zeros to ensure it's 64 bits long
        binaryRepresentation = '0'.repeat(64 - input.length) + input;
    } else {
        throw new Error('Invalid input. Please provide a number, an array of binary digits, or a binary string.');
    }

    // Split the binary string into sign, exponent, and fraction parts
    const sign = parseInt(binaryRepresentation.charAt(0), 2) === 0 ? 1 : -1;
    const exponent = parseInt(binaryRepresentation.substr(1, 11), 2) - 1023;
    const fraction = parseInt(binaryRepresentation.substr(12), 2) / Math.pow(2, 52);

    // Calculate the final number
    const result = sign * Math.pow(2, exponent) * (1 + fraction);

    return result;
}

let number=1010
console.log(`The binary number in decimal form is:
${getNumericFromJsRepresentation(number)} `);

