import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { IAssociates } from '../../store/associate/associates';
import { NgIf } from '@angular/common';
import { Store } from '@ngrx/store';
import {
  addAssociate,
  updateAssociate,
} from '../../store/associate/associate.actions';
import { getAssociate } from '../../store/associate/associate.selector';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    MatDialogModule,
    ReactiveFormsModule,
    NgIf,
  ],
})
export class AddComponent implements OnInit {
  title = 'Create Associate';
  isEdit = false;
  dialogData: any;
  associateForm: FormGroup;

  editCode!: number;
  editEdit!: IAssociates;

  constructor(
    private builder: FormBuilder,
    private ref: MatDialogRef<AddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private store: Store
  ) {
    this.associateForm = this.builder.group({
      id: [0],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      type: ['CUSTOMER', Validators.required],
      group: ['level1', Validators.required],
      status: [true, Validators.required],
    });
  }
  ClosePopup() {
    this.ref.close();
  }

  SaveAssociate() {
    if (this.associateForm.valid) {
      const _obj: IAssociates = {
        id: this.associateForm.value.id,
        name: this.associateForm.value.name,
        email: this.associateForm.value.email,
        phone: this.associateForm.value.phone,
        associateGroup: this.associateForm.value.group,
        address: this.associateForm.value.address,
        type: this.associateForm.value.type,
        status: this.associateForm.value.status,
      };
      if (_obj.id === 0) {
        this.store.dispatch(addAssociate({ inputData: _obj }));
      } else {
        this.store.dispatch(updateAssociate({ inputData: _obj }));
      }
      this.ClosePopup();
    }
  }
  ngOnInit() {
    debugger
    this.dialogData = this.data;
    this.title = this.dialogData.title;
    this.editCode = this.dialogData.code;

    if (this.editCode > 0) {
      this.store.select(getAssociate(this.editCode)).subscribe((res: any) => {
        this.associateForm.setValue({
          id: res.id,
          name: res.name,
          email: res.email,
          phone: res.phone,
          address: res.address,
          group: res.associateGroup,
          type: res.type,
          status: res.status,
        });
      });
    }
  }
}
