import { Component, inject, Input, } from '@angular/core';
import { Project } from '../../../../interfaces/project-interface';
import { SharedService } from '../../../../services/sharedService/shared-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-members',
  imports: [CommonModule],
  templateUrl: './members.html',
  styleUrl: './members.css',
})
export class Members {
@Input() project: Project | null = null;

sharedService = inject(SharedService);

}
