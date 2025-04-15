import { Injectable, inject } from '@angular/core';
import { Firestore, collectionData, collection, doc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  contacts$;
  firestore: Firestore = inject(Firestore);

  constructor() {
    this.contacts$ = collectionData(this.getContactsRef());
   }

  getContactsRef() {
    return collection(this.firestore, 'contacts');
  }

  getSingleContactRef(colId:string, docId:string) {
    return doc(collection(this.firestore, colId), docId);
  }
}
