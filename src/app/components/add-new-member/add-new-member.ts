import { Component, inject, Input } from '@angular/core';
import { SharedService } from '../../services/sharedService/shared-service';
import { FormsModule } from '@angular/forms';
import { ProjectService } from '../../services/project/project-service';

@Component({
  selector: 'app-add-new-member',
  imports: [FormsModule],
  templateUrl: './add-new-member.html',
  styleUrl: './add-new-member.css',
})
export class AddNewMember {
  @Input() projectId?: string;
  sharedService = inject(SharedService);
  projectService = inject(ProjectService);

  data:any = [];
  email: string = '';
  role: string = '';

  roles: string[] = ['developer', 'tester', 'designer', 'manager'];

  onCancel() {
    this.sharedService.close();
  }

  onSave() {
    this.data = {projectId: this.projectId, email: this.email, role: this.role};
      this.projectService.addMembersToProject(this.projectId!, this.email, this.role).subscribe({
        next: (response) => {
          console.log('Member added successfully:', response);
        },
        error: (error) => {
          console.error('Error adding member:', error);
        }
      });
      this.sharedService.close();
  }
}
