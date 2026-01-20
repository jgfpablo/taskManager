import { Component, inject, signal } from '@angular/core';
import { SharedService } from '../../services/sharedService/shared-service';
import { UsersService } from '../../services/users/users-service';
import { ProjectService } from '../../services/project/project-service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-delete-member',
  imports: [],
  templateUrl: './delete-member.html',
  styleUrl: './delete-member.css',
})
export class DeleteMember {

sharedService = inject(SharedService);
projectService = inject(ProjectService);
usersService = inject(UsersService);

projectData = toSignal(this.sharedService.currentData);
userData = toSignal(this.usersService.getUserById(this.projectData()?.user_id));

  
  onCancel() {
    console.log(this.userData().id);
    console.log(this.projectData().project_id);
    this.sharedService.close();
  }
  onDelete() {
    this.projectService.removeMemberFromProject(this.projectData().project_id, this.userData().id).subscribe({
      next: (response) => {
        console.log('Member removed successfully:', response);
      },
      error: (error) => {
        console.error('Error removing member:', error);
      }
    });
    this.sharedService.close();
  }

}
