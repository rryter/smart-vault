import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Web3Service } from '@shared/services/web3.service';
import { combineLatest, forkJoin, Observable, of, ReplaySubject } from 'rxjs';
import { catchError, shareReplay, switchMap, tap } from 'rxjs/operators';
import { KEY_TYPE } from '@shared/capabilities.enum';
import { KeyManagerService } from '@shared/services/key-manager.service';
import { MatDialog } from '@angular/material/dialog';
import { AddKeyComponent } from './add-key/add-key.component';
import { bigNumbertoIntArray } from '@shared/utils/bigNumber';
import { ContractTransaction, utils } from 'ethers';
import { LoadingIndicatorService } from '@shared/services/loading-indicator.service';
import { ERC734KeyManager } from '@twy-gmbh/erc725-playground';
import { PendingTransactionType } from '@shared/interface/transactions';
import { PrivilegesItem } from './priviliges/privileges.component';

export interface KeyManagerData {
  address: string;
  keyType: any;
  privileges: any[];
}

@Component({
  selector: 'lukso-key-manager',
  templateUrl: './key-manager.component.html',
  styleUrls: ['./key-manager.component.scss'],
})
export class KeyManagerComponent implements OnInit, OnChanges {
  loading = false;
  showDeployButton = false;
  private keyManagerContract$ = new ReplaySubject<ERC734KeyManager>();

  error: any;
  keyManagerData$: Observable<KeyManagerData[]>;

  // ERC734KeyManager
  @Input() keyManagerContract: ERC734KeyManager | undefined;
  @Input() accountAddress: string | undefined;

  constructor(
    public dialog: MatDialog,
    private web3Service: Web3Service,
    private keyManagerService: KeyManagerService,
    private loadingIndicatorService: LoadingIndicatorService
  ) {
    this.error = null;
    this.keyManagerData$ = combineLatest([
      this.web3Service.reloadTrigger$,
      this.keyManagerContract$,
    ]).pipe(
      switchMap(() => this.getAllKeys()),
      switchMap((keys: string[]) => this.getKeymanagerData$(keys)),
      tap(() => {
        this.loading = false;
      }),
      shareReplay(1)
    );
  }

  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.keyManagerContract.currentValue) {
      this.keyManagerContract$.next(changes.keyManagerContract.currentValue);
    }
  }

  openDialog(
    title: string,
    buttonText: string,
    key?: { address: string; privileges: number[] }
  ): void {
    const dialogRef = this.dialog.open(AddKeyComponent, {
      data: {
        title,
        buttonText,
        address: key?.address,
        privileges: key?.privileges,
      },
    });

    dialogRef.afterClosed().subscribe((privilegesItem: PrivilegesItem) => {
      if (privilegesItem) {
        const { address, privileges } = privilegesItem;
        if (!this.keyManagerService.contract) {
          throw Error('Keymanager Contract not available');
        }
        this.loadingIndicatorService.addTransactionPromise({
          promise: this.keyManagerService.contract.setKey(address, privileges, KEY_TYPE.ECDSA),
          type: PendingTransactionType.KeyManager,
          action: 'Adding / Updating Key',
        });
      }
    });
  }

  getKeymanagerData$(keys: string[]) {
    return forkJoin(
      keys.map((key) => {
        return this.getKey(key, keys);
      })
    ).pipe(
      catchError((error) => {
        console.warn(error);
        return of([]);
      })
    );
  }

  removeKey(key: { address: string; index: number }) {
    if (!this.keyManagerContract) {
      throw Error('keyManager not set');
    }

    this.keyManagerContract
      .removeKey(utils.keccak256(key.address), key.index)
      .then((tx: ContractTransaction) => tx.wait())
      .finally(() => {
        this.loadingIndicatorService.hideBlockerBackdrop();
      });
  }

  onShowEditDialog(key: any) {
    this.openDialog('Update Privileges', 'Update', { ...key });
  }

  onAddNewKey() {
    this.openDialog('Add Key', 'Save');
  }

  private getAllKeys(): Promise<string[]> {
    this.loading = true;
    if (this.keyManagerContract === undefined) {
      throw Error('this.keyManagerContract is not set');
    }
    return this.keyManagerContract.getAllKeys().catch((error: Error) => {
      this.error = error;
      console.error('Could not load keys: ', error);
      return [];
    });
  }

  private getKey(
    key: string,
    keys: string[]
  ): Promise<{ address: string; keyType: number; privileges: number[] }> {
    if (!this.keyManagerService.contract) {
      throw Error('contract not available');
    }
    return this.keyManagerService.contract.getKey(key).then((result) => {
      const { _keyAddress, _privilegesLUT, _keyType } = result;
      return {
        isCurrentWallet:
          _keyAddress.toLowerCase() === this.web3Service.selectedAddress.toLowerCase(),
        address: _keyAddress,
        privileges: bigNumbertoIntArray(_privilegesLUT),
        keyType: _keyType.toNumber(),
        index: keys.indexOf(key),
      };
    });
  }
}
