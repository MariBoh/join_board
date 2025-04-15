import { Injectable, inject } from '@angular/core';
import { Firestore, collectionData, collection, doc, onSnapshot, getDocs } from '@angular/fire/firestore';
import { ContactService } from './contact.service';
import { from, map, Observable, of } from 'rxjs';
import { Contact, generateInitials, generateRandomColor } from '../models/contact.model';
import { IContact } from '../interfaces/contact';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService implements ContactService {

  firestore: Firestore = inject(Firestore);

  getContacts(): Observable<Contact[]> {
    return collectionData(collection(this.firestore, 'contacts')).pipe(
      map((response: any) => {
        return response.map((item : IContact) => {
          const contact : Contact = {
            id: '',
            name: item.name,
            email: item.mail,
            phone: item.phone,
            color: generateRandomColor(),
            initials: generateInitials(item.name)
          };
          return contact;
        });
      })
    );
  }

  addContact(contact: Omit<Contact, 'id' | 'initials' | 'color'>): Observable<Contact> {
    const newContact: Contact = {
                ...contact,
                id: '42',
                initials: 'MM',
                color: 'red'
            };
            return of(newContact);
  }
}
