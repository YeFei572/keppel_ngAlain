import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable()
export class EventService {

  private subject = new Subject<any>();

  emit(event : string) {
    this.subject.next(event);
  }

  events(): Observable<any> {
    return this.subject.asObservable();
  }
}