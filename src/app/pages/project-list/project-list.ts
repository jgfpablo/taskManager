import { Component, inject, signal } from '@angular/core';
import { ProjectService } from '../../services/project/project-service';
import { RouterModule,Router} from '@angular/router';
import { CommonModule } from '@angular/common';
 import { Project } from '../../interfaces/project-interface';

@Component({
  selector: 'app-project-list',
  imports: [RouterModule,CommonModule,],
  templateUrl: './project-list.html',
  styleUrl: './project-list.css',
})
export class ProjectList {

  private projectsService = inject(ProjectService);
  private router = inject(Router);
  public projects = signal<Project[]>([]);
  
  
    ngOnInit() {
    this.projectsService.getProjects().subscribe({
      next: (projects:Project[]) => {
        console.log('Projects loaded', projects);
        this.projects.set(projects);
        
      },
      error: (error) => console.error('Failed to load projects', error)
    });
  }


  showProject(projectId: string) {
    
    this.router.navigate(['/projects', projectId]);
  }
}
