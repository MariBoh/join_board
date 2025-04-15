import { Injectable, inject } from '@angular/core';
import { Firestore, collectionData, collection, doc, onSnapshot } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  // contacts$;
  firestore: Firestore = inject(Firestore);
  unsubscribe: () => void;

  constructor() {
    // this.contacts$ = collectionData(this.getContactsRef());
    this.unsubscribe = onSnapshot(collection(this.firestore, 'contacts'), (querySnapshot) => {
      querySnapshot.forEach((element) => {
        console.log(element.id, element.data());
        
      } )
    })
   }

  getContactsRef() {
    return collection(this.firestore, 'contacts');
  }

  getSingleContactRef(colId:string, docId:string) {
    return doc(collection(this.firestore, colId), docId);
  }
}
