import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ProjectService } from '../../services/project/project-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-form',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './project-form.html',
  styleUrl: './project-form.css',
})
export class ProjectForm {

private fb = inject(FormBuilder);
private projectService = inject(ProjectService);
private route = inject(Router);

projectForm = this.fb.group({
  name: [''],
  description: ['']
});


public newProject(){
  const {name, description} = this.projectForm.value;

  this.projectService.createProject({name: name!, description: description!}).subscribe({
    next: (response) => {
      console.log('Project created successfully', response);
      this.route.navigate(['/projects']);
    },
    error: (error) => {
      console.error('Failed to create project', error);
    }
  });

}
}