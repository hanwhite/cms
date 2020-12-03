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
        .get('http://localhost:3000/contacts')
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
        const pos = this.contacts.findIndex(c => c.id === contact.id);

        if (pos < 0) {
            return;
        }
        
        this.http.delete('http://localhost:3000/contacts/' + contact.id)
        .subscribe(
          (response: Response) => {
            this.contacts.splice(pos, 1);
            this.storeContacts();
          }
        );
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

    addContact(contact: Contact) {
        if (!contact) {
            return;
        }

        contact.id = '';

        const headers = new HttpHeaders({'Content-Type': 'application/json'});
    
        // add to database
        this.http.post<{ message: string, contact: Contact }>('http://localhost:3000/contacts',
          contact,
          { headers: headers })
          .subscribe(
            (responseData) => {
              // add new contact to contacts
              this.contacts.push(responseData.contact);
              this.storeContacts();
            }
          );
      }

    updateContact(originalContact: Contact, newContact: Contact) {
        if (!originalContact || !newContact) {
            return;
          }
      
          const pos = this.contacts.findIndex(d => d.id === originalContact.id);
      
          if (pos < 0) {
            return;
          }
      
          // set the id of the new Contact to the id of the old Contact
          newContact.id = originalContact.id;
        //    newContact._id = originalContact._id;
      
          const headers = new HttpHeaders({'Content-Type': 'application/json'});
      
          // update database
          this.http.put('http://localhost:3000/contacts/' + originalContact.id,
          newContact, { headers: headers })
            .subscribe(
              (response: Response) => {
                this.contacts[pos] = newContact;
                this.storeContacts();
              }
            );
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