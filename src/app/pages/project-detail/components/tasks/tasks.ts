import { Component, inject, Input } from '@angular/core';
import { SharedService } from '../../../../services/sharedService/shared-service';
import { TasksService } from '../../../../services/tasks/tasks-service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tasks',
  imports: [CommonModule],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css',
})
export class Tasks {
@Input() project: any;
  sharedService = inject(SharedService);
  tasksService = inject(TasksService);

tasks$!: Observable<any[]>;


ngOnInit() {
    if (this.project) {
      this.tasks$ = this.tasksService.getAllTasks(this.project.id);
    }
     this.sharedService.trigger$.subscribe(() => {
       this.tasks$ = this.tasksService.getAllTasks(this.project.id);
    })
}

}
