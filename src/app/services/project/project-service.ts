import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '../../interfaces/project-interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  

   private api = 'http://localhost:3000/api/projects';

  constructor(private http: HttpClient) {}


  getProjects():Observable<Project[]> {
    return this.http.get<Project[]>(this.api);
  }

  createProject(data: { name: string; description?: string }) {
    return this.http.post(this.api + '/new', data);
  }

  getProjectById(id: string) {
    return this.http.get<any>(`${this.api}/${id}`);
  }

  addMembersToProject(projectId: string, email: string,role:string) {
    console.log('Adding member to project:', projectId, email);
    return this.http.post<any>(`${this.api}/addMembers`, {projectId, email, role });
  }


}
