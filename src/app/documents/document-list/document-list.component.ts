import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents: Document[] = [
    new Document('1', 'name1', 'description1', 'url1', null),
    new Document('2', 'name2', 'description2', 'url2', null),
    new Document('3', 'name3', 'description3', 'url3', null),
    new Document('4', 'name4', 'description4', 'url4', null),
    new Document('5', 'name5', 'description5', 'url5', null),
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }

}
