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

  data: any = [];

  ngOnInit() {
    this.sharedService.currentData.subscribe(data => {
      this.data = data;
    });


  }


  onCancel() {
    this.sharedService.close();
  }

  onDelete() {
    this.projectService.removeMemberFromProject(this.data.projectId, this.data.member.user.id).subscribe({
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
