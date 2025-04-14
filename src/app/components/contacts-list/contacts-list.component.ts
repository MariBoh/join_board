import { Component } from '@angular/core';
import { AddContactComponent } from './add-contact/add-contact.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contacts-list',
  standalone: true,
  imports: [CommonModule, AddContactComponent],
  templateUrl: './contacts-list.component.html',
  styleUrl: './contacts-list.component.scss'
})
export class ContactsListComponent {
  showAddContactDialog: boolean = false; //creating a flag

   openAddContactDialog() {
     this.showAddContactDialog = true;
  }

  closeAddContactDialog() {
    this.showAddContactDialog = false;
  }

  saveContact(contactData: any) {
    console.log('Your contact saved', contactData);
    //backend-code from firebase
    this.closeAddContactDialog();
  }

}
