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
        {
          title: 'Arrow Functions',
          route: 'arrow-functions',
        },
      ],
    },
    {
      title: 'Array Methods',
      route: 'array-methods',
      subPages: [
        {
          title: 'Common Themes',
          route: 'common-themes',
        },
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
          route: 'array-find',
        },
        {
          title: '.findIndex()',
          route: 'array-find-index',
        },
        {
          title: '.reduce()',
          route: 'array-reduce',
        },
        {
          title: '.some()',
          route: 'array-some',
        },
        {
          title: '.every()',
          route: 'array-every',
        },
        {
          title: '.slice()',
          route: 'array-slice',
        },
        {
          title: '.splice()',
          route: 'array-splice',
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
    // {
    //   title: 'Miscellaneous',
    //   route: 'miscellaneous',
    //   subPages: [
    //     {
    //       title: 'Guard clauses',
    //       route: 'misc-guard-clauses',
    //     },
    //   ],
    // },
    // {
    //   title: 'Lodash',
    //   route: 'lodash',
    //   subPages: [
    //     {
    //       title: '_.cloneDeep()',
    //       route: 'lodash-clone-deep',
    //     },
    //   ],
    // },
  ];
}
