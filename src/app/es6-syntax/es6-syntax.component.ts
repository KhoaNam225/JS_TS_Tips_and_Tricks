import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-es6-syntax',
  templateUrl: './es6-syntax.component.html',
  styleUrls: ['./es6-syntax.component.scss'],
})
export class ES6SyntaxComponent implements OnInit {
  spreadOperatorCodeArray: string = `
  const originalArray = [1, 2, 3, 4]
  
  const copiedArray = [...originalArray]

  console.log(originalArray)  // This will give: [1, 2, 3, 4]
  console.log(copiedArray)  // This will also give: [1, 2, 3, 4]


  /* Spread operator also works well with objects */
  const originalObject = {
    year: 2022,
    month: 1
  }

  const copiedObject = { ...originalObject }
  
  console.log(originalObject)  // This will give: { year: 2022, month: 1 }
  console.log(copiedObject)  // This will also give: { year: 2022, month: 1 }
  `;

  spreadOperatorUseCaseSideEffect: string = `
  const arrayA = [1, 2, 3, 4]
  const arrayB = arrayA

  console.log(arrayB)  // This will give [1, 2, 3, 4]
  
  arrayB[0] = 10
  console.log(arrayB)  // This will give [10, 2, 3, 4]
  console.log(arrayA)  // This will also give [10, 2, 3, 4]! OUCH!!
  `;

  spreadOperatorUseCaseFixingSideEffect: string = `
  const arrayA = [1, 2, 3, 4]

  // concat() with an empty array will create a copy of the original array
  const concatArray = arrayA.concat([])  
  
  // slice() will also create a copy of the original array
  const slicedArray = arrayA.slice(0, arrayA.length)  
  
  const spreadArray = [...arrayA] // Same for spread operator, but a lot more readable!!
  
  concatArray[0] = 10
  slicedArray[0] = 20
  spreadArray[0] = 30
  
  console.log(arrayA)  // This will still give [1, 2, 3, 4] ==> Unmodified!`;

  spreadOperatorObjectUseCase: string = `
  const objectA = { 
    year: 2022,
    month: 1,
    day: 31
  }
  
  // This is just a shallowed copy! NOT SAFE!
  const shallowCopied = objectA

  
  // This creates a deep copy but TOOO SLOOOOOW!
  const objectB = {}
  objectB.year = objectA.year
  objectB.month = objectA.month
  objectB.day = objectA.day


  // This is also a deep copy! SO QUICK!
  const objectC = { ...objectA }


  // This is also a deep copy of objectA
  // but with the 'year' value changed to '2021' and the rest will stay the same
  const objectD = {
    ...objectA,
    year: 2021
  }

  console.log(objectA)  // This will give { year: 2022, month: 1, day: 31 }
  console.log(objectB)  // This will also give { year: 2022, month: 1, day: 31 }
  console.log(objectC)  // This will give { year: 2022, month: 1, day: 31 }
  console.log(objectD)  // This will give { year: 2021, month: 1, day: 31 }
  `;

  spreadOperatorConcat: string = `
  const arrayA = [1, 2, 3, 4]
  const arrayB = [5, 6, 7, 8]

  const concatArray = [...arrayA, ...arrayB]
  console.log(concatArray)  // [1, 2, 3, 4, 5, 6, 7, 8]

  const objA = {
    year: 2021,
    month: 1
  }

  const objB = {
    asset: 'AC',
    product: 'L'
  }

  const concatObj = { ...objA, ...objB }

  console.log(concatObj)  // { year: 2021, month: 1, asset: 'AC', product: 'L' }
  `;
  constructor() {}

  ngOnInit(): void {}
}
