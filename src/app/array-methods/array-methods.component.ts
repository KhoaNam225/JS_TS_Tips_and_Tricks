import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-array-methods',
  templateUrl: './array-methods.component.html',
  styleUrls: ['./array-methods.component.scss'],
})
export class ArrayMethodsComponent implements OnInit {
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

  forEachFunctionExample: string = `
  const originalArray = [1, 2, 3, 4, 5]

  // Walk through the array and print the items
  // This will give:
  // 1
  // 2
  // 3
  // 4
  originalArray.forEach(item => console.log(item))  

  
  const newArray = originalArray.forEach(item => item * 2)

  console.log(newArray)  // undefined
  `;

  filterFunctionExample: string = `
  const originalArray = [1, 2, 3, 4, 5]

  const filteredArray = originalArray.filter(item => item % 2 === 0)  // Filter our all odd values

  console.log(originalArray)  // [1, 2, 3, 4, 5]
  console.log(filteredArray)  // [2, 4]

  const dummyArray = originalArray.filter(item => 0)

  console.log(dummyArray)  // [] since 0 is falsy
  `;

  findFunctionExample: string = `
  const originalArray = [1, 2, 3, 4, 5]
  
  const greaterThan1 = originalArray.find(item => item > 1)
  
  const greaterThan6 = originalArray.find(item => item > 6)

  console.log(greaterThan1 ?? 'No values greater than 1')  // 2
  console.log(greaterThan6 ?? 'No values greater than 6')  // No values greater than 6
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
  
  const sum = originalArray.reduce(
    (previous, current) => {
      return previous + current
    },
    0  // This is the initial value, which is used when the callback is run on the first item
  )
  
  console.log(sum)  // 15
  `

  
  constructor() {}

  ngOnInit(): void {}
}
