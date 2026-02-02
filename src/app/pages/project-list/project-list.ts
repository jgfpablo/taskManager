import { Component, effect, inject, signal } from '@angular/core';
import { ProjectService } from '../../services/project/project-service';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-project-list',
  imports: [RouterModule, CommonModule,],
  templateUrl: './project-list.html',
  styleUrl: './project-list.css',
})
export class ProjectList {

  private projectsService = inject(ProjectService);
  private router = inject(Router);
  public projects = toSignal(this.projectsService.projectList$);

  ngOnInit() {
    this.projectsService.getProjects();
    console.log('Projects:', this.projects());
  }

  showProject(projectId: string) {
    this.router.navigate(['/projects', projectId]);
  }
}
