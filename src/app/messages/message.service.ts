import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
    providedIn: 'root' 
})
export class MessageService {
    messageChangedEvent = new EventEmitter<Message[]>();
    maxMessageId: number;
    messages: Message[] = [];

    constructor(private http: HttpClient) {
        this.messages = MOCKMESSAGES;
    }

    getMaxId(): number {
        let maxId = 0;

        for (let message of this.messages) {
            const currentId = Number(message.id);
            if (currentId > maxId) {
                maxId = currentId
            }
        }
        return maxId;
    }

    getMessages() {
        this.http
        .get('http://localhost:3000/messages')
        .subscribe(
            (messages: Message[]) => {
                this.messages = messages;
                this.maxMessageId = this.getMaxId();
                this.messageChangedEvent.next(this.messages.slice());
            },
            (error: any) => {
                console.log(error);
            }
        );
    }

    getMessage(id: string) {
        for (let message of this.messages) {
            if (message.id = id) {
                return message;
            }
        }
        return null;
    }

    addMessage(message: Message) {
        if (!message) {
            return;
          }
      
          // make sure id of the new Message is empty
          message.id = '';
      
          const headers = new HttpHeaders({'Content-Type': 'application/json'});
      
          // add to database
          this.http.post<{message: Message }>('http://localhost:3000/messages',
            message,
            { headers: headers })
            .subscribe(
              (responseData) => {
                // add new message to messages
                this.messages.push(responseData.message);
                this.storeMessages();
              }
            );
    }

    storeMessages() {
        let messages = JSON.stringify(this.messages);
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        this.http
        .put('https://cmsproject-640ac.firebaseio.com/messages.json',
            messages,
            { headers: headers })
        .subscribe(
            () => {
                this.messageChangedEvent.next(this.messages.slice());
            }
        );
    }
}