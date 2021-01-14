import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private message = new BehaviorSubject<any>(null);
  currentMessage = this.message.asObservable();

  constructor() { }

  sendMessage(text: string) {
    this.message.next(text);
  }
}
