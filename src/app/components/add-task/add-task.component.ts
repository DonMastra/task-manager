import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';

import { Task } from '../../Task';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  @Output()
  onAddTask: EventEmitter<Task> = new EventEmitter();

  text: String = "";
  day: String = "";
  reminder: boolean = false;
  showAddTask: boolean = false;
  subscription!: Subscription;

  constructor(
    private uiService: UiService
  ) {
    this.subscription = this.uiService.onToggle().subscribe(value =>
      this.showAddTask = value)
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.text.length === 0) {
      alert("Por favor, ingresa un texto para la tarea");
      return;
    }

    const {text, day, reminder} = this;
    const newTask = {
      text,
      day,
      reminder
    }

    this.onAddTask.emit(newTask);

  }

}
