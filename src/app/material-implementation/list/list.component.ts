import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddComponent } from '../add/add.component';
import { IAssociates } from "../../store/associate/associates";
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { getAssociateList, getErrorMessage } from '../../store/associate/associate.selector';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { deleteAssociate, getAssociate, loadAssociate, openPopup } from '../../store/associate/associate.actions';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  standalone: true,
  imports: [AsyncPipe, NgIf, NgFor],
})
export class ListComponent implements OnInit {
  associates$!: Observable<IAssociates[]>;
  errorMessage$!:Observable<string>;
 
  constructor(private dialog: MatDialog, private store: Store) {
    this.store.dispatch(loadAssociate());
    this.associates$ = this.store.select(getAssociateList);
    this.errorMessage$ = this.store.select(getErrorMessage);
  }

  ngOnInit() {}

  functionAdd() {
    this.openPopupFunc(0, 'Create Association');
  }

  functionEdit(code: number) {
    this.store.dispatch(getAssociate({ id: code }));
    this.openPopupFunc(code, 'Edit Association');
  }
  functionDelete(id: number) {
    if (confirm('Are you sure')) {
      this.store.dispatch(deleteAssociate({ code: id }));
    }
  }

  openPopupFunc(code: number, title: string) {
    this.dialog.open(AddComponent, {
      width: '50%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: { code: code, title: title },
    });
  }
}
