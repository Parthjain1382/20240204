/** get 2's complement of a number 
 * 1.getSimple'sComplement(number,numLenght) of size 11,52
 * 2.getSimpleDecimal2'sComplement
 * 3.getJsNumberRepresentation(Number)  give array of lenght of 52
 * 4.getNumericFromJsRepresentation[<---52---->] 
 */



/**Converting the number into binary 
 * Condititon 1: If the number is positive the normally convert into binary 
 *               return it.
 * Condition 2: If the number is negative the get the 2's complement and 
 *              return it.
 * @param {Number} num Takes number as an input for converting into binary
 * @param {Number} numLenght Take the total number of bits to represent the number
 * @return {Array} It returns the array 
 */

let binaryArray=[];
let twosarray=[];
function getSimple2sComplement(num,numLenght){
  
    if(num>=0){
        n2b(num)
    }
    else{
        n2b(-num)   
    }
}

/** This function will take as input the positive number and convert to binary
 * @param {number} num Take number as input
 */
function n2b(num)
{
    let temp;
    for (let index = 0; index<=numLenght-1; index++) {
        {
            temp=num%2;
            binaryArray.push(temp)
            num=Math.floor(num/2)    

        }   
    } 
}

let num=-7,numLenght=8
let binaryArrayPrint=[];

if(num>=0){
    getSimple2sComplement(num,numLenght)
}
else{
    getSimple2sComplement(num,numLenght)
    binaryArray=binaryArray.reverse()
    console.log(binaryArray)
    for (let index = 0; index <binaryArray.length; index++) {
        if(binaryArray[index]==1){
            twosarray.push(0)
        }
        else{
            twosarray.push(1)
        }
    }
    console.log(twosarray)
    get2sComplement(twosarray)
}

/**It is the functions which gives the final 2s complement 
 * 
 * @returns 
 */

function get2sComplement(twosarray){
    let carry=1;
    console.log(twosarray.length)

    for (let index = numLenght-1; index >=1; index--) {
        if(twosarray[index]+carry>1)
        {
            twosarray[index]=1
            carry=1;
        }
        else{
            twosarray[index]=carry+twosarray[index];
            carry=0;
        }
    }
    twosarray[numLenght-1]=1; //condition for negative integer 
    binaryArray=twosarray
}

console.log(binaryArray.reverse());
















/** converting an array of binary number into number
 * Two possibilities number is positive(1st bit is 0) or number is
 * negative(1st bit is 1)
 * @param {Array} Array1 Takes array as input 
 * @return {Number} It returns the number as output   
 */


function binaryToNumber(binaryArray) { 
    if(binaryArray[0]==1)
    {

    }
    
}

