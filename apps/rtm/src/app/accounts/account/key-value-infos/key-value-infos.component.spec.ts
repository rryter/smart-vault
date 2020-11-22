import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

import { KeyValueInfosComponent } from './key-value-infos.component';

describe('KeyValueInfosComponent', () => {
  let component: KeyValueInfosComponent;
  let fixture: ComponentFixture<KeyValueInfosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KeyValueInfosComponent],
      providers: [
        {
          provide: MatDialog,
          useValue: {},
        },
      ],
      imports: [MatTableModule, MatIconModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KeyValueInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
