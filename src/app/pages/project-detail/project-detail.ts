
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../services/project/project-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-detail',
  imports: [CommonModule],
  templateUrl: './project-detail.html',
  styleUrl: './project-detail.css',
})
export class ProjectDetail {

  private route = inject(ActivatedRoute);
  private projectService = inject(ProjectService);

  public project = signal<any>(null);

  ngOnInit() {
    const projectId = this.route.snapshot.paramMap.get('id');
    console.log('Project ID from route:', projectId);

    this.projectService.getProjectById(projectId!).subscribe(project => {
      console.log('Project details:', project);
      this.project.set(project[0]);
    });

  }



}
