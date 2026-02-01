import { Component, inject, Input, Output } from '@angular/core';
import { SharedService } from '../../services/sharedService/shared-service';
import { TasksService } from '../../services/tasks/tasks-service';

@Component({
  selector: 'app-delete-task',
  imports: [],
  templateUrl: './delete-task.html',
  styleUrl: './delete-task.css',
})
export class DeleteTask {
  @Input() projectId!: any;
  sharedService = inject(SharedService);
  taskServices = inject(TasksService);

  data: any;


  ngOnInit() {
    this.sharedService.data$.subscribe(data => {
      this.data = data;
    });
    console.log('DeleteTask component initialized with data:', this.data);
  }


  onCancel() {
    this.sharedService.close();
  }
  
  onDelete() {
    this.taskServices.DeleteTask(this.data.id,this.projectId).subscribe({
      next: (response) => {
        console.log('Task deleted successfully:', response);
        this.sharedService.close();
      },
      error: (error) => {
        console.error('Error deleting task:', error);
      }
    });
  }

}
