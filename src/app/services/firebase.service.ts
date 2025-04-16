/* MARIAN I
import { Injectable, inject, OnDestroy } from '@angular/core';
import { Firestore, collection, doc, onSnapshot, addDoc, updateDoc, deleteDoc } from '@angular/fire/firestore';

interface FirebaseContact {
  id?: string;
  name: string;
  mail: string;
  phone: string;
}
*/
import { Injectable, inject } from '@angular/core';
import { Firestore, collectionData, collection, doc, onSnapshot, getDocs } from '@angular/fire/firestore';
import { ContactService } from './contact.service';
import { from, map, Observable, of } from 'rxjs';
import { Contact, generateInitials, generateRandomColor } from '../models/contact.model';
import { IContact } from '../interfaces/contact';

@Injectable({
  providedIn: 'root'
})

/* MARIAN II
export class FirebaseService implements OnDestroy {

  contacts: FirebaseContact[] = [];

  unsubContacts;

  firestore: Firestore = inject(Firestore);


  constructor() {
    this.unsubContacts = this.subContacts();

  }


  getContactsRef(colId:string) {
    return collection(this.firestore, colId);
  }


  getSingleContactRef(colId:string, docId:string) {
    return doc(collection(this.firestore, colId), docId);
*/

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

/*
  setContactObject(contact: any, id: string): FirebaseContact {
    return {
      id: id,
      name: contact.name || "",
      mail: contact.mail || "",
      phone: contact.phone || "",
    }
  }


  subContacts() {
    return onSnapshot(this.getContactsRef('contacts'), (contactList) => {
      this.contacts = [];
      contactList.forEach((contact) => {
      this.contacts.push(this.setContactObject(contact.data(), contact.id));
    } )
    console.log(this.contacts);
  })
  }


  async addContactToFirebase(newContact: FirebaseContact){
    await addDoc(this.getContactsRef('contacts'), newContact).catch(
      (err) => { console.error(err); }
    ).then(
      (docRef) => { console.log("Document written with ID: ", docRef?.id); }
    )
  }


  getCleanJson(changedContact: FirebaseContact){
    return {
      name: changedContact.name,
      mail: changedContact.mail,
      phone: changedContact.phone,
    }
  }


  async updateContactInFirebase(ContactId: string, changedContact: FirebaseContact) {
    if(ContactId){
    await updateDoc(this.getSingleContactRef('contacts', ContactId), this.getCleanJson(changedContact)).catch(
      (err) => { console.error(err); }
    ).then();
    }
  }


  async deleteContactInFirebase(ContactId: string) {
    if(ContactId){
    await deleteDoc(this.getSingleContactRef('contacts', ContactId)).catch(
      (err) => { console.error(err); }
    ).then();
    }
  }

   //Lifecycle Hooks eigentlich nicht in service.ts

  ngOnDestroy() {
    this.unsubContacts();
  }

*/
}
