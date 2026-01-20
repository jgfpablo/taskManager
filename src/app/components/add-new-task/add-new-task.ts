import { Component, inject, Input } from '@angular/core';
import { SharedService } from '../../services/sharedService/shared-service';
import { FormsModule,FormGroup,FormControl, ReactiveFormsModule } from '@angular/forms';
import { TasksService } from '../../services/tasks/tasks-service';

@Component({
  selector: 'app-add-new-task',
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './add-new-task.html',
  styleUrl: './add-new-task.css',
})
export class AddNewTask {
  @Input() projectId?: string;

  sharedService = inject(SharedService);
  taskServices = inject(TasksService);

  priority:any[] = [];
  status:any[] = [];
  ngOnInit() {
    this.taskServices.getAllStatus().subscribe({
      next: (response) => {
       this.status = response;
      },
      error: (error) => {
        console.error('Error fetching statuses:', error);
      }
    });
    
    
    
    this.taskServices.getAllpriority().subscribe({
      next: (response) => {
        this.priority = response;
      },
      error: (error) => {
        console.error('Error fetching priorities:', error);
      }
    });
  }

  newTask = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    status: new FormControl(''),
    dueDate: new FormControl(''),
    priority: new FormControl(''),
  })

  onCancel() {
    this.sharedService.close();
  }

  onSave() {

    this.taskServices.createTask(this.projectId,this.newTask.value).subscribe({
      next: (response) => {
        console.log('Task created successfully:', response);
      },
      error: (error) => {
        console.error('Error creating task:', error);
      }
    });
  }
}
