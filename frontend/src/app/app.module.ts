import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { TodoComponent } from './todo/todo.component';
import { TodoDetailsComponent } from './todo-details/todo-details.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TodoService } from './shared/services/todo.service'
import { AuthService } from './shared/services/auth.service';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';
import { IsAdminGuard, IsSignedInGuard, IsLoggedOutGuard } from './shared/guards';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    TodoComponent,
    TodoDetailsComponent,
    SigninComponent,
    SignupComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    NgbModule.forRoot()
  ],
  providers: [TodoService, AuthService, IsAdminGuard, IsSignedInGuard, IsLoggedOutGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
