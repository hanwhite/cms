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
        .get('https://cmsproject-640ac.firebaseio.com/messages.json')
        .subscribe(
            (messages: Message[]) => {
                this.messages = messages;
                this.maxMessageId = this.getMaxId();
                // sort?
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
        this.messages.push(message);
        this.storeMessages();
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