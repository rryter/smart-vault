import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import Web3 from 'web3';

@Injectable({
  providedIn: 'root',
})
export class Web3WrapperService {
  web3: any; // use proper tyings

  address$ = new BehaviorSubject<string>(null);
  networkId$ = new BehaviorSubject<number>(null);
  blocks$ = new Subject();

  constructor() {
    this.initialize();
  }

  async initialize() {
    const ethEnabled = () => {
      if (window.ethereum) {
        window.ethereum.autoRefreshOnNetworkChange = false;
        this.web3 = new Web3(window.ethereum);
        window.ethereum.enable();
        return true;
      }
      return false;
    };

    if (!ethEnabled()) {
      alert(
        'Please install an Ethereum-compatible browser or extension like MetaMask to use this dApp!'
      );
    }

    this.web3.eth.subscribe('newBlockHeaders').on('data', (block) => {
      this.blocks$.next(block);
    });

    const addresses = await this.web3.eth.getAccounts();
    this.address$.next(addresses[0]);
    window.ethereum.on('accountsChanged', (accounts: string[]) => {
      this.address$.next(accounts[0]);
    });

    const networkId = await this.web3.eth.getChainId();
    this.networkId$.next(networkId);

    window.ethereum.on('chainChanged', (_chainId) => window.location.reload());
  }
}
