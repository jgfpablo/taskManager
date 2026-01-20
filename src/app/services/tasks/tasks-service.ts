import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  

  private api = 'http://localhost:3000/api/tasks';

  constructor(private http: HttpClient) {}





  createTask(idProject:any,data:any) {
    console.log('Creating task with data:', data);
    console.log('Project ID:', idProject);
    return this.http.post(this.api + '/' + idProject, data);
  }


  getAllpriority() {
    return this.http.get<any>(this.api + '/priorities');
  }

  getAllStatus() {
    return this.http.get<any>(this.api + '/status');
  }

  getAllTasks(projectId: string) {
    return this.http.get<any>(`${this.api}/${projectId}`);
  }

}
