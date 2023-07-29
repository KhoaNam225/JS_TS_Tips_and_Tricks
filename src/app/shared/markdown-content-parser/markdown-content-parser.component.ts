import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-markdown-content-parser',
  templateUrl: './markdown-content-parser.component.html',
  styleUrls: ['./markdown-content-parser.component.scss'],
})
export class MarkdownContentParserComponent implements OnInit {
  @Input()
  sourcePath: string = '';

  constructor() {}

  ngOnInit(): void {}
}
