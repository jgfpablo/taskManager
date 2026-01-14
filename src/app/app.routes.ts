import { Routes } from '@angular/router';
import { authGuard } from './guard/authGuard/auth-guard';
import { Login } from './auth/login/login';
import { ProjectList } from './pages/project-list/project-list';
import { ProjectDetail } from './pages/project-detail/project-detail';
import { Register } from './auth/register/register';
import { ProjectForm } from './pages/project-form/project-form';



export const routes: Routes = [

  // RUTAS DE AUTENTICACION 
  { path: 'login', component: Login },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {path:'register', component:Register},


  // RUTAS DE PROYECTOS
  {
    path: 'projects',
    component: ProjectList,
    canActivate: [authGuard]
  },
   {
    path: 'projects/new',
    component: ProjectForm,
    canActivate: [authGuard]
  },
  {
    path: 'projects/:id',
    component: ProjectDetail,
    canActivate: [authGuard]
  },


];
