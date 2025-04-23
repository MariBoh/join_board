import { Injectable, inject, OnDestroy } from '@angular/core';
import { Firestore, collection, collectionData, doc, onSnapshot, addDoc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { ContactService } from './contact.service';
import { from, map, Observable, of } from 'rxjs';
import { Contact, generateInitials, generateRandomColor } from '../models/contact.model';
import { IContact } from '../interfaces/contact';

@Injectable({
  providedIn: 'root'
})

export class FirebaseService implements ContactService {

  firestore: Firestore = inject(Firestore);

  contacts: IContact[] = [];
  unsubContacts;
  constructor() {
    this.unsubContacts = this.subContacts();
  }

  getContacts(): Observable<Contact[]> {
    const coll = collection(this.firestore, 'contacts');
    return collectionData(coll, { idField: 'id' }).pipe(
      map((docs: any[]) =>
        docs.map(item => ({
          id:       item.id,               
          name:     item.name,
          mail:     item.mail,
          phone:    item.phone,
          color:    item.color  ?? generateRandomColor(),
          initials: item.initials ?? generateInitials(item.name)
        }))
      )
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

  getContactsRef(colId: string) {
    return collection(this.firestore, colId);
  }

  getSingleContactRef(colId: string, docId: string) {
    return doc(collection(this.firestore, colId), docId);
  }

  setContactObject(contact: any, id: string): IContact {

    const fixedColor = contact.color || generateRandomColor();

    if (!contact.color) {
      updateDoc(this.getSingleContactRef('contacts', id), { color: fixedColor });
    }

    return {
      id: id,
      name: contact.name || "",
      mail: contact.mail || "",
      phone: contact.phone || "",
      color: fixedColor,
    };
  }

  subContacts() {
    return onSnapshot(this.getContactsRef('contacts'), (contactList) => {
      this.contacts = [];
      contactList.forEach((contact) => {
        this.contacts.push(this.setContactObject(contact.data(), contact.id));
      })
    })
  }

  async addContactToFirebase(newContact: IContact): Promise<void> {
    const contactWithColor: IContact = { ...newContact, color: newContact.color || generateRandomColor() };
    try {
      const docRef = await addDoc(this.getContactsRef('contacts'), contactWithColor);
    } catch (err) {
      console.error(err);
    }
  }

  getCleanJson(changedContact: IContact) {
    return {
      name: changedContact.name,
      mail: changedContact.mail,
      phone: changedContact.phone,
      color: changedContact.color,
    };
  }

  async updateContactInFirebase(ContactId: string, changedContact: IContact) {
    if (ContactId) {
      await updateDoc(this.getSingleContactRef('contacts', ContactId), this.getCleanJson(changedContact)).catch(
        (err) => { console.error(err); }
      ).then();
    }
  }

  async deleteContactInFirebase(ContactId: string) {
    if (ContactId) {
      await deleteDoc(this.getSingleContactRef('contacts', ContactId)).catch(
        (err) => { console.error(err); }
      ).then();
    }
  }
  
  //Lifecycle Hooks eigentlich nicht in service.ts
  ngOnDestroy() {
    this.unsubContacts();
  }

}