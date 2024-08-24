import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServerService {
  constructor() {}

  private callFunctionSource = new Subject<void>();

  callFunction$ = this.callFunctionSource.asObservable();

  triggerFunctionCall(e: any) {
    console.log(e, 'serverService hit');
    this.callFunctionSource.next(e);
  }
}
