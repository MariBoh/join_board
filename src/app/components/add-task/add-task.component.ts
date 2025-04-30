import { Timestamp } from '@angular/fire/firestore';
import { TaskService } from '../../services/task.service';
import { Component,inject, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { generateInitials, generateRandomColor } from '../../models/contact.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss'
})
export class AddTaskComponent implements AfterViewInit {
  firebaseTaskService = inject(TaskService);
  @ViewChild('dueDateInput') dueDateInput!: ElementRef<HTMLInputElement>;
  generateInitials = generateInitials;
  generateRandomColor = generateRandomColor;
  avatarColors: { [contactId: string]: string } = {};
  router = inject(Router);

  title = '';
  description = '';
  duedate: string = '';
  priority = 'medium';
  assignees = '';
  category = '';
  subtasksInput = '';
  selectedAssignees: string[] = [];
  dropdownOpen = false;

   async createNewTask() {
    const taskData = {
      title: this.title,
      description: this.description,
      category: this.category,
      priority: this.priority,
      status: 'open',
      duedate: Timestamp.fromDate(new Date(this.duedate)),
      assignees: this.selectedAssignees,
    };

    const subtasks = this.subtasksInput.split(',').map(title => ({
      title: title.trim(),
      isdone: false
    }));

     await this.firebaseTaskService.addTaskWithSubtaskToDatabase(
      this.firebaseTaskService.firestore, 
      taskData, 
      subtasks
    );

     console.log('Task and Subtasks added');
     this.resetForm(); //to keep empty fields after submiting form
     this.router.navigate(['/board']); //redirecting to board
  }

  async deleteTask(taskId: string) {
    await this.firebaseTaskService.deleteTaskByIdFromDatabase(taskId);
  }
  
  resetForm() {
    this.title = '';
    this.description = '';
    this.duedate = '';
    this.priority = 'medium';  // default value
    this.category = '';
    this.subtasksInput = '';
    this.selectedAssignees = [];
    this.dropdownOpen = false;
  }

  toggleDropdown() {
  this.dropdownOpen = !this.dropdownOpen;
  }
  
 getSelectedContactNames(): { initials: string; color: string }[] {
  return this.firebaseTaskService.contactList
    .filter(contact => contact.id && this.selectedAssignees.includes(contact.id))
    .map(contact => ({
      initials: generateInitials(contact.name),
      color: generateRandomColor()
    }));
}

  onCheckboxChange(event: any) {
    const id = event.target.value;

    if (event.target.checked) {
      // If checked, add the ID
      this.selectedAssignees.push(id);
    } else {
      // If unchecked, remove the ID
      this.selectedAssignees = this.selectedAssignees.filter(a => a !== id);
    }
  }

  getAvatarColor(contactId: string): string {
    if (!this.avatarColors[contactId]) {
      this.avatarColors[contactId] = this.generateRandomColor();
    }
    return this.avatarColors[contactId];
  }

  //Funktion von Valeriya
  ngAfterViewInit(): void {
    this.setTodayAsMinDate();
  }

  private setTodayAsMinDate(): void {
    const today = new Date().toISOString().split('T')[0];
    if (this.dueDateInput?.nativeElement) {
      this.dueDateInput.nativeElement.min = today;
    }
  }

  validateDueDate(): void {
    const input = this.dueDateInput?.nativeElement;
    if (input) {
      const dateValue = input.value;
      if (dateValue) {
        const selectedDate = new Date(dateValue);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Prüfen, ob das gewählte Datum in der Vergangenheit liegt
        if (selectedDate < today) {
          // Wenn ja, setze das Datum auf heute
          input.value = today.toISOString().split('T')[0];
          console.log('Selected date was in the past. Reset to today.');
        } else {
          // Formatieren und ausgeben
          const formattedDate = selectedDate.toLocaleDateString('en-US');
          console.log('Formatted Selected Date:', formattedDate);
        }
      }
    }
  }
}
