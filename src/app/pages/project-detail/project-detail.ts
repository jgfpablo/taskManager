
import { Component, effect, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../services/project/project-service';
import { CommonModule } from '@angular/common';
import { Modal } from "../../components/modal/modal";
import { SharedService } from '../../services/sharedService/shared-service';
import { AddNewMember } from '../../components/add-new-member/add-new-member';
import { AddNewTask } from "../../components/add-new-task/add-new-task";
import { DeleteMember } from "../../components/delete-member/delete-member";
import { toSignal } from '@angular/core/rxjs-interop';
import { Members } from "./components/members/members";
import { Tasks } from "./components/tasks/tasks";

@Component({
  selector: 'app-project-detail',
  imports: [CommonModule, Modal, AddNewMember, AddNewTask, DeleteMember, Members, Tasks],
  templateUrl: './project-detail.html',
  styleUrl: './project-detail.css',
})
export class ProjectDetail {

  private route = inject(ActivatedRoute);
  private projectService = inject(ProjectService);

  public sharedService = inject(SharedService);
  public router = inject(Router);
  public project = toSignal(this.projectService.projectDetail$, { initialValue: null });

  seleccion = 'members';

  ngOnInit() {
    const projectId = this.route.snapshot.paramMap.get('id')!;
    if(projectId){
      this.projectService.getProjectById(projectId);
    }
  }

}
