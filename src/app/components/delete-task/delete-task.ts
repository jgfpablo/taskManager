import { Component, inject } from '@angular/core';
import { SharedService } from '../../services/sharedService/shared-service';

@Component({
  selector: 'app-delete-task',
  imports: [],
  templateUrl: './delete-task.html',
  styleUrl: './delete-task.css',
})
export class DeleteTask {

  sharedService = inject(SharedService);


  onCancel() {

    this.sharedService.close();
  }
  onDelete() {
    // Logic to delete the task
  }

}
