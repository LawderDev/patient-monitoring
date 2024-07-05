import { Routes } from '@angular/router';
import { DashboardPatientComponent } from './dashboard-patient/dashboard-patient.component';
import { DashboardUserComponent } from './dashboard-user/dashboard-user.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard-user', pathMatch: 'full' },
  {
    path: 'dashboard-patient',
    component: DashboardPatientComponent
  },
  {
    path: 'dashboard-user',
    component: DashboardUserComponent
  }
];
