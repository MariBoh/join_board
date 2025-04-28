import { Component, inject } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss'
})
export class AddTaskComponent {
  firebaseTaskService = inject(TaskService);

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

  // toggleDropdown() {
  // this.dropdownOpen = !this.dropdownOpen;
  // }
  
  getSelectedContactNames(): string {
  const selectedContacts = this.firebaseTaskService.contactList
    .filter(contact => contact.id && this.selectedAssignees.includes(contact.id))
    .map(contact => contact.name);
    
  return selectedContacts.join(', ');
}

  // onCheckboxChange(event: any) {
  //   const id = event.target.value;

  //   if (event.target.checked) {
  //     // If checked, add the ID
  //     this.selectedAssignees.push(id);
  //   } else {
  //     // If unchecked, remove the ID
  //     this.selectedAssignees = this.selectedAssignees.filter(a => a !== id);
  //   }
  // }

}
