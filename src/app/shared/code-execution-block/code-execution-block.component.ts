import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { CodeExecutionResult } from '../model/code-execution-models';
import { CodeExecutionService } from '../services/code-execution.service';

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

  executingCode: boolean = false;
  executingResult: Subject<CodeExecutionResult | undefined> = new Subject();

  @ViewChild('editorWrapper', { read: ElementRef }) editorContainer:
    | ElementRef
    | undefined;

  @Input()
  defaultSourceCode: string = '';

  currentSourceCode: string = `
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

  constructor(private codeExecutionService: CodeExecutionService) {}

  ngOnInit(): void {
    this.currentSourceCode = this.defaultSourceCode;
  }

  onEditorReady(editor: any) {
    const linesCount = editor.getModel().getLineCount();
    this.editorHeight = linesCount * 19 + 20; // 19px is a line height, we add some more space at the end of the editor
    this.editorContainer?.nativeElement.setAttribute(
      'style',
      `height: ${this.editorHeight}px`
    );
    editor.layout();
  }

  async runCode() {
    try {
      this.executingCode = true;
      const result = await this.codeExecutionService.executeCodeSync(
        this.currentSourceCode
      );
      this.executingResult.next(result);
      this.executingCode = false;
    } catch (error) {
      console.error(error);
      this.executingCode = false;
      this.executingResult.next(undefined);
    }
  }

  reset() {
    this.executingCode = false;
    this.executingResult.next(undefined);
    this.currentSourceCode = this.defaultSourceCode;
  }
}
