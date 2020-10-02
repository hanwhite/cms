import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [
    new Message('1', 'subject1', 'msgText1', 'sender1'),
    new Message('2', 'subject2', 'msgText2', 'sender2'),
    new Message('3', 'subject3', 'msgText3', 'sender3'),
    new Message('4', 'subject4', 'msgText4', 'sender4'),
  ];

  onAddMessage(message: Message){
    this.messages.push(message);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
