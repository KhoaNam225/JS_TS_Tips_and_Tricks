import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import {
  CodeExecutionResult,
  ExecutionStatus,
} from '../model/code-execution-models';

@Component({
  selector: 'app-code-execution-result',
  templateUrl: './code-execution-result.component.html',
  styleUrls: ['./code-execution-result.component.scss'],
})
export class CodeExecutionResultComponent implements OnInit {
  ExecutionStatus = ExecutionStatus;

  @Input()
  codeExecutionResult: CodeExecutionResult | undefined | null = undefined;

  @Input()
  executingCode: boolean = false;

  constructor() {}

  ngOnInit(): void {}
}
