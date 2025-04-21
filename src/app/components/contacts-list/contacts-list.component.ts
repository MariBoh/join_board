import { AddContactComponent } from './add-contact/add-contact.component';
import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, HostListener } from '@angular/core';
import { Contact } from '../../models/contact.model';
import { ContactService } from '../../services/contact.service';
import { EditContactsComponent } from './edit-contacts/edit-contacts.component';
import { IContact } from '../../interfaces/contact';

interface ContactGroup {
  letter: string;
  contacts: Contact[];
}

@Component({
  selector: 'app-contacts-list',
  standalone: true,
  imports: [CommonModule, AddContactComponent, EditContactsComponent],
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.scss']
})

export class ContactsListComponent implements OnInit {

  contacts: Contact[] = [];
  contactGroups: ContactGroup[] = [];
  showAddContactDialog: boolean = false;
  showEditContactDialog = false;
  selectedContact: Contact | null = null;
  showMobileOptions = false;

  constructor(private contactService: ContactService) { }

  openAddContactDialog() {
    this.showAddContactDialog = true;
    document.body.style.overflow = 'hidden';
  }

  closeAddContactDialog() {
    this.showAddContactDialog = false;
    document.body.style.overflow = '';
  }

  selectContact(contact: Contact) {
    this.selectedContact = this.selectedContact === contact ? null : contact;
    this.showEditContactDialog = false;
    this.showMobileOptions = false;

  }

  openEditContactDialog(contact: Contact) {
    this.selectedContact = contact;
    this.showEditContactDialog = true;
    document.body.style.overflow = 'hidden';
  }

  closeEditContactDialog() {
    this.selectedContact = null;
    this.showEditContactDialog = false;
    document.body.style.overflow = '';
  }

  saveNewContact(contactData: any) {
    console.log('Your contact saved', contactData);
    //backend-code from firebase

    this.closeAddContactDialog();
  }

  editContact(contactData: IContact) {
    console.log('Contact updated:', contactData);
    // update to backend here...
    this.closeEditContactDialog();
  }

  deleteContact(contact: IContact) {
    console.log('Contact deleted:', contact);
    // delete from backend...
    this.closeEditContactDialog();
  }

  ngOnInit() {
    this.loadContacts();
    // console.log('clicked');
  }

  loadContacts() {
    this.contactService.getContacts().subscribe(contacts => {
      this.contacts = contacts;
      this.groupContactsByFirstLetter();
    });
  }

  groupContactsByFirstLetter() {
    const groupsMap = new Map<string, Contact[]>();

    this.contacts.forEach(contact => {
      const firstLetter = contact.name.charAt(0).toUpperCase();
      if (!groupsMap.has(firstLetter)) {
        groupsMap.set(firstLetter, []);
      }
      groupsMap.get(firstLetter)?.push(contact);
    });

    this.contactGroups = Array.from(groupsMap.entries())
      .sort(([letterA], [letterB]) => letterA.localeCompare(letterB))
      .map(([letter, contacts]) => ({ letter, contacts }));
  }

  toggleMobileOptionsMenu() {
    this.showMobileOptions = !this.showMobileOptions;
  }

  @HostListener('document:click', ['$event'])
  menuClick(event: MouseEvent) {
    const inside = (event.target as HTMLElement).closest('.options-wrapper');

    if (!inside) this.showMobileOptions = false;
  }

}
