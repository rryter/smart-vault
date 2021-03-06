import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeAgoPipe } from './pipes/time-ago.pipe';
import { EthAddressShortPipe } from './pipes/eth-address-short.pipe';
import { CmcPricePipe } from './pipes/cmc-price.pipe';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmComponent } from './components/dialog/confirm/confirm.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatBadgeModule } from '@angular/material/badge';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { LayoutModule } from '@angular/cdk/layout';
import { LayoutComponent } from './components/layout/layout.component';
import { RouterModule } from '@angular/router';
import { AmountComponent } from './components/dialog/amount/amount.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ReactiveFormsModule } from '@angular/forms';
import { WrongNetworkComponent } from '@shared/components/wrong-network/wrong-network.component';
import { MatRippleModule } from '@angular/material/core';
import { PrivilegePipe } from './pipes/privilege.pipe';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { ListCheckboxComponent } from './components/checkbox-list/list-checkbox.component';
import { LayoutReducedComponent } from './components/layout/layout-reduced/layout-reduced.component';
import { LoadingComponent } from './components/loading/loading.component';
import { LoadingInlineComponent } from './components/loading-inline/loading-inline.component';
import { PendingTransactionComponent } from './components/pending-transaction/pending-transaction.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ImageCropperComponent } from './components/image-cropper/image-cropper.component';
import { ImageCropperDialogComponent } from './components/dialog/image-cropper-dialog/image-cropper-dialog.component';
import { NavigationComponent } from './components/layout/navigation/navigation.component';
import { HumanReadableNumberPipe } from './pipes/human-readable-number.pipe';
import { ButtonComponent } from './components/button/button.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DragAndDropDirective } from './directives/drag-and-drop.directive';
import { FileSizePipe } from './pipes/file-size.pipe';

const materialModules = [
  MatTableModule,
  MatDialogModule,
  MatButtonModule,
  MatIconModule,
  MatSnackBarModule,
  MatSidenavModule,
  MatProgressBarModule,
  MatToolbarModule,
  MatMenuModule,
  MatListModule,
  MatCardModule,
  MatGridListModule,
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatSliderModule,
  MatChipsModule,
  MatProgressSpinnerModule,
  MatRippleModule,
  MatBadgeModule,
  MatCheckboxModule,
  MatTooltipModule,
];
@NgModule({
  declarations: [
    TimeAgoPipe,
    EthAddressShortPipe,
    CmcPricePipe,
    PrivilegePipe,
    FileSizePipe,
    ConfirmComponent,
    LayoutComponent,
    AmountComponent,
    WrongNetworkComponent,
    ErrorMessageComponent,
    ListCheckboxComponent,
    LayoutReducedComponent,
    LoadingComponent,
    LoadingInlineComponent,
    PendingTransactionComponent,
    ImageCropperComponent,
    ImageCropperDialogComponent,
    NavigationComponent,
    HumanReadableNumberPipe,
    ButtonComponent,
    DragAndDropDirective,
  ],
  imports: [
    RouterModule,
    CommonModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    ReactiveFormsModule,
    ImageCropperModule,
    ...materialModules,
  ],
  exports: [
    TimeAgoPipe,
    EthAddressShortPipe,
    CmcPricePipe,
    PrivilegePipe,
    FileSizePipe,
    HumanReadableNumberPipe,
    LayoutComponent,
    LayoutReducedComponent,
    ConfirmComponent,
    AmountComponent,
    ErrorMessageComponent,
    ListCheckboxComponent,
    LoadingComponent,
    LoadingInlineComponent,
    ...materialModules,
    PendingTransactionComponent,
    ImageCropperComponent,
    ButtonComponent,
    DragAndDropDirective,
  ],
})
export class SharedModule {}
