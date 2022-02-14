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

  destructuringOperatorFirstExample: string = `
  const arrayA = [1, 2, 3]
  const [first, second, last] = arrayA

  console.log(first) // 1
  console.log(second) // 2
  console.log(last)  // 3
  
  const objA = {
    year: 2021, 
    month: 1, 
    day: 31
  }
  const { year, month, day } = objA

  console.log(year) // 2021
  console.log(month) // 1
  console.log(day)  // 31
  `;

  destructuringOperatorArray: string = `
  const arrayA = [1, 2, 3, 4, 5]
  const [one, two, ...rest] = arrayA

  console.log(one)  // 1
  console.log(two)  // 2
  console.log(rest) // [3, 4, 5]

  // The above is equivalent to the following more 'traditional' way
  const one = arrayA[0]
  const two = arrayA[1]
  const rest = arrayA.slice(2)

  
  // Also, with the destructuring operator, we can easily swap values of 2 variables like this:
  let a = 10
  let b = 20
  [a, b] = [b, a]   // Now a = 20 and b = 10!

  console.log(a)  // 20
  console.log(b)  // 10


  // The above is equivalent to this more usual way
  let temp = a
  a = b
  b = temp
  `;

  destructuringOperatorObject: string = `
  const originalObj = {
    year: 2021,
    month: 1,
    day: 31,
    tonnes: 1000,
    asset: 'AC',
    product: 'F',
    destinationAsset: 'MAC_SY1'
  }

  const asset = originalObj.asset
  const product = originalObj.product
  //.... blah... blah... Too long, didn't write!


  const {
    year,
    month,
    day,
    asset,
    tonnes,
    product
    destinationAsset
  } = originalObj

  console.log(year)  // 2021
  console.log(month)  // 1
  // ... other variables will have the corresponding values
  `;

  destructuringOperatorPickingValue: string = `
  const obj = {
    year; 2021, 
    month: 1,
    day: 31,
    tonnes: 1000
  }

  // Only get the value of year and assign the rest to an object
  const { year, ...theRest } = obj
  
  console.log(year)  // 2021
  console.log(theRest)  // { month: 1, day: 31, tonnes: 1000 }, year has now been removed!


  // Get the value of tonnes and assign it to another variable called 'ofrTonnes'
  const { 
    tonnes: ofrTonnes, 
    year, 
    month, 
    day } = obj 
  
  console.log(ofrTonnes)  // 1000
  `;

  destructuringOperatorWritingFunction: string = `
  interface TonnageValue {
    year: number
    month: number
    asset: string
    tonnes: number
  }

  // The 'traditional' way of writing a function that accept a TonnageValue object
  function processTonnageValue(tonnageVal: TonnageValue) {
    const year = tonnageVal.year
    const month = tonnageVal.month
    const asset = tonnageVal.asset
    const tonnes = tonnageVal.tonnes

    // ... Do other calculations
  }

  
  // That same function but improved a bit
  function processTonnageValueImproved(tonnageVal: TonnageValue) {
    const { year, month, asset, tonnes } = tonnageVal
    
    // ... Do other calculations
  }


  // Let's bring it to the ultimate form!
  function processTonnageValueImprovedVer2({ year, month, asset, tonnes }: TonnageValue) {
    // ... Do other calculations
  }
  `;

  ternaryOperatorExample: string = `
  const age = 26
  
  // This is the long way of assigning proper value to beverage by checking
  // for age
  let beverage = ''
  if (age < 18) {
    beverage = 'juice'
  }
  else {
    beverage = 'beer'
  }

  // Using ternary operator is a lot faster
  let beverage = age < 18 ? 'juice' : 'beer'
  `;

  orOperatorExample: string = `
  const userA = {
    username: 'Peter Parker',
    age: 26
  }

  const userB = {
    username: '',
    age: 20
  }

  // Use ternary operator
  const nameA = userA.username ? userA.username : 'Anonymous'
  const nameB = userB.username ? userB.username : 'Anonymous'


  // Or we can use OR operator
  const nameA = userA.username || 'Anonymous'
  const nameB = userB.username || 'Anonymous'

  console.log(nameA)  // 'Peter Parker'
  console.log(nameB)  // 'Anonymous' because empty string is falsy
  `;

  nullishCoalescingExample: string = `
  const userA = {
    username: '',
    age: 26
  }

  const userB = {
    age: 20
  }

  const nameA = userA.username ?? 'Anonymous'
  const nameB = userB.username ?? 'Anonymous'

  console.log(nameA)   // ''
  console.log(nameB)   // 'Anonymous' since username is undefined in userB
  `;

  chainingOperatorNaiveExample: string = `
  const john = {
    name: 'John',
    cat: {
      name: 'Tom',
      meow: () => {
        console.log('Meow!')
      }
    }
  }

  const marry = {
    name: 'Marry',
    dog: {
      name: 'Chloe',
      bark: () => {
        console.log('Goof!')
      }
    }
  }

  // Since marry might or might not have a dog
  // we must check if she rally has a dog before letting him/her bark
  if (marry.dog) {
    if (marry.dog.bark) {
      marry.dog.bark()
    }
  }
  `;

  chainOperatorProblemExample: string = `
  const marry = {
    name: 'Marry',
    dog: {
      name: 'Chloe',
      puppy: {
        bark: () => {
          console.log('Goof!)
        }
      }
    }
  }

  // We check if Marry's dog has a puppy
  // if yes, we let it bark
  if (marry.dog) {
    if (marry.dog.puppy) {
      if (marry.dog.puppy.bark) {
        marry.dog.puppy.bark()
      }
    }
  }
  `;

  chainOperatorFixProblem: string = `
  const marry = {
    name: 'Marry',
    dog: {
      name: 'Chloe',
      puppy: {
        bark: () => {
          console.log('Goof!)
        }
      }
    }
  }

  // This will print to the console if Marry really has a dog, which also has a 
  marry.dog?.puppy?.bark?.()
  `;

  constructor() {}

  ngOnInit(): void {}
}
