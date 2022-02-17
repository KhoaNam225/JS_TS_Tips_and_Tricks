import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-array-methods',
  templateUrl: './array-methods.component.html',
  styleUrls: ['./array-methods.component.scss'],
})
export class ArrayMethodsComponent implements OnInit {
  commonThemesFunctionExamples: string = `
  const myArray = [1, 2, 3, 4, 5]

  myArray.forEach(value => doSomething(value))
  myArray.forEach((value, index) => doSomething(value, index))
  myArray.forEach((value, index, array) => doSomething(value, index, array))

  // An example of the function requiring different arguments
  myArray.reduce((accumulator, currentValue, index, array) => {
    accumulator[index] = doSomething(currentValue, array)
    return accumulator
  }, {})
  `

  mapFunctionExample: string = `
  const originalArray = [1, 2, 3, 4, 5]

  const doubledArray = originalArray.map(function(item) => {
    return item * 2
  })

  console.log(originalArray)   // [1, 2, 3, 4, 5]
  console.log(doubledArray)    // [2, 3, 6, 8, 10]
  `;

  mapFunctionArrowCallback: string = `
  const originalArray = [1, 2, 3, 4, 5]

  const doubledArray = originalArray.map((item) => return item * 2)

  console.log(originalArray)   // [1, 2, 3, 4, 5]
  console.log(doubledArray)    // [2, 3, 6, 8, 10]
  `;

  mapFunctionOtherFunctionArguments: string = `
  const originalArray = [1, 2, 3]

  const newArray1 = originalArray.map((value, index) => value * index)      // [0, 2, 6]
  const newArray2 = originalArray.map((v, i, a) => a.slice(0, index + 1))   // [[1], [1,2], [1,2,3]]
  `;

  forEachFunctionExample: string = `
  const originalArray = [1, 2, 3, 4, 5]

  // Walk through the array and print the items
  // This will give:
  // 1
  // 2
  // 3
  // 4
  // 5
  originalArray.forEach(item => console.log(item))

  const newArray = originalArray.forEach(item => item * 2)  // undefined

  originalArray.forEach((v, i, a) => doSomething(v, i, a))
  `;

  filterFunctionExample: string = `
  const originalArray = [1, 2, 3, 4, 5]

  const filteredArray = originalArray.filter(item => item % 2 === 0) // [2, 4]

  const dummyArray = originalArray.filter(item => 0)                 // []

  // The following code filters the array to only keep unique values, as indexOf only returns the index of the first match found
  const withDuplicates = [4,1,2,2,1,1,0,2,1,4,4,9]
  const uniqueElements = withDuplicates.filter((v, i, a) => a.indexOf(v) === i)  // [4, 1, 2, 0, 9]
  `;

  findFunctionExample: string = `
  const originalArray = [1, 2, 3, 4, 5]

  const firstItemGreaterThan1 = originalArray.find(item => item > 1)   // 2
  const firstItemGreaterThan6 = originalArray.find(item => item > 6)   // undefined

  // The following code demonstrates how .find() can be more concise than .filter()
  const myData = [{ species: 'cat'}, { species: 'dog' }, { species: 'mouse' }]

  myData.filter(v => v.species === 'dog')[0].sound = 'Goof!'
  // OR
  myData.find(v => v.species === 'dog').sound = 'Goof!'

  // The following code returns the first item equal to its 0-based position in the array
  const anotherArray = [4, 1, 2, 5, 7, 3]
  const result = anotherArray.find((v, i) => v === i)                  // 1
  `


  findIndexFunctionExample: string = `
  const originalArray = [1, 2, 3, 4, 5]

  const greaterThan1 = originalArray.findIndex(item => item > 1)

  const greaterThan6 = originalArray.findIndex(item => item > 6)

  console.log(greaterThan1 !== -1 ?? greaterThan1 : 'No values greater than 1')  // 1, since item '2' is at position 1
  console.log(greaterThan6 !== -1 ?? greaterThan6 : 'No values greater than 6')  // No values greater than 6
  `

  reduceFunctionExample: string = `
  const originalArray = [1, 2, 3, 4, 5]

  // Note: 0 is the initial value, which is used when the callback is run on the first item
  const sum = originalArray.reduce((acc, value) => acc + value, 0)
  // 15

  // Performing a one-to-one mapping using .reduce()
  const doubledArray = originalArray.reduce((acc, value) => {
    acc.push(2 * value)
    return acc
  }, [])
  // [2, 4, 6, 8, 10]

  // Performing a one-to-many mapping using .reduce()
  const newArray = originalArray.reduce((acc, v) => acc.concat((new Array(v)).fill(v)), [])
  // [1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5]

  // Flat-mapping with .reduce()
  const nestedArrays = [[1], [2, 2], [3, 3, 3]]
  const flattened = nestedArrays.reduce((acc, v) => [...acc, ...v], [])
  // [1, 2, 2, 3, 3, 3]
  `

  someFunctionExample: string = `
  const originalArray = [1, 2, 3, 4, 5]
  const hasEvenNumbers = originalArray.some(v => v % 2 === 0)   // true
  const hasMultipleOfSix = originalArray.some(v => v % 6 === 0) // false
  `

  everyFunctionExample: string = `
  const originalArray = [1, 2, 3, 4, 5]
  const isAllNumbers = originalArray.every(v => typeof v === 'number')   // true
  const isAllEven = originalArray.every(v => v % 2 === 0)                // false
  `

  sliceFunctionExample: string = `
  const originalArray = [1, 2, 3, 4, 5]
  const copyAll = originalArray.slice()         // [1, 2, 3, 4, 5]
  const afterThird = originalArray.slice(3)     // [4, 5]
  const lastThree = originalArray.slice(-3)     // [3, 4, 5]
  const firstThree = originalArray.slice(0, 3)  // [1, 2, 3]
  const someSlice = originalArray.slice(-3, -1) // [2, 3, 4]

  originalArray.slice(3, -3)                    // []
  const longerArray = [1, 2, 3, 4, 5, 6, 7, 8]
  longerArray.slice(3, -3)                      // [4, 5]
  `

  spliceFunctionExample: string = `
  let array1 = [1, 2, 3, 4, 5, 6, 7]
  array1.splice(3)  // Returns [4, 5, 6, 7]; array1 === [1, 2, 3]

  array1 = [1, 2, 3, 4, 5, 6, 7]
  array1.splice(3, 2) // Returns [4, 5]; array1 = [1, 2, 3, 6, 7]

  array1 = [1, 2, 3, 4, 5, 6, 7]
  array1.splice(3, 2, 0, 0, 0) // Returns [4, 5]; array1 = [1, 2, 3, 0, 0, 0, 6, 7]

  // Swapping some elements between two arrays
  array1 = [1, 2, 3, 4, 5, 6, 7]
  let array2 = [10, 20, 30, 40, 50, 60, 70]

  array2.splice(-3+2, 0, ...array1.splice(-3, 2, ...array2.splice(-3, 2)))
  // Returns []
  // array1 = [1, 2, 3, 4, 50, 60, 7]
  // array2 = [10, 20, 30, 40, 5, 6, 70]
  `

  constructor() {}

  ngOnInit(): void {}
}
