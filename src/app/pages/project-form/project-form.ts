import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ProjectService } from '../../services/project/project-service';

@Component({
  selector: 'app-project-form',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './project-form.html',
  styleUrl: './project-form.css',
})
export class ProjectForm {

private fb = inject(FormBuilder);
private projectService = inject(ProjectService);

projectForm = this.fb.group({
  name: [''],
  description: ['']
});


public newProject(){
  const {name, description} = this.projectForm.value;

  this.projectService.createProject({name: name!, description: description!}).subscribe({
    next: (response) => {
      console.log('Project created successfully', response);
      // Handle successful project creation (e.g., show a success message, reset the form, etc.)
    },
    error: (error) => {
      console.error('Failed to create project', error);
      // Handle error (e.g., show an error message)
    }
  });

}
}