import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '../../interfaces/project-interface';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  

  private api = 'http://localhost:3000/api/projects';

  constructor(private http: HttpClient) {}

  private projectSubject = new BehaviorSubject<Project[] | null>(null);
  projectList$ = this.projectSubject.asObservable();

  private projectDetailSubject = new BehaviorSubject<Project | null>(null);
  projectDetail$ = this.projectDetailSubject.asObservable();


  getProjects(){
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
    return this.http.get<any>(`${this.api}/${id}`).subscribe(
      (project => {
        this.projectDetailSubject.next(project[0]);
      })
    );
  }

addMembersToProject(projectId: string, email: string, role: string) {
  return this.http.post<any>(`${this.api}/addMembers`, { projectId, email, role })
    .pipe(
      tap(() => {
        // llamarlo para recargar para actualizar el html
        this.getProjectById(projectId);
      })
    );
}

removeMemberFromProject(projectId: string, userId: string) {
  return this.http.delete<any>(`${this.api}/${projectId}/members/${userId}`).pipe(
    tap(() => {
      this.getProjectById(projectId);
    })
  );
}

}
