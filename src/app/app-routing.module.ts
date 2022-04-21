import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService as AuthGuard } from './auth-guard.service';
import { LoginPageComponent } from './login-page/login-page.component';
import { PuzzleListComponent } from './puzzle-list/puzzle-list.component';
import { PuzzleComponent } from './puzzle/puzzle.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  { path: 'puzzles', component: PuzzleListComponent, canActivate: [] },
  { path: 'puzzle/:id', component: PuzzleComponent, canActivate: [] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
