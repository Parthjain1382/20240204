// Implementation of a simple linked list in JavaScript

// Define a Node class representing a single node in the linked list
class Node {
  /**construct a new node with the data given
   * @param {any} data any data that need to be stored
   * throw erorr when no data is given to the constructor
   */
  constructor(data, next = null) {
    this.data = data; // Data stored in the node
    this.next = next; // Reference to the next node in the list
  }
}

// Define a LinkedList class representing the linked list and its operations
class LinkedList {
  constructor() {
    this.head = null; // Initialize the head of the linked list to null
    this.size = 0;    // Initialize the size of the linked list to 0
  }

/**
 * @param {number} take input number as a parameter
 * @returns {void} returns void
 * Insert a new node at the beginning of the list
 */
insertFirst(data) {
  this.head = new Node(data, this.head); // Create a new node and make it the new head
  this.size++; // Increment the size of the linked list
}

/**Insert a new node at the end of the list
 * @param {any} data it can take any data
 * @returns {void} it doesn't return anything
 */
insertLast(data) {
  let node = new Node(data);
  let current;

  // If the list is empty, set the new node as the head
  if (!this.head) {
    this.head = node;
  } else {
    current = this.head;

    // Traverse to the last node
    while (current.next) {
      current = current.next;
    }

    current.next = node; // Set the new node as the next of the last node
  }

  this.size++; // Increment the size of the linked list
}

/** Insert a new node at a specified index in the list
 * @param {any} data It take any data
 * @param {number} index it takes number as an index
 * @returns {void} return void
 */
insertAt(data, index) {
// If the index is out of range
if (index >= 0 && index > this.size) {
  return;
}

// If inserting at the beginning of the list
if (index === 0) {
  this.insertFirst(data);
  return;
}

// Create a new node with the provided data
const node = new Node(data);
let current, previous;

// Set current to the first node
current = this.head;
let count = 0;

// Traverse to the specified index
while (count < index) {
  previous = current; // Node before the specified index
  count++;
  current = current.next; // Node after the specified index
}

node.next = current;
previous.next = node; // Insert the new node at the specified index

this.size++; // Increment the size of the linked list
}

/**Get and print the data at a specified index
 * @param {number} index It takes number as an index
 * @returns {null} It does not return anything
 */
getAt(index) {
let current = this.head;
let count = 0;

while (current) {
  if (count == index) {
    console.log(current.data); // Print the data of the node at the specified index
  }
  count++;
  current = current.next;
}

return null;
}

/** Remove a node at a specified index
 * @param {number} index It take number index as parameter
 * @returns {void} it does not return anything
 */
removeAt(index) {
if (index > 0 && index > this.size) {
  return;
}

let current = this.head;
let previous;
let count = 0;

// Remove the first node
if (index === 0) {
  this.head = current.next;
} else {
  // Traverse to the specified index
  while (count < index) {
    count++;
    previous = current;
    current = current.next;
  }

  previous.next = current.next; // Remove the node at the specified index
}

this.size--; // Decrement the size of the linked list
}

/** Clear the entire linked list
 * @returns {void} It does not return anything
 */
clearList() {
this.head = null;
this.size = 0;
}

/**Print the data of all nodes in the linked list
 * @returns {void} It return void
 */
printListData() {
let current = this.head;

while (current) {
  console.log(current.data);
  current = current.next;
}
}
}

// Create an instance of the LinkedList class
const ll = new LinkedList();

// Perform various operations on the linked list
ll.insertFirst(100);
ll.insertFirst(200);
ll.insertFirst(300);
ll.insertLast(400);
ll.insertAt(500, 3);
ll.printListData()

// Uncomment to run this functions
// ll.clearList();
// ll.getAt(2);



