import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { PageComponent } from './page/page.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [PageComponent, LoginComponent, RegisterComponent],
  imports: [CommonModule, AccountRoutingModule, FormsModule],
})
export class AccountModule {}
