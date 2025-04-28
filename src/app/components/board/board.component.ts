import { Component, inject } from '@angular/core';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {
  firebaseTaskService = inject(TaskService);

   ngOnInit() {
    this.firebaseTaskService.loadAllTasks();
  }

   async deleteTask(taskId: string) {
    await this.firebaseTaskService.deleteTaskByIdFromDatabase(taskId);
  }

  async updateTask(taskId: string) {
    const updatedData = {
      title: 'Database',
      priority: 'low',
      status: 'in progress',
    };

    await this.firebaseTaskService.updateTaskInDatabase(taskId, updatedData);
  }

  async updateSubtask(taskId: string, subtaskId: string) {
    const updatedSubtask = {
      title: 'Creating Database',
      isdone: false,
    };

    await this.firebaseTaskService.updateSubtaskInDatabase(taskId, subtaskId, updatedSubtask);
  }

  getContactNameById(id: string): string {
    let contact = this.firebaseTaskService.contactList.find(c => c.id === id);
    return contact ? contact.name : 'Unbekannt';
  }
    
}

