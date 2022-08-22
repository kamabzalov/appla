import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfoComponent } from './info/info.component';
import { ProfileComponent } from './profile-page/profile.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { PaymentListComponent } from './payment-list/payment-list.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { RefundComponent } from './refund/refund.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { FavoriteMerchantComponent } from './favorite-merchant/favorite-merchant.component';
import { ChatComponent } from '@app/profile/chat/chat.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      {
        path: '',
        component: InfoComponent,
      },
      {
        path: 'chat',
        component: ChatComponent,
      },
      {
        path: 'feedback',
        component: FeedbackComponent,
      },
      {
        path: 'notification',
        component: NotificationsComponent,
      },
      {
        path: 'payment_list',
        component: PaymentListComponent,
      },
      {
        path: 'transaction_list',
        component: TransactionListComponent,
      },
      {
        path: 'refund',
        component: RefundComponent,
      },
      {
        path: 'wishlist',
        component: WishlistComponent,
      },
      {
        path: 'favorite_merchant',
        component: FavoriteMerchantComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
