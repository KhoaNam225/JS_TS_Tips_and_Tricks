import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { firstValueFrom, map, Observable } from 'rxjs';
import {
  CodeExecutionResult,
  LanguageInfo,
} from '../model/code-execution-models';

export const DefaultLanguageID = 63; // Javascript id is 63
// We have to use javascript here because Typescript doesn't support Promise with Judge0

export const CodeExecutionAPIKeyInjectionToken =
  'CodeExecutionAPIKeyInjectionToken';
export const CodeExecutionHostInjectionToken =
  'CodeExecutionHostInjectionToken';
export const CodeExecutionBaseUrlInjectionToken =
  'CodeExecutionBaseUrlInjectionToken';

@Injectable({
  providedIn: 'root',
})
export class CodeExecutionService {
  constructor(
    private http: HttpClient,
    @Inject(CodeExecutionAPIKeyInjectionToken) private apiKey: string,
    @Inject(CodeExecutionBaseUrlInjectionToken) private baseUrl: string,
    @Inject(CodeExecutionHostInjectionToken) private host: string
  ) {}

  public async getAllLanguages(): Promise<LanguageInfo[]> {
    const ob = this.http.get<LanguageInfo[]>(`${this.baseUrl}/languages`, {
      headers: this.prepareRequestHeader(),
    });
    return await firstValueFrom(ob);
  }

  public async executeCodeSync(
    code: string,
    languageId: number = DefaultLanguageID
  ): Promise<CodeExecutionResult> {
    const ob: Observable<CodeExecutionResult> = this.http
      .post<any>(
        `${this.baseUrl}/submissions?base64_encoded=false&wait=true&fields=stdout%2Cstderr%2Ccompile_output%2Cmessage%2Cstatus`,
        {
          language_id: languageId,
          source_code: code,
        },
        {
          headers: this.prepareRequestHeader(),
        }
      )
      .pipe(
        map((response) => ({
          status: response.status,
          stderr: response.stderr,
          stdout: response.stdout,
          compileOutput: response['compile_output'],
        }))
      );

    return firstValueFrom(ob);
  }

  private prepareRequestHeader() {
    return {
      'X-RapidAPI-Key': this.apiKey,
      'X-RapidAPI-Host': this.host,
    };
  }
}
