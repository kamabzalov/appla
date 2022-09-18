import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { PageComponent } from './page/page.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [PageComponent, LoginComponent, RegisterComponent],
  imports: [CommonModule, AccountRoutingModule, FormsModule, SharedModule],
})
export class AccountModule {}
