
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../services/project/project-service';
import { CommonModule } from '@angular/common';
import { Modal } from "../../components/modal/modal";

@Component({
  selector: 'app-project-detail',
  imports: [CommonModule, Modal],
  templateUrl: './project-detail.html',
  styleUrl: './project-detail.css',
})
export class ProjectDetail {

  private route = inject(ActivatedRoute);
  private projectService = inject(ProjectService);
  router = inject(Router);

  public project = signal<any>(null);

  modal = false

  ngOnInit() {
    const projectId = this.route.snapshot.paramMap.get('id');
    console.log('Project ID from route:', projectId);

    this.projectService.getProjectById(projectId!).subscribe(project => {
      console.log('Project details:', project);
      this.project.set(project[0]);
    });

  }


  modalAddMember() {
   this.modal = !this.modal
  }

  saveNewMember(email:string,role:string) {

  this.projectService.addMembersToProject(this.project().id, email,role).subscribe({
    next: (response) => {
      console.log('Members added successfully', response);
      this.router.navigate(['/projects']);
  },
    error: (error) => {
      console.error('Failed to add members', error);
    }
  });
}

}
