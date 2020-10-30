import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Document } from './document.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class DocumentService {

    documentListChangedEvent = new Subject<Document[]>();
    documents: Document[];
    maxId: number;
    maxDocumentId: number;


    constructor() {
        this.documents = MOCKDOCUMENTS;
        this.maxDocumentId = this.getMaxId();
    }

    getDocuments(): Document[] {
        return this.documents.slice();
    }

    getDocument(id: string): Document {
        return this.documents.find((document) => document.id === id);
    }

    deleteDocument(document: Document) {
        if (!document) {
            return;
        }
        const pos = this.documents.indexOf(document);
        if (pos < 0) {
            return;
        }
        this.documents.splice(pos, 1);
        this.documentListChangedEvent.next(this.documents.slice());
    }

    getMaxId(): number {

        this.maxId = 0;

        for (let document of this.documents) {
            const currentId = Number(document.id);
            if (currentId > this.maxId) {
                this.maxId = currentId
            }
        }

        return this.maxId;
    }

    addDocument(newDocument: Document) {
        if (!newDocument) {
            return;
        }
        this.maxDocumentId++;
        newDocument.id = this.maxDocumentId.toString();
        this.documents.push(newDocument);
        this.documentListChangedEvent.next(this.documents.slice());
    }

    updateDocument(originalDocument: Document, newDocument: Document) {
        if (!originalDocument || !newDocument) {
            return;
        }
        const pos = this.documents.indexOf(originalDocument)
        if (pos < 0) {
            return;
        }
        newDocument.id = originalDocument.id;
        this.documents[pos] = newDocument;
        const documentsListClone = this.documents.slice();
        this.documentListChangedEvent.next(documentsListClone);
    }

}