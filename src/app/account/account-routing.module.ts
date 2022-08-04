import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountInfoComponent } from "./account-info/account-info.component";
import { AccountComponent } from "./account/account.component";
import { AccountChatComponent } from "./account-chat/account-chat.component";
import { AccountFeedbackComponent } from "./account-feedback/account-feedback.component";
import { AccountNotificationsComponent } from "./account-notifications/account-notifications.component";
import { AccountPaymentListComponent } from "./account-payment-list/account-payment-list.component";
import { AccountTransactionListComponent } from "./account-transaction-list/account-transaction-list.component";
import { AccountRefundComponent } from "./account-refund/account-refund.component";
import { AccountWishlistComponent } from "./account-wishlist/account-wishlist.component";
import { AccountFavoriteMerchantComponent } from "./account-favorite-merchant/account-favorite-merchant.component";

const routes: Routes = [
  {
    path: '',
    component: AccountComponent,
    children: [
      {
        path: '',
        component: AccountInfoComponent
      },
      {
        path: 'chat',
        component: AccountChatComponent
      },
      {
        path: 'feedback',
        component: AccountFeedbackComponent
      },
      {
        path: 'notification',
        component: AccountNotificationsComponent
      },
      {
        path: 'payment_list',
        component: AccountPaymentListComponent
      },
      {
        path: 'transaction_list',
        component: AccountTransactionListComponent
      },
      {
        path: 'refund',
        component: AccountRefundComponent
      },
      {
        path: 'wishlist',
        component: AccountWishlistComponent
      },
      {
        path: 'favorite_merchant',
        component: AccountFavoriteMerchantComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule {
}
