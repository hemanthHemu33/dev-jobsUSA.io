import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServerService {
  constructor() {}

  private callFunctionSource = new Subject<void>();

  callFunction$ = this.callFunctionSource.asObservable();

  triggerFunctionCall(e: any): Observable<any> {
    console.log(e);
    this.callFunctionSource.next(e);
    return this.callFunction$;
  }
}
