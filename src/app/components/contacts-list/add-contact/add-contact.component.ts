import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IContact } from '../../../interfaces/contact';
import { FirebaseService } from '../../../services/firebase.service';

@Component({
  selector: 'app-add-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-contact.component.html',
  styleUrl: './add-contact.component.scss'
})
export class AddContactComponent {

  @Output() close = new EventEmitter<void>(); 
  @Output() save = new EventEmitter<IContact>();

  contact: IContact = {
    name: '',
    mail: '',
    phone: ''
  }

  onClose() {
    this.close.emit();
  }

  onSubmit() {
    this.save.emit(this.contact);
    this.contact ={name: '', mail: '', phone: ''} //keeping field empty after submit
  }
 

}
