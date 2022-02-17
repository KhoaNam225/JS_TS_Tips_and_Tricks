import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-object-methods',
  templateUrl: './object-methods.component.html',
  styleUrls: ['./object-methods.component.scss'],
})
export class ObjectMethodsComponent implements OnInit {
  objectOverview: string = `
  const dog = {
    legs: 4,
    ears: 2,
    eyes: 2,
    name: 'John'
  }

  console.log(dog.name)  // 'John'
  console.log(dog['legs'])  // 4
  `;

  objectArrayStringOverview: string = `
    const seasons = ['Spring', 'Summer', 'Fall', 'Winter']

    console.log(seasons[0])   // 'Spring'
    console.log(season['0'])  // Still 'Spring'! No ERROR!

    const username = 'John Do'
    console.log(username[0])  // 'J'
    console.log(username['0'])  // Still 'J'! No ERROR!
  `;

  objectKeysExample = `
  const customerAge = {
    'John': 18,
    'Mary': 20,
    'Chloe': 35
  }

  const customersName = Object.keys(customerAge)   // ['John', 'Mary', 'Chloe']

  const customersUnder30 = customersName.filter(name => customerAge[name] < 30)

  console.log(customerUnder30)  // ['John', 'Mary']
  `;

  objectValuesExample: string = `
  const customerAge = {
    'John': 18,
    'Mary': 20,
    'Chloe': 35
  }

  let customerUnder30Count = 0
  Object.values(customerAge).forEach(age => {
    if (age < 30) {
      customerUnder30Count++
    }
  })

  console.log(customerUnder30Count)  // 2
  `;

  objectEntriesExample: string = `
  const customerAge = {
    'John': 18,
    'Mary': 20,
    'Chloe': 35
  }

  Object.entries(customerAge).forEach(customer => {
    const [name, age] = customer
    console.log(name + ' is ' + age + ' years old!')
  })

  // John is 18 years old
  // Mary is 20 years old
  // Chloe is 35 years old
  `;

  objectAssignExample: string = `
  const target = {}

  const person1 = {
    name: 'John',
    age: 25,
    sex: 'M'
  }

  const person2 = {
    name: 'Mary',
    age: 30,
    sex: 'F'
  }

  Object.assign(target, person1)

  console.log(target)  // { name: 'John', age: 25, sex: 'M' }

  Object.assign(target, person2)

  console.log(target)  // { name: 'Mary', age: 30, sex: 'F' }

  // Object.assign() also accepts more than 2 arguments
  // The first argument is always the target, then the subsequent arguments will be 'paste' onto the target one by one from left to right
  Object.assign(target, person1, person2)

  console.log(target)  // { name: 'Mary', age: 30, sex: 'F' }
  `;
  constructor() {}

  ngOnInit(): void {}
}
