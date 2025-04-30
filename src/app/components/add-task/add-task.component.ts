import { Timestamp } from '@angular/fire/firestore';
import { TaskService } from '../../services/task.service';
import { Component,inject, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [CommonModule, FormsModule, NgSelectModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss'
})
export class AddTaskComponent implements AfterViewInit {
  firebaseTaskService = inject(TaskService);
  @ViewChild('dueDateInput') dueDateInput!: ElementRef<HTMLInputElement>;

  title : string = '';
  description : string = '';
  duedate: string = '';
  priority : string = 'medium';
  category : string = '';
  subtasksInput : {
    title : string,
    isdone : boolean
  }[] = [];
  selectedAssignees: string[] = [];

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

     await this.firebaseTaskService.addTaskWithSubtaskToDatabase(
      this.firebaseTaskService.firestore, 
      taskData, 
      this.subtasksInput
    );

     console.log('Task and Subtasks added');
     this.resetForm(); //to keep empty fields after submiting form
  }
  
  resetForm() {
    this.title = '';
    this.description = '';
    this.duedate = '';
    this.priority = 'medium';  // default value
    this.category = '';
    this.subtasksInput = [];
    this.selectedAssignees = [];
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
