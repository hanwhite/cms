import { Contact } from './contact.model';
import { Injectable } from '@angular/core';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ContactService {
    contactListChangedEvent = new Subject<Contact[]>();
    contacts: Contact[] = [];
    maxContactId: number;

    constructor(private http: HttpClient) {
        this.contacts = MOCKCONTACTS;
        this.maxContactId = this.getMaxId();
    }

    getContacts() {
        this.http
        .get('https://cmsproject-640ac.firebaseio.com/contacts.json')
        .subscribe(
            (contacts: Contact[]) => {
                this.contacts = contacts;
                this.maxContactId = this.getMaxId();
                this.contacts.sort((a, b) => (a.name > b.name ? 1 : ((b.name > a.name) ? -1 : 0)));
                this.contactListChangedEvent.next(this.contacts.slice());
            },
            (error: any) => {
                console.log(error);
            }
        );
    }

    getContact(id: string): Contact {
        return this.contacts.find((contact) => contact.id === id);
    }

    deleteContact(contact: Contact) {
        if (!contact) {
            return;
        }
        const pos = this.contacts.indexOf(contact);
        if (pos < 0) {
            return;
        }
        this.contacts.splice(pos, 1);
        this.storeContacts();
    }

    getMaxId(): number {
        let maxId = 0;

        for (let contact of this.contacts) {
            const currentId = Number(contact.id);
            if (currentId > maxId) {
                maxId = currentId;
            }
        }
        return maxId;
    }

    addContact(newContact: Contact) {
        if (!newContact) {
            return;
        }
        this.maxContactId++;
        newContact.id = this.maxContactId.toString();
        this.contacts.push(newContact);
        const contactsListClone = this.contacts.slice();
        this.storeContacts();
    }

    updateContact(originalContact: Contact, newContact: Contact) {
        if (!originalContact || !newContact) {
            return;
        }
        const pos = this.contacts.indexOf(originalContact)
        this.storeContacts();
    }

    storeContacts() {
        let contacts = JSON.stringify(this.contacts);
        const headers = new HttpHeaders({'Content-Type' : 'application/json'});
        this.http.put('https://cmsproject-640ac.firebaseio.com/contacts.json',
            contacts,
            { headers: headers })
        .subscribe(
            () => {
                this.contactListChangedEvent.next(this.contacts.slice());
            }
        )
    }

}