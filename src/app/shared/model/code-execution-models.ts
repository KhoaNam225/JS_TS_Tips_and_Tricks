export interface LanguageInfo {
  name: string;
  id: number;
}

export enum ExecutionStatus {
  InQueue = 1,
  Processing = 2,
  Accepted = 3,
  WrongAnswer = 4,
  TimeLimitExceed = 5,
  CompilationError = 6,
  // Everything other than the above would be RuntimeError
}

export interface CodeExecutionStatus {
  id: ExecutionStatus;
  description: string;
}

export interface CodeExecutionResult {
  status: CodeExecutionStatus;
  stdout: string | null;
  stderr: string | null;
  compileOutput: string | null;
}
