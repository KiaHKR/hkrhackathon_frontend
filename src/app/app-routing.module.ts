import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService as AuthGuard } from './auth-guard.service';
import { LoginPageComponent } from './login-page/login-page.component';
import { PuzzleListComponent } from './puzzle-list/puzzle-list.component';
import { PuzzlePageComponent } from './puzzle-page/puzzle-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'puzzles', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  { path: 'puzzles/:id', component: PuzzlePageComponent, canActivate: [AuthGuard] },
  { path: 'puzzles', component: PuzzleListComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'puzzles', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
