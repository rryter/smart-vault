import { animate, group, style, transition, trigger, useAnimation } from '@angular/animations';
import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { PendingTransaction, PendingTransactionType } from '@shared/interface/transactions';
import { LoadingIndicatorService } from '@shared/services/loading-indicator.service';
import { fadeOut } from 'ngx-animate/lib';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'lukso-pending-transaction',
  templateUrl: './pending-transaction.component.html',
  styleUrls: ['./pending-transaction.component.scss'],
  animations: [
    trigger('fadeInAndOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 })),
      ]),
      transition(':leave', [group([useAnimation(fadeOut, { params: { duration: 250 } })])]),
    ]),
  ],
})
export class PendingTransactionComponent implements OnInit, OnChanges {
  @Input() filter: PendingTransactionType = PendingTransactionType.All;
  @Input() darkMode = false;
  @Output() finished = new EventEmitter();
  @HostBinding('class.darkMode') darkModeClass = false;

  pendingTransactions$: Observable<PendingTransaction[]>;

  constructor(private loadingIndicatorService: LoadingIndicatorService) {
    this.pendingTransactions$ = this.loadingIndicatorService.pendingTransactions$.pipe(
      map((pendingTransactions) => {
        return pendingTransactions.filter((pending: PendingTransaction) => {
          if (this.filter !== PendingTransactionType.All) {
            return pending.type === this.filter;
          }
          return true;
        });
      }),
      tap((pendingTransactions) => {
        if (pendingTransactions.length === 0) {
          this.finished.emit();
        }
      })
    );
  }

  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.darkMode) {
      this.darkModeClass = changes.darkMode.currentValue;
    }
  }
}
