import { Component } from '@angular/core';

interface Page {
  title: string;
  route: string;
  subPages?: Page[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  pages: Page[] = [
    {
      title: 'ES6 Syntax',
      route: 'es6-syntax',
      subPages: [
        {
          title: 'Spread Operator',
          route: 'spread-operator',
        },
        {
          title: 'Destructuring Operator',
          route: 'destructuring-operator',
        },
        {
          title: 'Shorthand Syntax',
          route: 'shorthand-syntax',
        },
      ],
    },
    {
      title: 'Array Methods',
      route: 'array-methods',
      subPages: [
        {
          title: '.map()',
          route: 'array-map',
        },
        {
          title: '.forEach()',
          route: 'array-foreach',
        },
        {
          title: '.filter()',
          route: 'array-filter',
        },
        {
          title: '.find()',
          route: 'array-find()',
        },
        {
          title: '.reduce()',
          route: 'array-reduce()',
        },
      ],
    },
    {
      title: 'Object Methods',
      route: 'object-methods',
      subPages: [
        {
          title: 'Object.keys()',
          route: 'object-keys',
        },
        {
          title: 'Object.values()',
          route: 'object-values',
        },
        {
          title: 'Object.entries()',
          route: 'object-entries',
        },
        {
          title: 'Object.assign()',
          route: 'object-assign',
        },
      ],
    },
    {
      title: 'Miscellaneous',
      route: 'miscellaneous',
      subPages: [
        {
          title: 'Guard clauses',
          route: 'misc-guard-clauses',
        },
      ],
    },
    {
      title: 'Lodash',
      route: 'lodash',
      subPages: [
        {
          title: '_.cloneDeep()',
          route: 'lodash-clone-deep',
        },
      ],
    },
  ];
}
