import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Project } from '../../interfaces/project-interface';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { SharedService } from '../sharedService/shared-service';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {

  private api = 'http://localhost:3000/api/projects';


  constructor(private http: HttpClient) { }

  sharedService = inject(SharedService);

  private projectSubject = new BehaviorSubject<Project[] | null>(null);
  projectList$ = this.projectSubject.asObservable();

  private projectDetailSubject = new BehaviorSubject<Project | null>(null);
  projectDetail$ = this.projectDetailSubject.asObservable();

  getProjects() {
    this.http.get<Project[]>(this.api).subscribe(
      (project => {
        this.projectSubject.next(project);
      })
    );
  }

  createProject(data: { name: string; description?: string }) {
    return this.http.post(this.api + '/new', data);
  }

  getProjectById(id: string) {
    return this.http.get<Project>(`${this.api}/${id}`).subscribe(
      (project => {
        this.projectDetailSubject.next(project);
      })
    );
  }

  addMembersToProject(projectId: string, email: string, role: string) {
    return this.http.post<void>(`${this.api}/addMembers`, { projectId, email, role })
      .pipe(
        tap(() => {
          // llamarlo para recargar para actualizar el html
          // this.getProjectById(projectId);
          this.sharedService.emmitEvent();

        })
      );
  }

  removeMemberFromProject(projectId: string, userId: string) {

    return this.http.delete<void>(`${this.api}/${projectId}/members/${userId}`).pipe(
      tap(() => {
        this.getProjectById(projectId);
      })
    );
  }

}
