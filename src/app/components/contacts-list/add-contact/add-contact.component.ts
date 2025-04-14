import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Contact } from '../../../interfaces/contact';

@Component({
  selector: 'app-add-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-contact.component.html',
  styleUrl: './add-contact.component.scss'
})
export class AddContactComponent {

  @Output() close = new EventEmitter<void>(); //using void, becouse we are not passing any data
  @Output() save = new EventEmitter<Contact>();

  contact: Contact = {
    name: '',
    email: '',
    phone: ''
  }

  onClose() {
    this.close.emit();
  }

  onSubmit() {
    this.save.emit(this.contact);
    this.contact ={name: '', email: '', phone: ''} //keeping field empty after submit
  }
 

}
