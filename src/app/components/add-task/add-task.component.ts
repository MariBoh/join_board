import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss'
})
export class AddTaskComponent implements AfterViewInit {

  @ViewChild('dueDateInput') dueDateInput!: ElementRef<HTMLInputElement>;

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
