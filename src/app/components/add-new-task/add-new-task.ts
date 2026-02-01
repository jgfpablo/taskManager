import { Component, inject, Input } from '@angular/core';
import { SharedService } from '../../services/sharedService/shared-service';
import { FormsModule,FormGroup,FormControl, ReactiveFormsModule } from '@angular/forms';
import { TasksService } from '../../services/tasks/tasks-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-new-task',
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './add-new-task.html',
  styleUrl: './add-new-task.css',
})
export class AddNewTask {
  
  projectId:any;

  sharedService = inject(SharedService);
  taskServices = inject(TasksService);

  Allpriority$ = this.taskServices.getAllpriority();
  Allstatus$ = this.taskServices.getAllStatus();

  ngOnInit() {
    this.taskServices.getAllpriority().subscribe(res => console.log(res));
    console.log('AddNewTask component initialized');
    this.sharedService.data$.subscribe(data => {
      this.projectId = data;
    });
  this.taskServices.getAllStatus().subscribe(res => console.log(res));
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
