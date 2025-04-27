import { Component, } from '@angular/core';
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
  styleUrl: './board.component.scss'
})

export class BoardComponent {

  constructor(public firebaseService: FirebaseService) {

  }





































  // todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];
  // inProgress = ['Develop feature', 'Write tests', 'Fix bug', 'Drink coffee'];
  // awaitFeedback = ['Review bugfix', 'Test Formatting', 'Check spelling', 'Check grammar'];
  // done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  // drop(event: CdkDragDrop<string[]>) {
  //   if (event.previousContainer === event.container) {
  //     moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  //   } else {
  //     transferArrayItem(
  //       event.previousContainer.data,
  //       event.container.data,
  //       event.previousIndex,
  //       event.currentIndex,
  //     );
  //   }
  // }

  // getContactNameById(id: string): string {
  //   let contact = this.firebaseService.contacts.find(c => c.id === id);
  //   return contact ? contact.name : 'Unbekannt';
  // }




  // Fake Data for testing purposes

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
