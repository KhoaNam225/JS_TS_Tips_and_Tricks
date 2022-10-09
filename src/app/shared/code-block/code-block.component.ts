import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-code-block',
  templateUrl: './code-block.component.html',
  styleUrls: ['./code-block.component.scss'],
})
export class CodeBlockComponent implements OnInit {
  @Input()
  code: string;

  @Input()
  language: string;

  constructor() {
    this.code = '';
    this.language = 'typescript';
  }

  ngOnInit(): void {}
}
