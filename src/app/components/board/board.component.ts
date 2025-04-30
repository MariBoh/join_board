
import { TaskService } from '../../services/task.service';
import { Component, inject } from '@angular/core';
import { CdkDragDrop, CdkDrag, CdkDropList, CdkDropListGroup, moveItemInArray, transferArrayItem, } from '@angular/cdk/drag-drop';
import { FirebaseService } from '../../services/firebase.service';
import { CommonModule } from '@angular/common';
import { Task } from '../../interfaces/task';
import { FakeTask, FakeContact } from '../../models/fake-task.model';
import { FAKE_TASKS, FAKE_CONTACTS } from '../../models/fake-data.model';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CdkDropListGroup, CdkDropList, CdkDrag, CommonModule],
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss', './board.responsive.scss']
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
    
  constructor(public firebaseService: FirebaseService) {

  }

  columns = [
    { title: 'To do', tasks: [...FAKE_TASKS] },
    { title: 'In progress', tasks: [] },
    { title: 'Await feedback', tasks: [] },
    { title: 'Done', tasks: [] }
  ];

  drop(event: CdkDragDrop<FakeTask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  getConnectedColumns() {
    return this.columns.map(c => c.title);
  }

  getCompletedSubtasksCount(task: FakeTask): number {
    return task.fakeSubtasks.filter(sub => sub.fakeCompleted).length;
  }

  getFakeContactInitials(fakeId: string): string {
    const contact = FAKE_CONTACTS.find(c => c.fakeId === fakeId);
    return contact ? contact.fakeName.split(' ').map(n => n[0]).join('') : '?';
  }

}

