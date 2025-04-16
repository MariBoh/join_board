import { Injectable, inject, OnDestroy } from '@angular/core';
import { Firestore, collection, doc, onSnapshot, addDoc, updateDoc, deleteDoc } from '@angular/fire/firestore';

interface FirebaseContact {
  id?: string;
  name: string;
  mail: string;
  phone: string;
}

@Injectable({
  providedIn: 'root'
})
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
  }


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


}
