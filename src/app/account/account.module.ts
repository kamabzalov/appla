import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account/account.component';
import { AccountSidebarComponent } from './account-sidebar/account-sidebar.component';
import { AccountInfoComponent } from './account-info/account-info.component';
import { AccountChatComponent } from './account-chat/account-chat.component';
import { AccountFeedbackComponent } from './account-feedback/account-feedback.component';
import { AccountNotificationsComponent } from './account-notifications/account-notifications.component';
import { AccountPaymentListComponent } from './account-payment-list/account-payment-list.component';
import { AccountTransactionListComponent } from './account-transaction-list/account-transaction-list.component';
import { AccountRefundComponent } from './account-refund/account-refund.component';
import { AccountWishlistComponent } from './account-wishlist/account-wishlist.component';
import { AccountFavoriteMerchantComponent } from './account-favorite-merchant/account-favorite-merchant.component';

@NgModule({
  declarations: [
    AccountComponent,
    AccountSidebarComponent,
    AccountInfoComponent,
    AccountChatComponent,
    AccountFeedbackComponent,
    AccountNotificationsComponent,
    AccountPaymentListComponent,
    AccountTransactionListComponent,
    AccountRefundComponent,
    AccountWishlistComponent,
    AccountFavoriteMerchantComponent,
  ],
  imports: [CommonModule, AccountRoutingModule],
})
export class AccountModule {}
