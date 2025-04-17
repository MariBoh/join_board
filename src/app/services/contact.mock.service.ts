import { Injectable } from '@angular/core';
import { Contact, generateInitials, generateRandomColor } from '../models/contact.model';
import { Observable, of } from 'rxjs';
import { ContactService } from './contact.service';

@Injectable({
    providedIn: 'root'
})

export class ContactMockService implements ContactService {
    private mockContacts: Contact[] = [
        {
            id: '1',
            name: 'Albert Einstein',
            mail: 'albert@example.com',
            phone: '+123456789',
            color: '#3f51b5',
            initials: 'AE'
        },
        {
            id: '2',
            name: 'Eva Braun',
            mail: 'eva@example.com',
            phone: '+987654321',
            color: '#ff4081',
            initials: 'EB'
        },
        {
            id: '3',
            name: 'Frederick Smith',
            mail: 'frederick@example.com',
            phone: '+1122334455',
            color: '#4caf50',
            initials: 'FS'
        },
        {
            id: '4',
            name: 'Lukas Schneider',
            mail: 'lukas.schneider@example.com',
            phone: '+4915112345678',
            color: '#9c27b0',
            initials: 'LS'
        },
        {
            id: '5',
            name: 'Anika Müller',
            mail: 'anika.mueller@example.com',
            phone: '+4917623456789',
            color: '#009688',
            initials: 'AM'
        },
        {
            id: '6',
            name: 'Johannes Becker',
            mail: 'johannes.becker@example.com',
            phone: '+491701234567',
            color: '#ff9800',
            initials: 'JB'
        },
        {
            id: '7',
            name: 'Clara Vogel',
            mail: 'clara.vogel@example.com',
            phone: '+491521234567',
            color: '#795548',
            initials: 'CV'
        },
        {
            id: '8',
            name: 'Zorro Oncepiece',
            mail: 'zorro@example.com',
            phone: '+49548834567',
            color: '#795748',
            initials: 'ZO'
        },
    ];

    getContacts(): Observable<Contact[]> {
        return of(this.mockContacts);
    }

    addContact(contact: Omit<Contact, 'id' | 'initials' | 'color'>): Observable<Contact> {
        const newContact: Contact = {
            ...contact,
            id: (this.mockContacts.length + 1).toString(),
            initials: generateInitials(contact.name),
            color: generateRandomColor()
        };
        this.mockContacts.push(newContact);
        return of(newContact);
    }
}