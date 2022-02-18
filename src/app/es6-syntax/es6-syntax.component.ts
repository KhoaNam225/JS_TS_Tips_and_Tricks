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

  spreadOperatorUseCaseArrayClone: string = `
  const originalArray = [1, "hello", true, [5, 6, 7], {prop: 100}]
  const clonedArray = [...originalArray]

  console.log(clonedArray)  // This will give [1, "hello", true, [5, 6, 7], {prop: 100}]

  originalArray[0] = 7
  console.log(originalArray[0], clonedArray[0])  // This will give 7 1

  originalArray[4].prop = 200
  console.log(originalArray[4], clonedArray[4])  // This will give {prop: 200} {prop: 200}
  `;

  spreadOperatorUseCasePopulatingArrayLiterals: string = `
  const template = [3, 4, 5]

  const myLiteral1 = [1, 2, ...template]  // [1, 2, 3, 4, 5]
  const myLiteral2 = [2, ...template, 6]  // [2, 3, 4, 5, 6]
  const myLiteral3 = [...template, 6, 7]  // [3, 4, 5, 6, 7]

  // If spreading is not used
  const myLiteral4 = [2, template, 6]     // [2, [3, 4, 5], 6]
  `

  spreadOperatorUseCasePopulatingObjectLiterals: string = `
  const template1 = {a: 1, b: 2, c: 3}
  const template2 = {b: 20, c: 30, d: 40}

  const myLiteral1 = {a: 100, ...template1}                       // {a: 1, b: 2, c: 3}
  const myLiteral2 = {a: 100, ...template1, ...template2, c: 300} // {a: 1, b: 20, c: 300, d: 40}
  const myLiteral3 = {...template2, c: 300, d: 400}               // {b: 20, c: 300, d: 400}
  `

  spreadOperatorUseCaseSpreadArguments: string = `
  function concatThreeStrings(arg1, arg2, arg3) {
    return arg1 + arg2 + arg3
  }

  const myArgs1 = ["a", "b", "c"]
  concatThreeStrings(...myArgs1)         // "abc"

  const myArgs2 = ["a", "b"]
  concatThreeStrings(...myArgs2, "c")    // "abc"

  const myArgs3 = {arg3: "c", arg1: "a", arg2: "b"}

  // NOTE: This does NOT work!
  concatThreeStrings(...myArgs3)        // Uncaught TypeError: Found non-callable @@iterator

  function concatThreeStringsFromObject(input) {
  const { arg1, arg2, arg3 } = input
    return arg1 + arg2 + arg3
  }

  concatThreeStringsFromObject(myArgs3) // "abc"
  `

  spreadOperatorUseCaseCollateArguments: string = `
  function sum(...arguments) {
    return arguments.reduce((acc, value) => acc + value, 0)
  }

  sum(10, 20, 30, 40) // 100
  `

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

  const mary = {
    name: 'Mary',
    dog: {
      name: 'Chloe',
      bark: () => {
        console.log('Goof!')
      }
    }
  }

  // Since mary may or may not have a dog
  // we must check if she rally has a dog before letting him/her bark
  if (mary.dog) {
    if (mary.dog.bark) {
      mary.dog.bark()
    }
  }
  `;

  chainOperatorProblemExample: string = `
  const mary = {
    name: 'Mary',
    dog: {
      name: 'Chloe',
      puppy: {
        bark: () => {
          console.log('Goof!)
        }
      }
    }
  }

  // We check if Mary's dog has a puppy
  // if yes, we let it bark
  if (mary.dog) {
    if (mary.dog.puppy) {
      if (mary.dog.puppy.bark) {
        mary.dog.puppy.bark()
      }
    }
  }
  `;

  chainOperatorFixProblem: string = `
  const mary = {
    name: 'Mary',
    dog: {
      name: 'Chloe',
      puppy: {
        bark: () => {
          console.log('Goof!)
        }
      }
    }
  }

  // This will print to the console if Mary really has a dog, which also has a
  mary.dog?.puppy?.bark?()
  `;

  arrowFunctionsExample: string = `
    // A 'do nothing' function
    const function1 = () => {}

    // With some arguments
    const function2 = (arg1, arg2) => {}

    // If only one line is required and result is not an object literal, can omit braces
    const function3 = (arg1, arg2) => arg1 + arg2

    // If only one line is required and result is an object literal, 'escape' braces with parentheses
    const function4 = (arg1, arg2) => ({ sum: arg1 + arg2 })

    // If multiple lines are required, use 'return' to return the result
    const function5 = (arg1, arg2) => {
      return { sum: arg1 + arg2 }
    }

    // You can still destructure arguments
    const function6 = ([arg1, arg2]) => {
      return \`\${arg1}\${arg2}\`
    }

    const myInput = { a: 1, b: 2, c: 3 }
    const myEntries = Object.entries(myInput) // [[a, 1], [b, 2], [c, 3]]
    myEntries.map(function6)                  // ["a1", "b2", "c3"]
  `

  constructor() {}

  ngOnInit(): void {}
}
