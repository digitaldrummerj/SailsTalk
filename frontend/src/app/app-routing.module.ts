import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoComponent } from './todo/todo.component';
import { SigninComponent } from './signin/signin.component';
import { ProfileComponent } from './profile/profile.component';

import { IsSignedInGuard, IsLoggedOutGuard } from './shared/guards';
const routes: Routes = [
  {
    path: '',
    children: [],
    component: TodoComponent,
    canActivate: [IsSignedInGuard]
  },
  
  { path: 'login', component: SigninComponent, canActivate: [IsLoggedOutGuard] },
    { path: 'profile', component: ProfileComponent, canActivate: [IsSignedInGuard] }

  // { path: 'admin', component: AdminComponent, canActivate: [AdminGuard]  }, 
  // { path: 'unauthorized', component: NotAuthorizedComponent }, 
  // { path: '**', component: NotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
