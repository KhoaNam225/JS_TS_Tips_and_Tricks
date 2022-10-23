import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { editor } from 'monaco-editor';

@Component({
  selector: 'app-code-execution-block',
  templateUrl: './code-execution-block.component.html',
  styleUrls: ['./code-execution-block.component.scss'],
})
export class CodeExecutionBlockComponent implements OnInit {
  editorOptions = {
    theme: 'vs-dark',
    language: 'typescript',
    scrollBeyondLastLine: false,
    fontFamily: 'Roboto Mono',
    minimap: {
      enabled: false,
    },
  };

  editorHeight: number = 400; // Default height for editor

  @ViewChild('editorWrapper', { read: ElementRef }) editorContainer:
    | ElementRef
    | undefined;

  code: string = `
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

  constructor() {}

  ngOnInit(): void {}

  onEditorReady(editor: any) {
    const linesCount = editor.getModel().getLineCount();
    this.editorHeight = linesCount * 19 + 20; // 19px is a line height, we add some more space at the end of the editor
    this.editorContainer?.nativeElement.setAttribute(
      'style',
      `height: ${this.editorHeight}px`
    );
    editor.layout();
  }
}
