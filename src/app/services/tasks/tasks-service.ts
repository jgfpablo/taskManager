import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { ProjectService } from '../project/project-service';
import { SharedService } from '../sharedService/shared-service';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  

  private api = 'http://localhost:3000/api/tasks';

  sharedService = inject(SharedService);

  constructor(private http: HttpClient) {}

  createTask(idProject:any,data:any) {
    return this.http.post(this.api + '/' + idProject, data).pipe(
      tap(() => {
        this.sharedService.close();
        this.sharedService.emmitEvent();
      })
    );
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

  DeleteTask(taskId: string, projectId: string) {
    return this.http.delete<any>(`${this.api}/${taskId}`).pipe(
      tap(() => {
        this.sharedService.emmitEvent();
      })
    );
  }

}
