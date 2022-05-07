import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAuthGuardService as AdminAuthGuard } from './admin-auth-guard.service';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AuthGuardService as AuthGuard } from './auth-guard.service';
import { LoginPageComponent } from './login-page/login-page.component';
import { PuzzleListComponent } from './puzzle-list/puzzle-list.component';
import { PuzzlePageComponent } from './puzzle-list-components/puzzle-page/puzzle-page.component';
import { ResetPasswordPageComponent } from './reset-password-page/reset-password-page.component';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent, data: { showBackground: true } },
  { path: 'user/reset', component: ResetPasswordPageComponent, data: { showBackground: true } },
  { path: 'puzzles/:id', component: PuzzlePageComponent, canActivate: [AuthGuard], data: { showBackground: false } },
  { path: 'puzzles', component: PuzzleListComponent, canActivate: [AuthGuard], data: { showBackground: true } },
  { path: 'dashboard', component: AdminPageComponent, canActivate: [AdminAuthGuard], data: { showBackground: false } },
  { path: '**', redirectTo: 'puzzles', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
