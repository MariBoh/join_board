import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-contact.component.html',
  styleUrl: './add-contact.component.scss'
})
export class AddContactComponent {

  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  contact = {
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
