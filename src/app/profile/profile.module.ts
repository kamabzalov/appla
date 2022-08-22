import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile-page/profile.component';
import { InfoComponent } from './info/info.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { PaymentListComponent } from './payment-list/payment-list.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { RefundComponent } from './refund/refund.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { FavoriteMerchantComponent } from './favorite-merchant/favorite-merchant.component';
import { ChatComponent } from '@app/profile/chat/chat.component';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [
    ProfileComponent,
    InfoComponent,
    ChatComponent,
    FeedbackComponent,
    NotificationsComponent,
    PaymentListComponent,
    TransactionListComponent,
    RefundComponent,
    WishlistComponent,
    FavoriteMerchantComponent,
  ],
  imports: [CommonModule, SharedModule, ProfileRoutingModule],
})
export class ProfileModule {}
