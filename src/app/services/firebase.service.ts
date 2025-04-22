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


  //MARIAN 4 Lines
  contacts: IContact[] = [];
  unsubContacts;
  constructor() {
    this.unsubContacts = this.subContacts();}
  

  //VALERIYA
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


subContacts() {
  return onSnapshot(this.getContactsRef('contacts'), (contactList) => {
    this.contacts = [];
    contactList.forEach((contact) => {
    this.contacts.push(this.setContactObject(contact.data(), contact.id));
  } )
  console.log(this.contacts);
})
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


  //MARIAN Functions
  getContactsRef(colId:string) {
    return collection(this.firestore, colId);
  }


  getSingleContactRef(colId:string, docId:string) {
    return doc(collection(this.firestore, colId), docId);
  }
  
  // setContactObject(data: any, id: string): Contact {
  //   return {
  //     id,
  //     name: data.name,
  //     email: data.mail,
  //     phone: data.phone,
  //     color: generateRandomColor(),
  //     initials: generateInitials(data.name),
  //   };
  // }

  setContactObject(contact: any, id: string): IContact {
      return {
        id: id,
        name: contact.name || "",
        mail: contact.mail || "",
        phone: contact.phone || "",
      }
    }


  async addContactToFirebase(newContact: IContact){
    await addDoc(this.getContactsRef('contacts'), newContact).catch(
      (err) => { console.error(err); }
    ).then(
      (docRef) => { console.log("Document written with ID: ", docRef?.id); }
    )
  }
 

  getCleanJson(changedContact: IContact){
    return {
      name: changedContact.name,
      mail: changedContact.mail,
      phone: changedContact.phone,
    }
  }


  async updateContactInFirebase(ContactId: string, changedContact: IContact) {
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


}

/*
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
    */