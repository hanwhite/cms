import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Document } from './document.model';
import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DocumentService {

    documentSelectedEvent = new EventEmitter <Document>();

    documents: Document[] = [];

    constructor() {
        this.documents = MOCKDOCUMENTS;
    }

    getDocuments() {
        return this.documents.slice();
    }

    getDocument(id: string) {
        for (let document of this.documents) {
            if (document.id = id) {
                return document;
            }
        }
        return null;
    }

    
}