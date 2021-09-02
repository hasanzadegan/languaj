import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {RouterModule, Routes} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';

const routes: Routes = [
  {path: '', component: LoginComponent}
];

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    MatListModule,
    MatMenuModule
  ]
})
export class LoginModule {
}
